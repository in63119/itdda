'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class timetable extends Model {
    static associate(models) {
      models.timetable.belongsTo(models.institution);
    }
  }
  timetable.init(
    {
      step: DataTypes.STRING,
      time: DataTypes.STRING,
      contents: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'timetable',
    },
  );
  return timetable;
};
