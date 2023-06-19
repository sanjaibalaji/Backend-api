'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('timetables','dept_code','dept_id')
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.renameColumn('timetables','dept_id','dept_code')
  }
};
