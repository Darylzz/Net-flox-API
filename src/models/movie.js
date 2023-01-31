module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      moviePic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      movieDes: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      movieTrailer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    }
  );
  Movie.associate = (db) => {
    Movie.hasMany(db.Profile, {
      foreignKey: {
        name: "movieId",
      },
    });
    Movie.belongsTo(db.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
    });
  };
  return Movie;
};
