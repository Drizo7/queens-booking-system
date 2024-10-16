import React, { useEffect, useState } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import Layout from '../Layout';
import AddReceptionistModal from '../components/Modals/AddReceptionistModal';
import { Button, Select } from '../components/Form';
import { sortsDatas } from '../components/Datas';
import { ReceptionistsTable } from '../components/Tables'; 
import axios from 'axios';


function Receptions() {
  const [isOpen, setIsOpen] = useState(false);
  const [receptionistData, setReceptionistData] = useState([]);
  const [status, setStatus] = useState(sortsDatas.stocks[0]);

  // Function to fetch receptionist data from API
  const fetchReceptionists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/receptionist');
      setReceptionistData(response.data); // Assuming API sends receptionist details
    } catch (error) {
      toast.error('Failed to fetch receptionists');
    }
  };

  const onCloseModal = () => {
    setIsOpen(false);
    fetchReceptionists(); // Refetch receptionist data after modal closes
  };

  const onEdit = (data) => {
    setIsOpen(true);
    // Handle setting the data for editing if needed
  };

  // Fetch receptionists when the component mounts
  useEffect(() => {
    fetchReceptionists();
  }, []);

  return (
    <Layout>
      {isOpen && (
        <AddReceptionistModal
          isOpen={isOpen}
          closeModal={onCloseModal}
        />
      )}
      {/* Add button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>

      <h1 className="text-xl font-semibold">Receptionists</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* Data Filters */}
        <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 xs:grid-cols-2 items-center gap-2">
            <input
              type="text"
              placeholder='Search receptionist'
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

        {/* Receptionist Table */}
        <div className="mt-8 w-full overflow-x-scroll">
          <ReceptionistsTable data={receptionistData} onEdit={onEdit} />
        </div>
      </div>
    </Layout>
  );
}

export default Receptions;



