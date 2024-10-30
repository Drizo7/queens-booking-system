const express = require('express');
const { User } = require('../models'); // Adjust based on your models folder structure
const router = express.Router();
const { comparePassword, hashPassword } = require('../utils/auth');
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

// PUT request to update user details
router.put('/profile', authMiddleware, async (req, res) => {
  const { first_name, last_name, email, phone_number } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.phone_number = phone_number;
    await user.save();

    res.status(201).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE request to delete the user account
router.delete('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/changepassword', authMiddleware, async (req, res) => {
  const userId = req.user.id; // Assuming user ID is set in the req.user from token middleware
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Verify old password
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    // Hash and update new password
    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
