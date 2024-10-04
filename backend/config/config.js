// backend/config/config.js
const { Sequelize } = require('sequelize');

// Database configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/hospital.db', // Adjust the path as necessary
});

module.exports = sequelize;
