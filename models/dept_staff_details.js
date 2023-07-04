'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dept_staff_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dept_staff_details.init({
    dept_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dept_staff_details',
  });
  dept_staff_details.associate = function(models) {
    models.dept_staff_details.belongsTo(models.register, { foreignKey: 'user_id' });
  }

  return dept_staff_details;
};