const express = require('express');
const { User } = require('../models'); // Adjust based on your models folder structure
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // JWT authentication middleware

// GET request to fetch user details
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['first_name', 'last_name', 'email', 'phone_number'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
