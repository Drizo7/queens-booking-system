import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios';
import {
  Button,
  DatePickerComp,
  Input,
  Select,
  TimePickerComp,
} from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';

function EditAppointmentModal({ appointment, closeModal, isOpen }) {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState(''); // Added for Duration
  const [status, setStatus] = useState('Scheduled');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [description, setDescription] = useState('');
  
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [errors, setErrors] = useState({});

  // Populate form fields when editing
  useEffect(() => {
    console.log("The value of the appointment : ", appointment);
    if (appointment) {
      setStartDate(new Date(appointment.date));  // Convert string to Date
      setStartTime(new Date(appointment.start_time));  // Convert string to Date
      setDuration(appointment.duration);
      setStatus({ name: appointment.status });
      setDescription(appointment.description);

      // Set selected Patient and Doctor
      setSelectedPatient(appointment.Patient ? appointment.Patient : null);
        setSelectedDoctor(appointment.Doctor ? appointment.Doctor : null);
 

      // Handle null clinic scenario
      if (appointment.Clinic) {
        setSelectedClinic(appointment.Clinic);
      } else {
        setSelectedClinic({ name: "Deleted Clinic" });  // Fallback for null Clinic
      }

      axios.get('http://localhost:5000/api/doctors').then((res) => setDoctors(res.data));
      axios.get('http://localhost:5000/api/patients').then((res) => setPatients(res.data));
      axios.get('http://localhost:5000/api/clinics?status=active').then((res) => setClinics(res.data));
    } else {
      // If no clinic is provided, reset the form (for creating a new clinic)
        setStartDate(''); // Resetting form fields (example)
        setStartTime('');
        setDuration('');
        setStatus('');
        setDescription('');
        setSelectedPatient(null);
        setSelectedDoctor(null);
        setSelectedClinic(null);
    }
  }, [appointment]);


  const handleSave = async () => {
     

    try {
      // If a clinic is passed, we update; otherwise, we create a new appointment
      if (appointment) {
        const dateOnly = startDate.toISOString().split('T')[0];  // Get the date part
        const timeOnly = startTime.toTimeString().split(' ')[0]; // Get the time part (HH:mm:ss)

        // Combine date and time into ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
        const startDateTime = new Date(`${dateOnly}T${timeOnly}`).toISOString();

        const appointmentData = {
            date: startDate.toISOString().split('T')[0], // Format date properly
            start_time: startDateTime, // Format time properly
            duration, // Duration field
            status: status.name, // Directly pass status, not status.name
            description,
            patient_id: selectedPatient?.id || appointment.patient_id,
            doctor_id: selectedDoctor?.id || appointment.doctor_id,
            clinic_id: selectedClinic?.id || appointment.clinic_id,
        };

        console.log({
            appointmentData
        });

        const response = await axios.put(`http://localhost:5000/api/appointment/${appointment.id}`, appointmentData);
        
        
        if (response.status === 200) {
          toast.success('Appointment updated successfully');
        }
      } else {
        // Create new appointment if no appointment is passed (for add functionality)
        const response = await axios.post('http://localhost:5000/api/appointment', {
            startDate,
            startTime,
            duration,
            status,
            description,
            selectedPatient,
            selectedDoctor,
            selectedClinic,
        });

        if (response.status === 201) {
          toast.success('Appointment created successfully');
        }
      }

      // Reset form and close modal
      closeModal();
    } catch (error) {
      console.error('Error saving appointment:', error);
      toast.error('Failed to save appointment');
    }
  };

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} title="Edit Appointment" width={'max-w-3xl'}>
      <div className="flex-colo gap-6">
        {/* Patient Selection */}
        <div className="grid sm:grid-cols-12 gap-4 w-full items-center">
          <div className="sm:col-span-10">
            <p className="text-black text-sm">Patient</p>
            <div className='mt-3'>
            <Select
              selectedPerson={selectedPatient}
              setSelectedPerson={setSelectedPatient}
              datas={patients.map(patient => ({ id: patient.id, name: `${patient.first_name} ${patient.last_name}` }))}
              disabled={true}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {selectedPatient ? `${selectedPatient.name || `${selectedPatient.first_name} ${selectedPatient.last_name}`}` : 'Select Patient'}
                <BiChevronDown className="text-xl" />
              </div>
            </Select>
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <DatePickerComp label="Date of Visit" startDate={startDate} onChange={setStartDate} />
          <TimePickerComp label="Start Time" startDate={startTime} onChange={setStartTime} />
          {errors.startTime && <p className="text-red-500 text-xs">{errors.startTime}</p>}
          {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate}</p>}
        </div>

        {/* Doctor Selection */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Doctor</p>
            <Select
            selectedPerson={selectedDoctor}
            setSelectedPerson={(doctor) => {
                    console.log("Selected Doctor: ", doctor); // Check if doctor is properly set
                    setSelectedDoctor(doctor);
                }}
            datas={doctors.map(doctor => ({ id: doctor.id, name: `${doctor.first_name} ${doctor.last_name}` }))}
            >
            <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {selectedDoctor ? `${selectedDoctor.name || `${selectedDoctor.first_name} ${selectedDoctor.last_name}`}` : 'Select Doctor'}
                <BiChevronDown className="text-xl" />
            </div>
            </Select>

          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Clinic</p>
            <Select
                selectedPerson={selectedClinic}
                setSelectedPerson={(clinic) => {
                    console.log("Selected Clinic: ", clinic); // Check if doctor is properly set
                    setSelectedClinic(clinic);
                }}
                datas={clinics.map(clinic => ({ id: clinic.id, name: clinic.name }))}
                >
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                    {selectedClinic ? selectedClinic.name : 'Select Clinic'}
                    <BiChevronDown className="text-xl" />
                </div>
            </Select>
          </div>
        </div>


        {/* Duration and Status */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <Input
              label="Duration (in minutes)"
              placeholder="Enter duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              type="number"
              color={true}
            />
            {errors.duration && <p className="text-red-500 text-xs">{errors.duration}</p>}
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Status</p>
            <Select
            selectedPerson={status}
            setSelectedPerson={setStatus}
            datas={['Scheduled', 'Completed', 'Cancelled'].map((statusName) => ({
                name: statusName,
            }))} // Provides objects with a 'name' key
            >
            <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {status ? status.name : 'Select Status'} {/* Access the 'name' property */}
                <BiChevronDown className="text-xl" />
            </div>
            </Select>

          </div>

        </div>

        {/* Description */}
        <Input label="Description" placeholder="Add description..." color={true} value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
        
        {/* Save Button */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            Cancel
          </button>
          <Button label="Save" Icon={HiOutlineCheckCircle} onClick={handleSave} />
        </div>
      </div>
    </Modal>
  );
}
export default EditAppointmentModal;
