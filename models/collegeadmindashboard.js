'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collegeadminDashboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  collegeadminDashboard.init({
    name: DataTypes.STRING,
    subname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'collegeadminDashboard',
  });
  return collegeadminDashboard;
};