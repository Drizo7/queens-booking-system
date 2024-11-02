// backend/controllers/resetPasswordController.js


const { User } = require('../models');
const bcrypt = require('bcrypt');
const { generateToken, comparePassword } = require('../utils/auth');

// Verify security answers and reset password
exports.verifySecurityAnswers = async (req, res) => { 
  const { email, answer1, answer2, answer3 } = req.body;

  try {
    console.log('Received email:', email);
    console.log('Provided answers:', { answer1, answer2, answer3 });

    // Find the user by email
    const user = await User.findOne({ where: { email }, 
     });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check answers for at least 2 out of 3 matches
    const comparisonResults = {
      result1: await comparePassword(answer1, user.security_answer_1),
      result2: await comparePassword(answer2, user.security_answer_2),
      result3: await comparePassword(answer3, user.security_answer_3),
    };

    console.log('Comparison results:', comparisonResults);
    console.log('Stored security answers:', {
      security_answer_1: user.security_answer_1,
      security_answer_2: user.security_answer_2,
      security_answer_3: user.security_answer_3,
    });

    const matchCount = Object.values(comparisonResults).filter(Boolean).length;

    console.log('Match count:', matchCount);

    if (matchCount >= 2) {
      // If verified, allow the user to proceed with password reset
      return res.status(200).json({ message: 'Security answers verified. You may reset your password.' });
    } else {
      console.log('Security answers do not match');
      return res.status(400).json({ message: 'Security answers do not match' });
    }
  } catch (error) {
    console.error('Error verifying answers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Reset password after verification
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await user.update({ password: hashedPassword });

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
