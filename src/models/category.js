module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  Category.associate = db => {
    Category.hasMany(db.Movie, {
        foreignKey: {
            name: "categoryId",
        }
    })
  }

  return Category;
};
