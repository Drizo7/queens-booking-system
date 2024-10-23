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

// Update appointment by ID
router.put('/appointment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, start_time, duration, status, description, patient_id, doctor_id, clinic_id } = req.body;

    // Find the appointment by ID
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if required fields are missing or invalid
    if (!date || !start_time || !duration || !status || !patient_id || !doctor_id || !clinic_id) {
      return res.status(400).json({ message: 'Date, start time, duration, status, patient, doctor, and clinic are required.' });
    }

    // Update the appointment's details, falling back to the existing values if not provided
    appointment.date = date || appointment.date;
    appointment.start_time = start_time || appointment.start_time;
    appointment.duration = duration || appointment.duration;
    appointment.status = status || appointment.status;
    appointment.description = description || appointment.description;
    appointment.patient_id = patient_id || appointment.patient_id;
    appointment.doctor_id = doctor_id || appointment.doctor_id;
    appointment.clinic_id = clinic_id || appointment.clinic_id;

    // Save the updated appointment
    await appointment.save();

    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Failed to update appointment', error: error.message });
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
