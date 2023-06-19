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
    batch: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'batch_details',
  });
  batch_details.associate = function(models) {
    models.batch_details.belongsTo(models.department, { foreignKey: 'batch_id' });
  }
  return batch_details;
};