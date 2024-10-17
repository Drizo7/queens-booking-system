// routes/patients.js
const express = require('express');
const { Patient } = require('../models'); // Sequelize model
const router = express.Router();

router.post('/patient', async (req, res) => {
  try {
    const { first_name, last_name, gender, date_of_birth, email, phone_number, address } = req.body;

    // Create the fullName by combining first and last name
    //const fullName = `${firstName} ${lastName}`;

    // Create the patient in the database
    const newPatient = await Patient.create({
      first_name,
      last_name,
      gender,
      date_of_birth,
      email,
      phone_number,
      address
    });

    res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create patient', error });
  }
});

// In your server-side code
router.get('/patient', async (req, res) => {
  try {
    const patients = await Patient.findAll(); // assuming you are using Sequelize
    const count = await Patient.count(); // Get the total count
    res.json({ patients, count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
