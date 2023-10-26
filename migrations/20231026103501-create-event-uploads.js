'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_uploads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      event_name: {
        type: Sequelize.STRING
      },
      hosting_dept: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      end_time: {
        type: Sequelize.TIME
      },
      chief_Guest: {
        type: Sequelize.STRING
      },
      venue: {
        type: Sequelize.STRING
      },
      event_image_path: {
        type: Sequelize.STRING
      },
      event_image_name: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('event_uploads');
  }
};