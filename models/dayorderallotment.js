'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dayorderallotment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dayorderallotment.init({
    date: DataTypes.DATE,
    day: DataTypes.STRING,
    dayorder: DataTypes.INTEGER,
    dept_code: DataTypes.INTEGER,
    batch_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dayorderallotment',
  });
  return dayorderallotment;
};