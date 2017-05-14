"use strict";

module.exports = function(sequelize, DataTypes) {
  var MineralImage = sequelize.define("MineralImage", {
    "id": {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    "description": DataTypes.TEXT,
    "url": DataTypes.STRING
  }, {
    tableName: "mineral_image",
    underscored: true,
    classMethods: {
      associate: function(models) {
        MineralImage.belongsTo(models.Mineral, {as: "Mineral"});
        MineralImage.belongsTo(models.User, {as: 'User'});
      }
    }
  });

  return MineralImage;
};
