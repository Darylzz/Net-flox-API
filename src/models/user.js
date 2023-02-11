module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.ENUM("user","admin"),
        allowNull: false,
        defaultValue: "user",
      }
    },
    {
      underscored: true,
    }
  );
  User.associate = db => {
    User.hasMany(db.Profile, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    })
  }
  return User;
};
