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
    user_id: DataTypes.INTEGER,
    dept_id: DataTypes.INTEGER,
    class_code: DataTypes.INTEGER,
    batch_id: DataTypes.INTEGER,
    dayorder: DataTypes.INTEGER,
    period_no: DataTypes.INTEGER,
    start_time:DataTypes.TIME,
    end_time:DataTypes.TIME
  }, {
    sequelize,
    modelName: 'timetable',
  });;
  timetable.associate = function(models) {
    models.timetable.belongsTo(models.subject_details, { foreignKey: 'sub_code' });
    models.timetable.belongsTo(models.department, { foreignKey: 'dept_id'});
    // models.department.hasMany(models.timetable, { foreignKey: 'dept_id' });
    models.timetable.belongsTo(models.batch_details, { foreignKey: 'batch_id'});
    models.timetable.belongsTo(models.classes, { foreignKey: 'class_code' });
    models.timetable.belongsTo(models.register, { foreignKey: 'user_id' });
    


  }
  return timetable;

  
};