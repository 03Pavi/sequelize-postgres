const { Sequelize } = require("sequelize");
const db = require("../models");
const User = db.user;
const Contact = db.contact;
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

module.exports = { add_user, get_user, get_users, delete_user, update_user };
