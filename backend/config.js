// backend/config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'supersecretkey', // For JWT signing
  dbConnectionString: process.env.DB_CONNECTION_STRING || './database/hospital.db',
};
