'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('dept_sub_details','dept_id','dept_code');
    await queryInterface.renameColumn('dept_sub_details','clg_id','clg_code');
    await queryInterface.renameColumn('dept_sub_details','sub_id','sub_code');

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
