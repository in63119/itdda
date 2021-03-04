'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    static associate(models) {
      models.album.belongsTo(models.institution);
    }
  }
  album.init(
    {
      photo: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING(2000),
    },
    {
      sequelize,
      modelName: 'album',
    },
  );
  return album;
};
