const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = require("./user")(sequelize, DataTypes, Model);
db.contact = require("./contact")(sequelize, DataTypes, Model);
db.subject = require("./subject")(sequelize, DataTypes, Model);
db.profile = require("./profile")(sequelize, DataTypes, Model);
db.customer = require("./customer")(sequelize, DataTypes, Model);
db.grant = require("./grant")(sequelize, DataTypes, Model);

db.user.hasMany(db.contact, { foreignKey: "user_id", as: "contacts" });
db.contact.belongsTo(db.user, { foreignKey: "user_id", as: "user_details" });

db.user.belongsToMany(db.subject, { through: "user_subject", as: "subjects" });
db.subject.belongsToMany(db.user, { through: "user_subject", as: "users" });

db.customer.belongsToMany(db.profile, { through: "user_profile" });
db.profile.belongsToMany(db.customer, { through: "user_profile" });

//grant i want instead of many to many we can create 1-M (customer - grant) and 1-M (customer - grant)


db.customer.belongsToMany(db.profile, { through: db.grant });
db.profile.belongsToMany(db.customer, { through: db.grant });

db.customer.hasMany(db.grant);
db.grant.belongsTo(db.customer);

db.profile.hasMany(db.grant);
db.grant.belongsTo(db.profile);


db.sequelize.sync({ alter: true }).then(() => {
  console.log("yes re-sync done!");
});
module.exports = db;
