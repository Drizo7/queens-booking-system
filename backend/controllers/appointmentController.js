// backend/controllers/appointmentController.js
const db = require('../database/hospital.sqlite');

// Create an appointment
const createAppointment = async (req, res) => {
  const { patient_id, doctor_id, date, time } = req.body;

  try {
    const [id] = await db('appointments').insert({
      patient_id,
      doctor_id,
      date,
      time,
      status: 'pending',
    });

    res.json({ id, patient_id, doctor_id, date, time, status: 'pending' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating appointment' });
  }
};

// Get appointments by patient
const getAppointmentsByPatient = async (req, res) => {
  const patient_id = req.user.id;

  try {
    const appointments = await db('appointments').where({ patient_id });
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments' });
  }
};

module.exports = {
  createAppointment,
  getAppointmentsByPatient,
};
