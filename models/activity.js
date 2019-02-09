'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    activity: DataTypes.STRING
  }, {});
  Activity.associate = function(models) {
    Activity.belongsToMany(models.User, {
      as: 'Users',
      through: 'user_activities',
      foreignKey: 'userId'
    })
  };
  return Activity;
};
