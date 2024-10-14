import React, { useState, useEffect } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import Layout from '../Layout';
import { Button, Select } from '../components/Form';
import { ClinicTable } from '../components/Tables';
import { sortsDatas } from '../components/Datas';
import AddEditClinicModal from '../components/Modals/AddEditClinic';
import axios from 'axios';

function Clinic() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(sortsDatas.stocks[0]);
  const [clinicsData, setClinicsData] = useState([]);

  // Function to fetch clinic data from API
  const fetchClinics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clinic');
      setClinicsData(response.data);
    } catch (error) {
      toast.error('Failed to fetch clinics');
    }
  };

  const onCloseModal = () => {
    setIsOpen(false);
    fetchClinics(); // Call fetchClinics when the modal closes
  };

  const onEdit = (datas) => {
    setIsOpen(true);
    // You might want to set the data to be edited here if needed
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
      {/* add button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      {/*  */}
      <h1 className="text-xl font-semibold">Clinic</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* datas */}

        <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 xs:grid-cols-2 items-center gap-2">
            <input
              type="text"
              placeholder='Search "paracetamol"'
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

          {/* export */}
          <Button
            label="Export"
            Icon={MdOutlineCloudDownload}
            onClick={() => {
              toast.error('Exporting is not available yet');
            }}
          />
        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <ClinicTable data={clinicsData} onEdit={onEdit} />
        </div>
      </div>
    </Layout>
  );
}

export default Clinic;
