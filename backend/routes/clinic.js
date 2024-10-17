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
    const clinics = await Clinic.findAll({ where: { deletedAt: null } });
    const count = await Clinic.count(); // Get the total count
    res.json({ clinics, count });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update clinic by ID
router.put('/clinic/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, location, operating_hours } = req.body;

    // Find the clinic by ID
    const clinic = await Clinic.findByPk(id);

    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    // Check if required fields are missing or invalid
    if (!name || !location || !operating_hours) {
      return res.status(400).json({ message: 'Name, location, and operating hours are required.' });
    }

    // Update the clinic's details, falling back to the existing values if not provided
    clinic.name = name || clinic.name;
    clinic.description = description || clinic.description;
    clinic.location = location || clinic.location;
    clinic.operating_hours = operating_hours || clinic.operating_hours;

    // Save the updated clinic
    await clinic.save();

    res.status(200).json({ message: 'Clinic updated successfully', clinic });
  } catch (error) {
    console.error('Error updating clinic:', error);
    res.status(500).json({ message: 'Failed to update clinic', error: error.message });
  }
});

// Delete clinic by ID
router.delete('/clinic/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the clinic by ID
    const clinic = await Clinic.findByPk(id);

    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    // Delete the clinic
    await clinic.destroy();

    res.status(200).json({ message: 'Clinic deleted successfully' });
  } catch (error) {
    console.error('Error deleting clinic:', error);
    res.status(500).json({ message: 'Failed to delete clinic', error });
  }
});



module.exports = router;
