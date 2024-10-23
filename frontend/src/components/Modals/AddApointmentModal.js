import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import {
  Button,
  DatePickerComp,
  Input,
  Select,
  TimePickerComp,
} from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

function AddAppointmentModal({ closeModal, isOpen }) {
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

  // Fetch doctors, patients, and clinics when the modal opens
  useEffect(() => {
    if (isOpen) {
      axios.get('http://localhost:5000/api/doctors').then((res) => setDoctors(res.data));
      axios.get('http://localhost:5000/api/patients').then((res) => setPatients(res.data));
      axios.get('http://localhost:5000/api/clinics').then((res) => setClinics(res.data));
    }
  }, [isOpen]);

  const handleSave = async () => {
    const appointmentData = {
      date: startDate,
      start_time: startTime,
      duration, // Duration field
      status: status.name,
      description,
      patient_id: selectedPatient?.id,
      doctor_id: selectedDoctor?.id,
      clinic_id: selectedClinic?.id,
    };

    console.log({
    appointmentData
    });

    try {
      const response = await axios.post('http://localhost:5000/api/appointment', appointmentData);

      if (response.status === 201) {
        toast.success('Appointment created successfully');
        // Reset form or perform any other actions after successful submission
        setStartDate(''); // Resetting form fields (example)
        setStartTime('');
        setDuration('');
        setStatus('');
        setDescription('');
        setSelectedPatient(null);
        setSelectedDoctor(null);
        setSelectedClinic(null);
        closeModal(); // Close modal if applicable
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Failed to create appointment');
    }

  };

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} title="New Appointment" width={'max-w-3xl'}>
      <div className="flex-colo gap-6">
        {/* Patient Selection */}
        <div className="grid sm:grid-cols-12 gap-4 w-full items-center">
          <div className="sm:col-span-10">
            <p className="text-black text-sm">Patient</p>
            <Select
              selectedPerson={selectedPatient}
              setSelectedPerson={setSelectedPatient}
              datas={patients.map(patient => ({ id: patient.id, name: `${patient.first_name} ${patient.last_name}` }))}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {selectedPatient ? selectedPatient.name : 'Select Patient'}
                <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <DatePickerComp label="Date of Visit" startDate={startDate} onChange={setStartDate} />
          <TimePickerComp label="Start Time" startDate={startTime} onChange={setStartTime} />
        </div>

        {/* Doctor Selection */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Doctor</p>
            <Select
              selectedPerson={selectedDoctor}
              setSelectedPerson={setSelectedDoctor}
              datas={doctors.map(doctor => ({ id: doctor.id, name: `${doctor.first_name} ${doctor.last_name}` }))}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {selectedDoctor ? selectedDoctor.name : 'Select Doctor'}
                <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Clinic</p>
            <Select
              selectedPerson={selectedClinic}
              setSelectedPerson={setSelectedClinic}
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
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Status</p>
            <Select
              selectedPerson={status}
              setSelectedPerson={setStatus}
              datas={['Scheduled', 'Completed', 'Cancelled'].map((status) => ({
                name: status,
              }))} // this provides objects with a 'name' key
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {status.name} <BiChevronDown className="text-xl" /> {/* Access the 'name' property */}
              </div>
            </Select>
          </div>

        </div>

        {/* Description */}
        <Input label="Description" placeholder="Add description..." color={true} value={description} onChange={(e) => setDescription(e.target.value)} />

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

export default AddAppointmentModal;
