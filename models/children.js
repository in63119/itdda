'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class children extends Model {
    static associate(models) {
      models.children.belongsTo(models.institution);
      models.children.belongsTo(models.user);
      models.children.belongsTo(models.classs);
      models.children.hasMany(models.indiNotice);
      models.children.hasMany(models.medicine);
    }
  }
  children.init(
    {
      name: DataTypes.STRING,
      sex: DataTypes.STRING,
      age: DataTypes.INTEGER,
      address: DataTypes.STRING,
      isMember: DataTypes.BOOLEAN,
      profileImg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'children',
    },
  );
  return children;
};
