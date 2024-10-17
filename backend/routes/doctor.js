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
    const doctors = await Doctor.findAll({ where: { deletedAt: null } }); // assuming you are using Sequelize
    const count = await Doctor.count(); // Get the total count
    res.json({ doctors, count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update doctor by ID
router.put('/doctor/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number } = req.body;

    // Find the doctor by ID
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if required fields are missing or invalid
    if (!first_name || !last_name || !email || !phone_number) {
      return res.status(400).json({ message: 'First name, last name, email and phone number is required.' });
    }

    // Update the doctor's details, falling back to the existing values if not provided
    doctor.first_name = first_name || doctor.first_name;
    doctor.last_name = last_name || doctor.last_name;
    doctor.email = email || doctor.email;
    doctor.phone_number = phone_number || doctor.phone_number;

    // Save the updated doctor
    await doctor.save();

    res.status(200).json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Failed to update doctor', error: error.message });
  }
});

// Delete doctor by ID
router.delete('/doctor/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the doctor by ID
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Delete the doctor
    await doctor.destroy();

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Failed to delete doctor', error });
  }
});

module.exports = router;
