'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dept_sub_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dept_sub_details.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dept_code: DataTypes.STRING,
    sub_code: DataTypes.STRING,
    batch_id: DataTypes.STRING,
    year: DataTypes.STRING,
    Clg_code:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dept_sub_details',
  });
  return dept_sub_details;
};