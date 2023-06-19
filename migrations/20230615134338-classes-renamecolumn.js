'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.renameColumn('classes','batch','batch_id');
   await queryInterface.renameColumn('dept_sub_details','batch','batch_id');
   await queryInterface.renameColumn('timetables','batch','batch_id');
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
