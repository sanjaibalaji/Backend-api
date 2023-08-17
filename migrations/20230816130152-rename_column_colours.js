'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('dayorder_allotment','item_name','date',{
      type: Sequelize.DATE, 
      allowNull: true,
      defaultValue: null,
    })
    await queryInterface.renameColumn('dayorder_allotment','item_colour','day',{
      type: Sequelize.STRING, 
      allowNull: true,
      defaultValue: null,
    })
    await queryInterface.addColumn('dayorder_allotment','dayorder',{
      type: Sequelize.STRING, 
      allowNull: true,
      defaultValue: null,
    })
    await queryInterface.addColumn('dayorder_allotment','batch_id',{
      type: Sequelize.STRING, 
      allowNull: true,
      defaultValue: null,
    })
    await queryInterface.addColumn('dayorder_allotment','dept_code',{
      type: Sequelize.STRING, 
      allowNull: true,
      defaultValue: null,
    })
    await queryInterface.addColumn('dayorder_allotment','class_code',{
      type: Sequelize.STRING, 
      allowNull: true,
      defaultValue: null,
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
