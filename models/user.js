'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Activity, {
    as: 'Activities', through: 'user_activities', foreignKey: 'activityId'
    })
  };
  return User;
};
