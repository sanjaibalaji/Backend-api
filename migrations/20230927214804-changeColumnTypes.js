'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('dept_sub_details', 'dept_code', {
      type: Sequelize.INTEGER, // Change to the desired data type
      allowNull: false, // Modify other options as needed
    });
    await queryInterface.changeColumn('dept_sub_details', 'sub_code', {
      type: Sequelize.INTEGER, // Change to the desired data type
      allowNull: true, // Modify other options as needed
    });
    await queryInterface.changeColumn('dept_sub_details', 'batch_id', {
      type: Sequelize.INTEGER, // Change to the desired data type
      allowNull: true, // Modify other options as needed
    });
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
