module.exports = (sequelize, DataTypes, Model) => {
  const Customer = sequelize.define(
    "Customer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "phone_number",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      timestamps: true,
    }
  );
  return Customer;
};
