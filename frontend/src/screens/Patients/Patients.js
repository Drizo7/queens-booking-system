import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { sortsDatas } from '../../components/Datas';
import { Link, useNavigate } from 'react-router-dom';
import { BiChevronDown, BiPlus, BiTime } from 'react-icons/bi';
import { BsCalendarMonth } from 'react-icons/bs';
import { MdCloudDownload, MdOutlineCalendarMonth } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { Button,  Select } from '../../components/Form';
import { PatientTable } from '../../components/Tables';
import axios from 'axios';

function Patients() {
  const [patientsData, setPatientsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortTriggered, setSortTriggered] = useState(false);
  const navigate = useNavigate();

  // Function to fetch patient data from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patient');
        setPatientsData(response.data.patients);
      } catch (error) {
        toast.error('Failed to fetch patients');
      }
    };
    fetchPatients();
  }, []);

  // Filter patients based on search term
  const filteredPatientsData = patientsData.filter((patient) => {
    const firstName = patient.first_name.toLowerCase();
    const lastName = patient.last_name.toLowerCase();
    const fullName = `${firstName} ${lastName}`;
    const address = patient.address.toLowerCase();
    const phoneNumber = patient.phone_number.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      firstName.includes(lowerSearchTerm) ||
      lastName.includes(lowerSearchTerm) ||
      fullName.includes(lowerSearchTerm) ||
      address.includes(lowerSearchTerm)||
      phoneNumber.includes(lowerSearchTerm)
    );
  });

  const [sorts, setSorts] = useState([
    {
      id: 1,
      name: 'status',
      selected: sortsDatas.filterPatient[0],
      datas: sortsDatas.filterPatient,
    },
    {
      id: 2,
      name: 'gender',
      selected: sortsDatas.genderFilter[0],
      datas: sortsDatas.genderFilter,
    },
  ]);

const sortedPatientsData = sortTriggered
    ? filteredPatientsData
        .sort((a, b) => {
      // Sort by date (newest/oldest) based on the selected status
      const status = sorts.find((item) => item.name === 'status').selected;
      if (status.name === 'Newest Patients') {
        return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
      } else if (status.name === 'Oldest Patients') {
        return new Date(a.createdAt) - new Date(b.createdAt); // Oldest first
      }
      return 0; // No sort applied
    })
        .sort((a, b) => {
          // Sort by gender if gender filter is applied
          const gender = sorts.find((item) => item.name === 'gender').selected;
          if (gender.name !== 'All') {
            return gender.name === 'Male'
              ? a.gender === 'Male' ? -1 : 1
              : a.gender === 'Female' ? -1 : 1;
          }
          return 0;
        })
    : filteredPatientsData;

    const handleSortChange = (id, newSelection) => {
    setSorts((prevSorts) =>
      prevSorts.map((sort) =>
        sort.id === id ? { ...sort, selected: newSelection } : sort
      )
    );
    setSortTriggered(true); // Enable sorting once user interacts
  };

  const displayedPatientsData = searchTerm || sortTriggered
    ? sortedPatientsData
    : patientsData;
    
  // boxes
  const boxes = [
    {
      id: 1,
      title: 'Today Patients',
      value: '10',
      color: ['bg-subMain', 'text-subMain'],
      icon: BiTime,
    },
    {
      id: 2,
      title: 'Monthly Patients',
      value: '230',
      color: ['bg-orange-500', 'text-orange-500'],
      icon: BsCalendarMonth,
    },
    {
      id: 3,
      title: 'Yearly Patients',
      value: '1,500',
      color: ['bg-green-500', 'text-green-500'],
      icon: MdOutlineCalendarMonth,
    },
  ];

  // preview
  const previewPatient = (id) => {
    navigate(`/patients/preview/${id}`);
  };

  return (
    <Layout>
      {/* add button */}
      <Link
        to="/patients/create"
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </Link>
      <h1 className="text-xl font-semibold">Patients</h1>
      {/* boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
          >
            <div className="w-3/4">
              <h2 className="text-sm font-medium">{box.title}</h2>
              <h2 className="text-xl my-6 font-medium">{box.value}</h2>
              <p className="text-xs text-textGray">
                Total Patients <span className={box.color[1]}>{box.value}</span>{' '}
                {box.title === 'Today Patients'
                  ? 'today'
                  : box.title === 'Monthly Patients'
                  ? 'this month'
                  : 'this year'}
              </p>
            </div>
            <div
              className={`w-10 h-10 flex-colo rounded-md text-white text-md ${box.color[0]}`}
            >
              <box.icon />
            </div>
          </div>
        ))}
      </div>
      {/* datas */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="10"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        <div className="flex items-center justify-between gap-2">
          <input
            type="text"
            placeholder='Search Patient'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 text-sm text-main rounded-md bg-dry border border-border px-4"
          />
          {/* sort  */}
          {sorts.map((item) => (
            <Select
              key={item.id}
              selectedPerson={item.selected}
              setSelectedPerson={(newSelection) => handleSortChange(item.id, newSelection)}
              datas={item.datas}
            >
              <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
                <p>{item.selected.name}</p>
                <BiChevronDown className="text-xl" />
              </div>
            </Select>
          ))}
          {/* date */}
          
          {/* export */}
          
          <Button
            label="Export"
            Icon={MdCloudDownload}
            onClick={() => {
              toast.error('Filter data is not available yet');
            }}
          />
        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <PatientTable
            data={displayedPatientsData}
            functions={{
              preview: previewPatient,
            }}
            used={false}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Patients;
