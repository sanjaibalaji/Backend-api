'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
      'registers', // table name
      'role', // new field name
      {
      type: Sequelize.ENUM('Staff','HOD','Admin','Student'),
      allowNull: true,
      after: 'manager_bonus',
      }
      ),
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('registers', 'role'),
    ]);
  }
};

