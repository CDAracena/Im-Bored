'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_activities = sequelize.define('user_activities', {
    userId: DataTypes.INTEGER
  }, {});
  user_activities.associate = function(models) {
    // associations can be defined here
  };
  return user_activities;
};