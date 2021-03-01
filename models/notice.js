'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notice extends Model {
    static associate(models) {
      models.notice.belongsTo(models.institution);
    }
  }
  notice.init(
    {
      category: DataTypes.STRING,
      writer: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING(2000),
    },
    {
      sequelize,
      modelName: 'notice',
    },
  );
  return notice;
};
