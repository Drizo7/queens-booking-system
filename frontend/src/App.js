// ********* This is the main component of the website *********

import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import Loader from './components/Notifications/Loader'; // Import your Loader component
import Dashboard from './screens/Dashboard';
import Toast from './components/Notifications/Toast';
import Payments from './screens/Payments/Payments';
import Appointments from './screens/Appointments';
import Patients from './screens/Patients/Patients';
import Campaings from './screens/Campaings';
import Services from './screens/Services';
import Settings from './screens/Settings';
import Invoices from './screens/Invoices/Invoices';
import CreateInvoice from './screens/Invoices/CreateInvoice';
import EditInvoice from './screens/Invoices/EditInvoice';
import PreviewInvoice from './screens/Invoices/PreviewInvoice';
import EditPayment from './screens/Payments/EditPayment';
import PreviewPayment from './screens/Payments/PreviewPayment';
import Medicine from './screens/Medicine';
import Clinic from './screens/Clinic';
import PatientProfile from './screens/Patients/PatientProfile';
import CreatePatient from './screens/Patients/CreatePatient';
import Doctors from './screens/Doctors/Doctors';
import DoctorProfile from './screens/Doctors/DoctorProfile';
import Receptions from './screens/Receptions';
import NewMedicalRecode from './screens/Patients/NewMedicalRecode';
import NotFound from './screens/NotFound';
import Login from './screens/Login';
import Register from './screens/Register';
import ResetPage from './screens/ResetPage';

function App() {
  Aos.init();

  return (
    <>
      {/* Toaster */}
      <Toast />
      {/* Routes */}
      <BrowserRouter>
        <LoaderWrapper /> {/* Use the LoaderWrapper component here */}
      </BrowserRouter>
    </>
  );
}

// LoaderWrapper Component to manage loading state
const LoaderWrapper = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start loading when the route changes
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after a delay
    }, 500); // Adjust this delay as needed

    return () => clearTimeout(timer); // Clean up on unmount
  }, [location]);

  return (
    <>
      {loading && <Loader />} {/* Show loader while loading */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* invoices */}
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/create" element={<CreateInvoice />} />
        <Route path="/invoices/edit/:id" element={<EditInvoice />} />
        <Route path="/invoices/preview/:id" element={<PreviewInvoice />} />
        {/* payments */}
        <Route path="/payments" element={<Payments />} />
        <Route path="/payments/edit/:id" element={<EditPayment />} />
        <Route path="/payments/preview/:id" element={<PreviewPayment />} />
        {/* patient */}
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/preview/:id" element={<PatientProfile />} />
        <Route path="/patients/create" element={<CreatePatient />} />
        <Route path="/patients/visiting/:id" element={<NewMedicalRecode />} />
        {/* doctors */}
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/preview/:id" element={<DoctorProfile />} />
        {/* reception */}
        <Route path="/receptions" element={<Receptions />} />
        {/* others */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password-reset" element={<ResetPage />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/campaigns" element={<Campaings />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/clinic" element={<Clinic />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
