'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class institution extends Model {
    static associate(models) {
      models.institution.belongsToMany(models.user, {
        through: 'users_institutions',
      });
      models.institution.hasMany(models.classs);
      models.institution.hasMany(models.food);
      models.institution.hasMany(models.notice);
      models.institution.hasMany(models.program);
      models.institution.hasMany(models.album);
    }
  }
  institution.init(
    {
      name: DataTypes.STRING,
      master: DataTypes.STRING,
      info: DataTypes.STRING,
      photo: DataTypes.STRING,
      timetable: DataTypes.STRING(2000),
    },
    {
      sequelize,
      modelName: 'institution',
    },
  );
  return institution;
};
