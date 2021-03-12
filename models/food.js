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
      photo: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING(2000),
      userId: DataTypes.INTEGER, // ! user table 과 연결되어 있지는 않다.
    },
    {
      sequelize,
      modelName: 'food',
    },
  );
  return food;
};
