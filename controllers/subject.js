const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const Subject = db.subject;

const add_subject = async (req, res) => {
  try {
    const payload = req.body;
    const new_subject = await Subject.create(payload);
    res.status(StatusCodes.CREATED).json(new_subject);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
const assign_subject = async (req, res) => {
  const { subject_id, user_id } = req.params;

  if (!user_id || !subject_id) {
    return res.status(400).json({ message: "Missing user_id or subject_id" });
  }

  const query = `
    INSERT INTO user_subject ("UserId", "SubjectId", created_at, updated_at)
    VALUES (:user_id, :subject_id, NOW(), NOW())
  `;

  try {
    await db.sequelize.query(query, {
      replacements: { user_id, subject_id },
      type: db.sequelize.QueryTypes.INSERT,
    });

    console.log("Subject assigned successfully");
    return res.status(201).json({ message: "Subject assigned successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const get_subjects = async (req, res) => {
  try {
    const data = await Subject.findAll({
      include: [
        {
          model: db.user,
          as: "users",
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
        },
      ],
    });
    if (data.length < 0) {
      res.status(204).json(data);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
const get_subject = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Subject.findOne({
      where: { id },
      include: [
        {
          model: db.user,
          as: "users",
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
        },
      ],
    });
    if (data.length < 0) {
      res.status(204).json(data);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const delete_subject = async (req, res) => {
  const { id } = req.params;
  try {
    await Subject.destroy({
      where: { id },
    });
    res.status(200).json({ msg: "Subject deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = { assign_subject, add_subject, get_subjects, delete_subject,get_subject };
