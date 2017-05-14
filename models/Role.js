"use strict";

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    "id": {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    "name": DataTypes.STRING,
  }, {
    tableName: "role",
    underscored: true,
    classMethods: {
      associate: function(models) {
        Role.belongsToMany(models.User, {through: "user_role", as: "User"});
      }
    }
  });

  return Role;
};
