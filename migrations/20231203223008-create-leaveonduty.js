'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaveonduties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      req_type: {
        type: Sequelize.STRING
      },
      from_date: {
        type: Sequelize.DATE
      },
      to_date: {
        type: Sequelize.DATE
      },
      from_time: {
        type: Sequelize.TIME
      },
      to_time: {
        type: Sequelize.TIME
      },
      no_of_days: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.STRING
      },
      sessions: {
        type: Sequelize.STRING
      },
      period: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      is_approved: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('leaveonduties');
  }
};