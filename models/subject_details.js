'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subject_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  subject_details.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    //sub_code: DataTypes.STRING,
    sub_name: DataTypes.STRING,
    clg_code:DataTypes.STRING,
    sub_code:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subject_details',
  });
  subject_details.associate = function(models) {
    models.subject_details.hasMany(models.timetable, { foreignKey: 'sub_code' });
    models.subject_details.hasMany(models.staff_sub_details, { foreignKey: 'sub_code' });
  }
  return subject_details;
};