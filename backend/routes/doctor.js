// routes/patients.js
const express = require('express');
const { Doctor } = require('../models'); // Sequelize model
const router = express.Router();

router.post('/doctor', async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number } = req.body;

    // Create the fullName by combining first and last name
    //const fullName = `${firstName} ${lastName}`;

    // Create the doctor in the database
    const newDoctor = await Doctor.create({
      first_name, 
      last_name, 
      email, 
      phone_number
    });

    res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create doctor', error });
  }
});

// In your server-side code
router.get('/doctor', async (req, res) => {
  try {
    const doctors = await Doctor.findAll(); // assuming you are using Sequelize
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
