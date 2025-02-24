const { Sequelize } = require("sequelize");
const db = require("../models");
const User = db.user;
const Contact = db.contact;
const Subject = db.subject;
const { StatusCodes } = require("http-status-codes");

const add_user = async (req, res) => {
  try {
    const payload = req.body;
    let new_user;
    let newContact;

    if (Array.isArray(payload) && payload.length > 1) {
      new_user = await User.bulkCreate(payload);
    } else {
      new_user = await User.create(payload);
    }

    res.status(StatusCodes.CREATED).json({
      data: new_user,
      msg: "user is created",
    });
  } catch (error) {
    let message;
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: message ? message : "Internal server error" });
  }
};

const get_users = async (req, res) => {
  try {
    // const data = await User.findAll({
    //   attributes: [
    //     "first_name",
    //     "last_name",
    //     [
    //       Sequelize.fn(
    //         "CONCAT",
    //         Sequelize.col("first_name"),
    //         " ",
    //         Sequelize.col("last_name")
    //       ),
    //       "full_name",
    //     ],
    //   ],
    // });
    const data = await User.findAndCountAll({
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
      include: [
        {
          model: Contact,
          as: "contact",
          attributes: { exclude: ["created_at", "updated_at", "UserId"] },
        },
      ],
    });

    // {
    //   "data": [
    //     {
    //       "first_name": "Pavitar",
    //       "last_name": "singh"
    //     }
    //   ]
    // }
    // as alias
    // attributes: ["first_name", ["last_name","akhri_naame"]],
    // {
    //   "data": [
    //     {
    //       "first_name": "Pavitar",
    //       "akhri_naame": "singh"
    //     }
    //   ]
    // }
    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const get_user = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findOne({
      where: { id },
      include: [
        {
          model: Contact,
          as: "contact",
        },
      ],
    });

    if (!data) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found!" });
    }

    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const delete_user = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found!" });
    }

    await User.destroy({ where: { id } });

    res.status(StatusCodes.OK).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const update_user = async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found!" });
    }

    await User.update(payload, { where: { id } });

    res.status(StatusCodes.OK).json({ message: "User updated successfully!" });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const get_subjects = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
      include: [
        {
          model: db.subject,
          as: "subjects",
          attributes: { exclude: ["created_at", "updated_at", "user_subject"] },
          through: { attributes: [] },
        },
      ],
    });
    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const restore_user = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Missing 'id' in query params" });
    }
    const user = await User.findOne({
      where: { id },
      paranoid: false,
      attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found!" });
    } else {
      await User.restore({ where: { id } });
      res
        .status(StatusCodes.OK)
        .json({ message: "User restored successfully!", data: user });
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const eager_loading_contacts = async (req, res) => {
  try {
    const data = await User.findOne({
      attributes: { exclude: ["created_at", "deleted_at", "updated_at"] },
      include: [
        {
          model: Contact,
          as: "contacts",
          attributes: {
            exclude: ["created_at", "updated_at", "user_id", "id"],
          },
        },
      ],
    });
    res.json({ data });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const advance_eager_loading_contacts = async (req, res) => {
  try {
    const userId = 1;
    const data = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["created_at", "deleted_at", "updated_at"] },
      include: [
        {
          model: Subject,
          as: "subjects",
          through: "user_subject",
          through: { attributes: [] },
          required: true,
          attributes: {
            exclude: [
              "created_at",
              "updated_at",
              "userId",
              "id",
              "user_subject",
            ],
          },
        },
        {
          model: Contact,
          as: "contacts",
          attributes: {
            exclude: ["created_at", "updated_at", "user_id", "id"],
          },
        },
      ],
    });
    res.json({ data });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const lazy_loading_contacts = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: 1 },
      attributes: { exclude: ["created_at", "deleted_at", "updated_at"] },
    });
    const userContact = await user.getContacts();
    res.json({ data: user, contacts: userContact });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const creating_associations=async(req,res)=>{ }

module.exports = {
  add_user,
  get_user,
  get_users,
  delete_user,
  update_user,
  get_subjects,
  restore_user,
  eager_loading_contacts,
  lazy_loading_contacts,
  advance_eager_loading_contacts,
  creating_associations
};
