const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const e = require("express");
const Contact = db.contact;
const add_contact = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const payload = req.body;
    const contact_details = {
      ...payload,
      user_id,
    };
    const new_contact = await Contact.create(contact_details);
    res.status(StatusCodes.CREATED).json(new_contact);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
const get_contact = async (req, res) => {
  try {
    const data = await Contact.findAll({
      include: [
        {
          model: db.user,
          as:"users",
          attributes: {
            exclude:["id","created_at","updated_at"]
          }
        },
      ],
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
module.exports = { add_contact,get_contact };
