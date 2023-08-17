'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class colours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  colours.init({
    item_name: DataTypes.STRING,
    item_colour: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'colours',
  });
  return colours;
};