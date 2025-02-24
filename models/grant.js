module.exports = (sequelize, DataTypes, Model) => {
  const Grant = sequelize.define(
    "grant",
    {
      selfGranted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Grant;
};
