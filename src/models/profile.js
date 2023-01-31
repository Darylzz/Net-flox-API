module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      profileImage: DataTypes.STRING,
      profileName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      underscored: true,
    }
  );
  Profile.associate = db => {
    Profile.belongsTo(db.User,{
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    })
    Profile.belongsTo(db.Movie, {
      foreignKey: {
        name: "movieId"
      }
    })
  }
  return Profile;
};
