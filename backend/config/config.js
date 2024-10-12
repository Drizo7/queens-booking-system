const { Sequelize } = require('sequelize');
const config = require('./config.json')[process.env.NODE_ENV || 'development'];

// Initialize Sequelize using the selected environment config
const sequelize = new Sequelize(config);

module.exports = sequelize;
