'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
      async up (queryInterface, Sequelize) {
        await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Scheduled',
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reason_for_visit: {
        type: Sequelize.TEXT,
      },
      patient_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Patients', // 'Patients' refers to the table name
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      doctor_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Doctors', // 'Doctors' refers to the table name
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
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
