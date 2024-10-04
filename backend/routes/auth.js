const express = require('express');
const { User } = require('../models'); 
const { generateToken, comparePassword } = require('../utils/auth');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password: password ? 'provided' : 'not provided' });

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('User found:', user.email);

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials for user:', user.email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Password matches for user:', user.email);

    // Generate a JWT token
    const token = generateToken({ id: user.id, role: user.role });
    console.log('Generated token for user:', token);

    // Send the token back to the frontend
    res.json({ token });
  } catch (err) {
    console.error('Error during login process:', err); // Log the exact error
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
