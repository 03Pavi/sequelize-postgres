module.exports = (sequelize, DataTypes, Model) => {
  const Profile = sequelize.define(
    "profile",
    {
      name: DataTypes.STRING,
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      timestamps: true,
    }
  );
  return Profile;
};
