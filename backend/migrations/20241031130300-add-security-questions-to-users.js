'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'security_question_1', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'security_answer_1', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'security_question_2', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'security_answer_2', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'security_question_3', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'security_answer_3', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'security_question_1');
    await queryInterface.removeColumn('Users', 'security_answer_1');
    await queryInterface.removeColumn('Users', 'security_question_2');
    await queryInterface.removeColumn('Users', 'security_answer_2');
    await queryInterface.removeColumn('Users', 'security_question_3');
    await queryInterface.removeColumn('Users', 'security_answer_3');
  }
};
