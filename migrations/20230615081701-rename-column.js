'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('timetables','staff_id','user_id')
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.renameColumn('timetables','user_id','staff_id')
  }
};
