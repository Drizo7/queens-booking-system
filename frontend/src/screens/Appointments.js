import React, { useState, useEffect } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import Layout from '../Layout';
import { Button, Select } from '../components/Form';
import { AppointmentsTable } from '../components/Tables';
import { sortsDatas } from '../components/Datas';
import AddAppointmentModal from '../components/Modals/AddApointmentModal';
import EditAppointmentModal from '../components/Modals/EditAppointmentModal';
import axios from 'axios';

function Appointments() {
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [status, setStatus] = useState(sortsDatas.stocks[0]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch appointments data from the API
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointment');
      setAppointmentsData(response.data.appointments); // Assuming API sends appointment details
    } catch (error) {
      toast.error('Failed to fetch appointments');
    }
  };



  const filteredAppointmentData = appointmentsData.filter((appointment) => {
    const patientfirstName = appointment.Patient.first_name.toLowerCase();
    const patientlastName = appointment.Patient.last_name.toLowerCase();
    const doctorfirstName = appointment.Doctor.first_name.toLowerCase();
    const doctorlastName = appointment.Doctor.last_name.toLowerCase();
    const patientfullName = `${patientfirstName} ${patientlastName}`;
    const doctorfullName = `${doctorfirstName} ${doctorlastName}`;
    const clinicName = appointment.Clinic ? appointment.Clinic.name.toLowerCase() : '';
    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      patientfirstName.includes(lowerSearchTerm) ||
      patientlastName.includes(lowerSearchTerm) ||
      doctorfirstName.includes(lowerSearchTerm) ||
      doctorlastName.includes(lowerSearchTerm) ||
      patientfullName.includes(lowerSearchTerm) ||
      doctorfullName.includes(lowerSearchTerm) ||
      clinicName.includes(lowerSearchTerm) 
    );
  });

  const displayedData = searchTerm 
    ? filteredAppointmentData
    : appointmentsData;

  // Toggle modal for adding or editing appointments
  const handleClose = () => {
    setOpen(!open);
    fetchAppointments();
  };

  const onCloseEditModal = () => {
    setIsEditOpen(false);
    fetchAppointments(); // Call fetchAppointments when the modal closes
  };

  // Handle when an event (appointment) is clicked for editing
  const onEdit = (appointment) => {
    setSelectedAppointment(appointment); // Set the appointment to be edited
    setIsEditOpen(true); // Open the modal
  };

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Layout>
      {open && (
        <AddAppointmentModal
          isOpen={open}
          closeModal={handleClose}
        />
      )}
      {isEditOpen && (
        <EditAppointmentModal
          isOpen={isEditOpen}
          closeModal={onCloseEditModal}
          appointment={selectedAppointment} // Pass the selected appointment data for editing
        />
      )}
      <button
        onClick={handleClose}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>

      <h1 className="text-xl font-semibold">Appointments List</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* Filters and export */}
        <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 xs:grid-cols-2 items-center gap-2">
            <input
              type="text"
              placeholder='Search appointment'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
            />
            <Select
              selectedPerson={status}
              setSelectedPerson={setStatus}
              datas={sortsDatas.stocks}
            >
              <div className="w-full flex-btn text-main text-sm p-4 border bg-dry border-border font-light rounded-lg focus:border focus:border-subMain">
                {status.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>

          {/* Export Button */}
          <Button
            label="Export"
            Icon={MdOutlineCloudDownload}
            onClick={() => {
              toast.error('Exporting is not available yet');
            }}
          />
        </div>

        {/* Appointments Table */}
        <div className="mt-8 w-full overflow-x-scroll">
          <AppointmentsTable data={displayedData} onEdit={onEdit} />
        </div>
      </div>
    </Layout>
  );
}

export default Appointments;
