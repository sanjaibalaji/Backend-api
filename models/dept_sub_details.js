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
    dept_code: DataTypes.INTEGER,
    sub_code: DataTypes.INTEGER,
    batch_id: DataTypes.INTEGER,
    year: DataTypes.STRING,
    Clg_code:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dept_sub_details',
  });
   dept_sub_details.associate = function(models) {
    models.dept_sub_details.belongsTo(models.subject_details, { foreignKey: 'sub_code' });
  }
  return dept_sub_details;
};