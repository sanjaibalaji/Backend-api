'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('roles', 'id');
  },

  down: (queryInterface, Sequelize) => {
    // If needed, you can define the logic to revert the column deletion here
    // For example, you could add the column back using queryInterface.addColumn()
    return queryInterface.removeColumn('roles', 'id', {
      type: Sequelize.DataType,
      // Specify any other column properties
    });
  }
};