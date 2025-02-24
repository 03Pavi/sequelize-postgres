const db = require("../models");

const Customer = db.customer;
const Profile = db.profile;

const get_customers = async (req, res) => {
  res.send("Get all customers");
};

const get_customer = async (req, res) => {
  const { id } = req.params;
  res.send(`Get customer with id ${id}`);
};

const add_customer = async (req, res) => {
  const t = await sequelize.transaction(); 

  try {
    let customer;
    let profile;

    const customer_data = {
      name: "Pavitar Singh",
      phoneNumber: "1234566700",
    };

    // Check if customer exists
    customer = await Customer.findOne({
      where: { phoneNumber: customer_data.phoneNumber },
      attributes: { exclude: ["created_at", "updated_at"] },
      transaction: t,
    });

    if (!customer) {
      // Create customer if not found
      customer = await Customer.create(customer_data, {
        fields: ["name", "phoneNumber"],
        transaction: t,
      });
    }

    const profile_data = {
      name: "developer",
    };

    // Check if profile exists
    profile = await Profile.findOne({
      where: { name: profile_data.name },
      attributes: { exclude: ["created_at", "updated_at"] },
      transaction: t,
    });

    if (!profile) {
      profile = await Profile.create(profile_data, {
        fields: ["name"],
        transaction: t,
      });
    }

    await customer.addProfile(profile, {
      through: { status: "active" },
      transaction: t,
    });

    await t.commit();

    return res.status(201).json({
      message: "Customer and Profile linked successfully",
      data: {
        customer,
        profile,
      },
    });
  } catch (error) {
    await t.rollback();
    console.error("Error adding customer:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const update_customer = async (req, res) => {
  const { id } = req.params;
  const customer_data = req.body;
  res.send(`Update customer with id ${id}`);
};

module.exports = {
  get_customers,
  get_customer,
  add_customer,
  update_customer,
};
