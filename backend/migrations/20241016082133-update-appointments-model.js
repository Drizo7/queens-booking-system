'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Appointments', 'clinic_id', {
      type: Sequelize.UUID,
      references: {
        model: 'Clinics', // name of the associated table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });

    // If patient_id or doctor_id columns already exist but need updates, you can modify them:
    // If they don't exist yet, you can add them here the same way as 'clinic_id'

    await queryInterface.changeColumn('Appointments', 'patient_id', {
      type: Sequelize.UUID,
      references: {
        model: 'Patients',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });

    await queryInterface.changeColumn('Appointments', 'doctor_id', {
      type: Sequelize.UUID,
      references: {
        model: 'Doctors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Appointments', 'clinic_id');
    // You can also reverse changes to patient_id and doctor_id if needed:
    // await queryInterface.changeColumn('Appointments', 'patient_id', { ... });
    // await queryInterface.changeColumn('Appointments', 'doctor_id', { ... });
  },
};