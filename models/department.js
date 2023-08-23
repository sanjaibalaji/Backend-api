'use strict';
const {Model} = require('sequelize');
const { Timetable, Department } = require(".");

module.exports = (sequelize, DataTypes) => {
  class department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  department.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dept_name: DataTypes.STRING,
    no_of_sections: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
    batch_id:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'department',
  });

  department.associate = function(models) {
    models.department.hasMany(models.batch_details, { foreignKey: 'dept_code' });
    models.department.hasMany(models.timetable, { foreignKey: 'dept_id' });
    // models.department.belongsTo(models.timetable, { foreignKey: 'dept_id'});

  };
  return department;


};