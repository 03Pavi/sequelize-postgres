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

db.user.hasMany(db.contact, { foreignKey: "user_id", as: "contact" });
db.contact.belongsTo(db.user, { foreignKey: "user_id", as: "user_details" });

db.user.belongsToMany(db.subject, { through: "user_subject", as: "subjects" });
db.subject.belongsToMany(db.user, { through: "user_subject", as: "users" });

db.sequelize.sync().then(() => {
  console.log("yes re-sync done!");
});
module.exports = db;
