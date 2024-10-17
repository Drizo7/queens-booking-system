'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Doctors', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('Patients', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('Receptionists', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('Appointments', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Doctors', 'deletedAt');
    await queryInterface.removeColumn('Patients', 'deletedAt');
    await queryInterface.removeColumn('Receptionists', 'deletedAt');
    await queryInterface.removeColumn('Appointments', 'deletedAt');
  }
};
