'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class register extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  register.init({
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    batch: {
       type:DataTypes.INTEGER
    },
    session: {
      type:DataTypes.INTEGER
    },
 dept_code: {
  type:DataTypes.INTEGER
},
year: {
  type:DataTypes.INTEGER
},
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,

    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role_name: {
      type: DataTypes.ENUM('ST','HOD','CA','STAFF'),
      allowNull: true,
     
    },
    college_name: {
      type: DataTypes.STRING,
      allowNull: true,
    }

  }, {
    sequelize,
    modelName: 'register',
  });

  register.associate = function(models) {
    models.register.hasMany(models.dept_staff_details, { foreignKey: 'dept_code' });
    models.register.hasMany(models.timetable, { foreignKey: 'user_id' });
  }
  return register;
};