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
      userId: DataTypes.INTEGER, // ! user table 과 연결되어 있지는 않다.
    },
    {
      sequelize,
      modelName: 'album',
    },
  );
  return album;
};
