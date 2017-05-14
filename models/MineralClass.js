"use strict";

module.exports = function(sequelize, DataTypes) {
  var MineralClass = sequelize.define("MineralClass", {
    "id": {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    "name": DataTypes.STRING,
    "description": DataTypes.TEXT,
    "description_html": DataTypes.TEXT,
    "composition": DataTypes.STRING
  }, {
    tableName: "mineral_class",
    underscored: true,
    classMethods: {
      associate: function(models) {
        MineralClass.hasMany(models.Mineral, {as: 'Mineral'});
        MineralClass.belongsTo(models.User, {as: 'User'});
      }
    }
  });

  return MineralClass;
};
