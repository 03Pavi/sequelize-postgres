module.exports = (sequelize, DataTypes, Model) => {
  class Contact extends Model {}

  Contact.init(
    {
      current_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permanent_address: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      UserId: "user_id",
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Contact",
    }
  );
  return Contact;
};
