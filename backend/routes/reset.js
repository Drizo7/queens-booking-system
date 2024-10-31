// backend/routes/resetRoutes.js

const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPasswordController');

// Route to verify security answers
router.post('/verify-security-answers', resetPasswordController.verifySecurityAnswers);

// Route to reset the password
router.post('/reset-password', resetPasswordController.resetPassword);

module.exports = router;
