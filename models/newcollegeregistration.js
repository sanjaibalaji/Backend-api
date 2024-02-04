'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewcollegeRegistration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NewcollegeRegistration.init({
    college_name: DataTypes.STRING,
    clg_code: DataTypes.STRING,
    college_email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NewcollegeRegistration',
  });
  return NewcollegeRegistration;
};