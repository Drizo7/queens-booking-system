// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');


// Generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, {
    expiresIn: '1d',
  });
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare hashed password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
