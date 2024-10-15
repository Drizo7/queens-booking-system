const express = require('express');
const bcrypt = require('bcrypt');
const { User, Receptionist } = require('../models'); // Ensure you import the Receptionist model
const router = express.Router();


router.get('/receptionist', async (req, res) => {
  try {
    const receptionists = await User.findAll({
      where: { role: 'receptionist' },
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

module.exports = router;
