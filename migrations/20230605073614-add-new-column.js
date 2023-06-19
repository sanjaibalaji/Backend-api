'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('registers', 'college_name', {
      type: Sequelize.STRING,
      allowNull: true,
})},
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('registers', 'college_name');
  },
};