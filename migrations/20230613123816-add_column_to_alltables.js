'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('class_tutor_details', 'clg_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('classes', 'clg_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('departments', 'clg_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('dept_sub_details', 'clg_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('registers', 'clg_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('roles', 'clg_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('staff_sub_details', 'clg_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('subject_details', 'clg_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('timetables', 'clg_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Repeat the addColumn statements for other tables as needed
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('table1', 'newColumn');
    await queryInterface.removeColumn('table2', 'newColumn');

    
  },
};