"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    "id": {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    "login": DataTypes.STRING,
    "password": DataTypes.STRING,
    "firstname": DataTypes.STRING,
    "lastname": DataTypes.STRING,
    "email": DataTypes.STRING
  }, {
    tableName: "user",
    underscored: true,
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Role, {through: "user_role", as: "Role"});
        User.hasMany(models.MineralClass, {as: 'MineralClass'});
        User.hasMany(models.Mineral, {as: 'Mineral'});
        User.hasMany(models.MineralImage, {as: 'MineralImage'});
      }
    }
  });

  return User;
};
