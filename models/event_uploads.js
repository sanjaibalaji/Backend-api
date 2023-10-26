'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event_uploads extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event_uploads.init({
    user_id: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    event_name: DataTypes.STRING,
    hosting_dept: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    start_time:DataTypes.TIME,
    end_time: DataTypes.TIME,
    chief_Guest: DataTypes.STRING,
    venue: DataTypes.STRING,
    event_image_path: DataTypes.STRING,
    event_image_path1: DataTypes.BLOB,
    event_image_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event_uploads',
  });
  return event_uploads;
};