import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import DoctorInfo from '../../components/UsedComp/DoctorInfo';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import AppointmentsUsed from '../../components/UsedComp/AppointmentsUsed';
import { doctorTab } from '../../components/Datas';

function DoctorProfile() {
  const [activeTab, setActiveTab] = React.useState(1);
  const { id } = useParams(); // Get doctor ID from the URL
  const [doctor, setDoctor] = useState(null); // State to store doctor data
  const [appointments, setAppointments] = useState([]); // State for appointments

  useEffect(() => {
  const fetchDoctor = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctor'); // Fetch all doctors
      const doctors = response.data.doctors;
      // Find the doctor with the matching ID
      const selectedDoctor = doctors.find((doc) => doc.id === id);
      if (selectedDoctor) {
        setDoctor(selectedDoctor);
      } else {
        console.error('Doctor not found');
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  const fetchAppointments = async () => {
  try {
    // Fetch all appointments
    const response = await axios.get(`http://localhost:5000/api/appointment`);
    const allAppointments = response.data.appointments;
    
    // Filter appointments by doctor ID using doctor_id from the data
    const doctorAppointments = allAppointments.filter(
      (appointment) => appointment.doctor_id === id
    );
    
    setAppointments(doctorAppointments);
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
  }
};

  fetchDoctor();
  fetchAppointments();
}, [id]);

// Function to update the doctor data
  const updateDoctor = (updatedData) => {
    setDoctor(updatedData);
  };

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <DoctorInfo doctor={doctor} onUpdate={updateDoctor} />;
      case 2:
        return <AppointmentsUsed doctor={doctor} appointments={appointments} />;
    
      default:
        return;
    }
  };

 

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <Link
          to="/doctors"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">{doctor ? `Dr. ${doctor.first_name} ${doctor.last_name}` : 'Doctor'}</h1>
      </div>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          <img
            src="/images/user1.png"
            alt="setting"
            className="w-40 h-40 rounded-full object-cover "
          />
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">{doctor ? `Dr. ${doctor.first_name} ${doctor.last_name}` : 'Doctor Name'}
            </h2>
            <p className="text-xs text-textGray">{doctor ? doctor.email : 'doctor@example.com'}</p>
            <p className="text-xs">{doctor ? doctor.phone_number : '+265 999 345 678'}</p>
          </div>
          {/* tabs */}
          <div className="flex-colo gap-3 px-2 2xl:px-12 w-full">
            {doctorTab.map((tab, index) => (
              <button
                onClick={() => setActiveTab(tab.id)}
                key={index}
                className={`
                ${
                  activeTab === tab.id
                    ? 'bg-text text-subMain'
                    : 'bg-dry text-main hover:bg-text hover:text-subMain'
                }
                text-xs gap-4 flex items-center w-full p-4 rounded`}
              >
                <tab.icon className="text-lg" /> {tab.title}
              </button>
            ))}
          </div>
        </div>
        {/* tab panel */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
        >
          {tabPanel()}
        </div>
      </div>
    </Layout>
  );
}

export default DoctorProfile;
