'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clinics', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Clinics', 'deletedAt');
  }
};
