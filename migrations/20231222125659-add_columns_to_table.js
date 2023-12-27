'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('registers','batch_id',{
    type:Sequelize.INTEGER,
    allowNull:true
   })
    
   await queryInterface.addColumn('registers','class_code',{
    type:Sequelize.INTEGER,
    allowNull:true
   })

   await queryInterface.addColumn('registers','dept_code',{
    type:Sequelize.INTEGER,
    allowNull:true
   })

   await queryInterface.addColumn('registers','sessions',{
    type:Sequelize.STRING,
    allowNull:true
   })

   await queryInterface.addColumn('registers','year',{
    type:Sequelize.INTEGER,
    allowNull:true
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
