const express = require('express');
const bcrypt = require('bcrypt');
const { User, Receptionist } = require('../models'); // Ensure you import the Receptionist model
const router = express.Router();


router.get('/receptionist', async (req, res) => {
  try {
    const receptionists = await User.findAll({
      where: { role: 'receptionist' , deletedAt: null },
      include: [{
        model: Receptionist,  // Reference the Receptionist model correctly here
        as: 'receptionistDetails',  // This should match the alias in the model association
      }],
    });
    res.status(200).json(receptionists);
  } catch (err) {
    console.error('Error fetching receptionists:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update receptionist by ID
router.put('/receptionist/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number } = req.body;

    // Find the receptionist by ID
    const receptionist = await Receptionist.findByPk(id);

    if (!receptionist) {
      return res.status(404).json({ message: 'Receptionist not found' });
    }

    // Check if required fields are missing or invalid
    if (!first_name || !last_name || !email || !phone_number) {
      return res.status(400).json({ message: 'First name, last name, email and phone number is required.' });
    }

    // Update the receptionist's details, falling back to the existing values if not provided
    receptionist.first_name = first_name || receptionist.first_name;
    receptionist.last_name = last_name || receptionist.last_name;
    receptionist.email = email || receptionist.email;
    receptionist.phone_number = phone_number || receptionist.phone_number;

    // Save the updated receptionist
    await receptionist.save();

    res.status(200).json({ message: 'Receptionist updated successfully', receptionist });
  } catch (error) {
    console.error('Error updating receptionist:', error);
    res.status(500).json({ message: 'Failed to update receptionist', error: error.message });
  }
});

// Delete receptionist by ID
router.delete('/receptionist/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the receptionist by ID
    const receptionist = await Receptionist.findByPk(id);

    if (!receptionist) {
      return res.status(404).json({ message: 'Receptionist not found' });
    }

    // Delete the receptionist
    await receptionist.destroy();

    res.status(200).json({ message: 'Receptionist deleted successfully' });
  } catch (error) {
    console.error('Error deleting receptionist:', error);
    res.status(500).json({ message: 'Failed to delete receptionist', error });
  }
});

module.exports = router;
