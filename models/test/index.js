module.exports = (sequelize, DataTypes, Model) => {
  const TUser = sequelize.define(
    "TUser",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      tableName: "tUser",
      timestamps: false,
    }
  );

  const Test = sequelize.define(
    "Test",
    {
      code: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "test",
      timestamps: false,
    }
  );
  return { Test, TUser };
};

