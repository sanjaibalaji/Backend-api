'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class batch_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  batch_details.init({
    class_code:DataTypes.INTEGER,
    batch: DataTypes.STRING,
    year: DataTypes.STRING,
    sessions:DataTypes.STRING,
    dept_code:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'batch_details',
  });
  batch_details.associate = function(models) {
    models.batch_details.belongsTo(models.department, { foreignKey: 'id' });
    models.batch_details.hasMany(models.classes, { foreignKey: 'id' });
    models.batch_details.hasMany(models.timetable, { foreignKey: 'batch_id'});
   
   
  }

  return batch_details;
};