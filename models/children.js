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
      // ! isMember는 사실 없어도 됨 => classsId 가 null 이면 isMember를 false 인 상황이라고 생각하면 되거든.
      profileImg: DataTypes.STRING,
      profileImgCheck: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'children',
    },
  );
  return children;
};
