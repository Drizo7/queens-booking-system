const express = require('express');
const bcrypt = require('bcrypt');
const { User, Receptionist } = require('../models'); // Adjust based on your models folder structure
const router = express.Router();

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, phone_number, password, role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
      role: 'receptionist', // Set role as 'receptionist'
    });

     // Add receptionist-specific data
    await Receptionist.create({
      user_id: newUser.id, // Link with the User table
      first_name,
      last_name,
      email,
      phone_number,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
