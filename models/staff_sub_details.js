'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class staff_sub_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  staff_sub_details.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
    sub_code: DataTypes.INTEGER,
    clg_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'staff_sub_details',
  });
  staff_sub_details.associate = function(models) {
    models.staff_sub_details.belongsTo(models.subject_details, { foreignKey: 'sub_code' });
  }
  return staff_sub_details;
};