"use strict";

module.exports = function(sequelize, DataTypes) {
  var Mineral = sequelize.define("Mineral", {
    "id": {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    "name": DataTypes.STRING,
    "description": DataTypes.TEXT,
    "composition": DataTypes.STRING,
    "color": DataTypes.STRING,
    "color_p": DataTypes.STRING,
    "shine": DataTypes.STRING,
    "hardness_from": DataTypes.DOUBLE,
    "hardness_to": DataTypes.DOUBLE,
    "density_from": DataTypes.DOUBLE,
    "density_to": DataTypes.DOUBLE,
    "cleavage": DataTypes.STRING,
    "crystal_form": DataTypes.STRING,
    "mineral_aggregates": DataTypes.STRING,
    "diagnostic_signs": DataTypes.STRING
  }, {
    tableName: "mineral",
    underscored: true,
    classMethods: {
      associate: function(models) {
        Mineral.belongsTo(models.User, {as: 'User'});
        Mineral.hasMany(models.MineralImage, {as: 'MineralImage'});
      }
    }
  });

  return Mineral;
};
