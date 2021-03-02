'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food extends Model {
    static associate(models) {
      models.food.belongsTo(models.institution);
    }
  }
  food.init(
    {
      title: DataTypes.STRING,
      monthfood: DataTypes.STRING,
      dailyfood: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'food',
    },
  );
  return food;
};
