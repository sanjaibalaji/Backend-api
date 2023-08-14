'use strict';
const {
  Model
} = require('sequelize');
const { Timetable, Department } = require(".");
module.exports = (sequelize, DataTypes) => {
  class timetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  timetable.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sub_code: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
    dept_id: DataTypes.INTEGER,
    class_code: DataTypes.STRING,
    batch_id: DataTypes.STRING,
    dayorder: DataTypes.STRING,
    period_no: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'timetable',
  });;
  timetable.associate = function(models) {
    models.timetable.belongsTo(models.subject_details, { foreignKey: 'sub_code' });
  }
  return timetable;

  
};