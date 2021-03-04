'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.belongsTo(models.classs);
      models.user.belongsToMany(models.institution, {
        through: 'users_institutions',
      });
      models.user.hasMany(models.bugReport);
      models.user.hasMany(models.children);
      models.user.hasMany(models.indiNotice);
      models.user.hasMany(models.medicine);
    }
  }
  user.init(
    {
      permission: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      mobile: DataTypes.INTEGER,
      role: DataTypes.STRING,
      salt: DataTypes.STRING,
      passwordChange: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return user;
};
