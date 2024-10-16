// routes/patients.js
const express = require('express');
const { Clinic } = require('../models'); // Sequelize model
const router = express.Router();

router.post('/clinic', async (req, res) => {
  try {
    const { name, description, location, operating_hours } = req.body;

    // Create the clinic in the database
    const newClinic = await Clinic.create({
      name, 
      description, 
      location, 
      operating_hours
    });

    res.status(201).json({ message: 'Clinic created successfully', clinic: newClinic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create clinic', error });
  }
});

// In your server-side code
router.get('/clinic', async (req, res) => {
  try {
    const clinics = await Clinic.findAll(); // assuming you are using Sequelize
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
