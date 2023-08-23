'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dayorder_allotments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      today_date: {
        type: Sequelize.DATE
      },
      day: {
        type: Sequelize.STRING
      },
      dayorder: {
        type: Sequelize.INTEGER
      },
      dept_code: {
        type: Sequelize.INTEGER
      },
      batch_id: {
        type: Sequelize.INTEGER
      },
      class_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dayorder_allotments');
  }
};