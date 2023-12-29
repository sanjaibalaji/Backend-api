'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('registers','batch',{
    type: Sequelize.INTEGER,
    allowNull: true,
   }),
   await queryInterface.addColumn('registers','year',{
    type: Sequelize.INTEGER,
    allowNull: true,
   }),
   await queryInterface.addColumn('registers','session',{
    type: Sequelize.INTEGER,
    allowNull: true,
   }),
   await queryInterface.addColumn('registers','dept_code',{
    type: Sequelize.INTEGER,
    allowNull: true,
   })
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
