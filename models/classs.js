'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classs extends Model {
    static associate(models) {
      models.classs.belongsTo(models.institution);
      models.classs.hasMany(models.children);
      models.classs.hasMany(models.medicine);
      models.classs.hasMany(models.user);
    }
  }
  classs.init(
    {
      name: DataTypes.STRING,
      timetable: DataTypes.STRING(1000),
    },
    {
      sequelize,
      modelName: 'classs',
    },
  );
  return classs;
};
