'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class class_tutor_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  class_tutor_details.init({
    class_code: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    batch_id: DataTypes.STRING,
    clg_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'class_tutor_details',
  });
  return class_tutor_details;
};