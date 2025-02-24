const db = require("../models");
const get_profiles = async (req, res) => {
  res.send("Get all profiles");
};

const get_profile = async (req, res) => {
  // const newGrant = await db.grant.create({
  //   CustomerId: 1,
  //   profileId: 1,
  //   selfGranted: true,
  // });
  const userProfile = await db.customer.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["created_at", "updated_at"] },
    include: [
      {
        model: db.grant,
        attributes: { exclude: ["created_at", "updated_at"] },
        include: db.profile
      }
    ],
  });
  res.json({
    data: userProfile,
  });
};

const update_profile = async (req, res) => {
  res.send(`Update profile with ID ${req.params.id}`);
};

const add_profile = async (req, res) => {
  res.send("Add a new profile");
};

const delete_profile = async (req, res) => {
  res.send(`Delete profile with ID ${req.params.id}`);
};

module.exports = {
  get_profiles,
  get_profile,
  update_profile,
  add_profile,
  delete_profile,
};
