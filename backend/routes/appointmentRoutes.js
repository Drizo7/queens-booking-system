// backend/routes/appointmentRoutes.js
const express = require('express');
const { createAppointment, getAppointmentsByPatient } = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Create an appointment (protected route)
router.post('/create', authMiddleware, createAppointment);

// Get appointments for a patient (protected route)
router.get('/patient', authMiddleware, getAppointmentsByPatient);

module.exports = router;
