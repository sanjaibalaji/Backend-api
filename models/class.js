'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  classes.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    dept_code: DataTypes.STRING,
    section: DataTypes.STRING,
    strength: DataTypes.INTEGER,
    batch_id: DataTypes.STRING,
    clg_code:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'classes',
  });
  classes.associate = function(models) {
    models.classes.hasMany(models.timetable, { foreignKey: 'class_code' });
  };
  return classes;
};