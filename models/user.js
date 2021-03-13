'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.belongsTo(models.classs);
      // ! asdfasdf teacher만 classsId를 갖는다.
      models.user.belongsTo(models.institution);
      // ! asdfasdf parent는 institutionId를 갖지 않는다.
      // models.user.belongsToMany(models.institution, {
      //   through: 'users_institutions',
      // });
      models.user.hasMany(models.bugReport);
      models.user.hasMany(models.children);
      models.user.hasMany(models.indiNotice);
      models.user.hasMany(models.medicine);
    }
  }
  user.init(
    {
      permission: DataTypes.STRING,
      guest: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      mobile: DataTypes.INTEGER,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return user;
};
