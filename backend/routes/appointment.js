const express = require('express');
const { Appointment, Patient, Doctor, Clinic } = require('../models');
const router = express.Router();

// Create a new appointment
router.post('/appointment', async (req, res) => {
  try {
    const { date, start_time, duration, status, description, patient_id, doctor_id, clinic_id } = req.body;

    const newAppointment = await Appointment.create({
      date,
      start_time,
      duration,
      status,
      description,
      patient_id,
      doctor_id,
      clinic_id,
    });

    res.status(201).json({ message: 'Appointment created successfully', clinic: newAppointment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create Appointment' });
  }
});

// Fetch all appointments with associated patient, doctor, and clinic details
router.get('/appointment', async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { deletedAt: null },
      include: [
        { model: Patient, attributes: ['first_name', 'last_name'] }, // Include patient name
        { model: Doctor, attributes: ['first_name', 'last_name'] },  // Include doctor name
        { model: Clinic, attributes: ['name'] }  // Include clinic name
      ]
    });
    const count = await Appointment.count(); // Get the total count
    res.json({ appointments, count });
  } catch (error) {
    console.error('Error fetching appointments:', error); // Log the actual error
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Get all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// Get all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// Get all clinics
router.get('/clinics', async (req, res) => {
  try {
    const clinics = await Clinic.findAll();
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch clinics' });
  }
});

module.exports = router;
