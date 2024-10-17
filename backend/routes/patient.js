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
    const patients = await Patient.findAll({ where: { deletedAt: null } }); // assuming you are using Sequelize
    const count = await Patient.count(); // Get the total count
    res.json({ patients, count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update patient by ID
router.put('/patient/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, gender, date_of_birth, email, phone_number, address } = req.body;

    // Find the patient by ID
    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if required fields are missing or invalid
    if (!first_name || !last_name || !email || !phone_number || !gender || ! date_of_birth || !address ) {
      return res.status(400).json({ message: 'Some fields are required.' });
    }

    // Update the patient's details, falling back to the existing values if not provided
    patient.first_name = first_name || patient.first_name;
    patient.last_name = last_name || patient.last_name;
    patient.email = email || patient.email;
    patient.phone_number = phone_number || patient.phone_number;
    patient.gender = gender || patient.gender;
    patient.date_of_birth = date_of_birth || patient.date_of_birth;
    patient.address = address || patient.address;

    // Save the updated patient
    await patient.save();

    res.status(200).json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Failed to update patient', error: error.message });
  }
});

// Delete patient by ID
router.delete('/patient/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the patient by ID
    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Delete the patient
    await patient.destroy();

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ message: 'Failed to delete patient', error });
  }
});


module.exports = router;
