import React, { useState, useEffect } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import Layout from '../Layout';
import { Button, Select } from '../components/Form';
import { ClinicTable } from '../components/Tables';
import { sortsDatas } from '../components/Datas';
import AddEditClinicModal from '../components/Modals/AddEditClinic';
import EditClinicModal from '../components/Modals/EditClinicModal';
import axios from 'axios';

function Clinic() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [status, setStatus] = useState(sortsDatas.stocks[0]);
  const [clinicsData, setClinicsData] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null); // Added state for selected clinic
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch clinic data from API
  const fetchClinics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clinic');
      setClinicsData(response.data.clinics);   
    } catch (error) {
      toast.error('Failed to fetch clinics');
    }
  };

const lowerSearchTerm = searchTerm.toLowerCase();

const filteredClinicData = clinicsData.filter((clinic) => {
    const Name = clinic.name.toLowerCase();
    const Location = clinic.location.toLowerCase();

    return (
      Name.includes(lowerSearchTerm) ||
      Location.includes(lowerSearchTerm)  
    );
  });

   const displayedData = searchTerm 
    ? filteredClinicData
    : clinicsData;

  const onCloseModal = () => {
    setIsOpen(false);
    fetchClinics(); // Call fetchClinics when the modal closes
  };

  const onCloseEditModal = () => {
    setIsEditOpen(false);
    fetchClinics(); // Call fetchClinics when the modal closes
  };

  const onEdit = (clinic) => {
    setSelectedClinic(clinic); // Set the clinic to be edited
    setIsEditOpen(true); // Open the modal
  };

  const handleDeleteClinic = async (clinic) => {
    if (window.confirm(`Are you sure you want to delete the clinic: ${clinic.name}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/clinic/${clinic.id}`);
        toast.success('Clinic deleted successfully');
        // Optionally refresh the clinic list after deletion
        fetchClinics(); // Assuming you have a function to re-fetch clinic data
      } catch (error) {
        toast.error('Failed to delete clinic');
        console.error('Error deleting clinic:', error);
      }
    }
  };

  // Fetch clinics when the component mounts
  useEffect(() => {
    fetchClinics();
  }, []);

  return (
    <Layout>
      {isOpen && (
        <AddEditClinicModal
          isOpen={isOpen}
          closeModal={onCloseModal}
        />
      )}
      {isEditOpen && (
        <EditClinicModal
          isOpen={isEditOpen}
          closeModal={onCloseEditModal}
          clinic={selectedClinic} // Pass the selected clinic data for editing
        />
      )}
      {/* add button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      <h1 className="text-xl font-semibold">Clinics</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 xs:grid-cols-2 items-center gap-2">
            <input
              type="text"
              placeholder='Search clinic'
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
          <Button
            label="Export"
            Icon={MdOutlineCloudDownload}
            onClick={() => {
              toast.error('Exporting is not available yet');
            }}
          />
        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <ClinicTable data={displayedData} onEdit={onEdit} OnDelete={handleDeleteClinic}/>
        </div>
      </div>
    </Layout>
  );
}

export default Clinic;
