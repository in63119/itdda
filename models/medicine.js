'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class medicine extends Model {
    static associate(models) {
      models.medicine.belongsTo(models.children);
      models.medicine.belongsTo(models.user);
      models.medicine.belongsTo(models.classs);
    }
  }
  medicine.init(
    {
      requestOrReport: DataTypes.STRING,
      symptom: DataTypes.STRING,
      mediType: DataTypes.STRING,
      quantity: DataTypes.STRING,
      time: DataTypes.STRING,
      storage: DataTypes.STRING,
      report: DataTypes.STRING(2000),
    },
    {
      sequelize,
      modelName: 'medicine',
    },
  );
  return medicine;
};
