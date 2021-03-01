'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class indiNotice extends Model {
    static associate(models) {
      models.indiNotice.belongsTo(models.user);
      models.indiNotice.belongsTo(models.children);
    }
  }
  indiNotice.init(
    {
      content: DataTypes.STRING(2000),
    },
    {
      sequelize,
      modelName: 'indiNotice',
    },
  );
  return indiNotice;
};
