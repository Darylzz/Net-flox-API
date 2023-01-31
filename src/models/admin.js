module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    adminName: DataTypes.STRING
  }, { underscored: true });
  return Admin;
};
