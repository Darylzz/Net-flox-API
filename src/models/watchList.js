module.exports = (sequelize, DataTypes) => {
  const WatchList = sequelize.define(
    "WatchList",
    {},
    {
      underscored: true,
    }
  );
  WatchList.associate = (db) => {
    WatchList.belongsTo(db.Profile, {
      foreignKey: {
        name: "profileId",
        allowNull: false,
      },
    }),
      WatchList.belongsTo(db.Movie, {
        foreignKey: {
          name: "movieId",
          allowNull: false,
        },
      });
  };
  return WatchList;
};
