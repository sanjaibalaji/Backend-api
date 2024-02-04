'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RioadminDashboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RioadminDashboard.init({
    name: DataTypes.STRING,
    subname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RioadminDashboard',
  });
  return RioadminDashboard;
};