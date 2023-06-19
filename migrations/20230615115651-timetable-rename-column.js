'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('timetables','class_id','class_code');
    await queryInterface.renameColumn('timetables','dept_id','dept_code');
    await queryInterface.renameColumn('timetables','sub_id','sub_code');
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
