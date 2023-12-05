'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class leaveonduty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  leaveonduty.init({
    req_type: DataTypes.STRING,
    user_id:DataTypes.INTEGER,
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    from_time: DataTypes.TIME,
    to_time: DataTypes.TIME,
    no_of_days: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    sessions: DataTypes.STRING,
    reason: DataTypes.STRING,
    is_approved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'leaveonduty',
  });
  return leaveonduty;
};