// backend/controllers/userController.js
const db = require('../database/hospital.sqlite');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');

// Register a new user (patient, doctor, receptionist)
const registerUser = async (req, res) => {
  const { name, email, password, role, specialty } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  try {
    const [id] = await db('users').insert({
      name,
      email,
      password: hashedPassword,
      role,
      specialty: role === 'doctor' ? specialty : null, // Specialty only for doctors
    });

    const user = { id, name, email, role };

    // Return user with token
    res.json({ user, token: generateToken(user) });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user' });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await db('users').where({ email }).first();

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ user, token: generateToken(user) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
