'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exam_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exam_details.init({
    exam_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'exam_details',
  });
  return exam_details;
};