'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bugReport extends Model {
    static associate(models) {
      models.bugReport.belongsTo(models.user);
    }
  }
  bugReport.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING(2000),
    },
    {
      sequelize,
      modelName: 'bugReport',
    },
  );
  return bugReport;
};
