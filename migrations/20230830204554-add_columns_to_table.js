'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('timetables', 'start_time', {
      type: Sequelize.TIME,
      allowNull: true,
    });

    await queryInterface.addColumn('timetables', 'end_time', {
      type: Sequelize.TIME,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
