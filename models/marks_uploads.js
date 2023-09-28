'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class marks_uploads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  marks_uploads.init({
    dept_code: DataTypes.INTEGER,
    batch_id: DataTypes.INTEGER,
    sub_code: DataTypes.INTEGER,
    examtype: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    obtained_marks: DataTypes.INTEGER,
    total_marks: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'marks_uploads',
  });
  return marks_uploads;
};