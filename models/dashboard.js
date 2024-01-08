'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dashboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dashboard.init({
    name: DataTypes.STRING,
    subname: DataTypes.STRING,
    role_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dashboard',
  });
  return dashboard;
};