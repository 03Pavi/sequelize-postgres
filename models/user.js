module.exports = (sequelize, DataTypes, Model) => {
  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      first_name: {
        type: DataTypes.STRING,

        // table level need to drop table before execute
        unique: true,
        allowNull: false,
        validate: {
            //sequelize level no need to drop table before execute
          isAlpha: {
            msg:"Name should contain only alphabets"
          },
        },
        get() {
          const first_name = this.getDataValue("first_name");
          return first_name ? first_name.toUpperCase() : null;
        },
      },
      last_name: {
        type: DataTypes.STRING,
        set(last_name) {
          this.setDataValue("last_name", `${last_name} 😄`);
        },
      },
      full_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.first_name} ${this.last_name}`;
        },
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
