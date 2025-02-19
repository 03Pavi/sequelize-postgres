module.exports = (sequelize, DataTypes, Model) => {
  class Subject extends Model {}

  Subject.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Subject",
    }
  );
  return Subject;
};
