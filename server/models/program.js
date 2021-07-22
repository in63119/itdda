'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class program extends Model {
    static associate(models) {
      models.program.belongsTo(models.institution);
    }
  }
  program.init(
    {
      title: DataTypes.STRING,
      programImg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'program',
    },
  );
  return program;
};
