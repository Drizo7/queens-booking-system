// Settings.js
import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { BiUserPlus } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import PersonalInfo from '../components/UsedComp/PersonalInfo';
import ChangePassword from '../components/UsedComp/ChangePassword';
import axios from 'axios';

function Settings() {
  const [activeTab, setActiveTab] = React.useState(1);
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Callback function to update user data in state
  const handleUpdateUserData = (updatedData) => {
    setUserData(updatedData); // Update local state
  };

  const tabs = [
    { id: 1, name: 'Personal Information', icon: BiUserPlus },
    { id: 2, name: 'Change Password', icon: RiLockPasswordLine },
  ];

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return <PersonalInfo userData={userData} onUpdateUserData={handleUpdateUserData} />;
      case 2:
        return <ChangePassword />;
      default:
        return;
    }
  };

  return (
    <Layout>
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className=" grid grid-cols-12 gap-6 my-8 items-start">
        <div className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28">
          <img src="/images/user1.png" alt="setting" className="w-40 h-40 rounded-full object-cover" />
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold">{`${userData.first_name} ${userData.last_name}`}</h2>
            <p className="text-xs text-textGray">{userData.email}</p>
            <p className="text-xs">{userData.phone_number}</p>
          </div>
          <div className="flex-colo gap-3 px-2 xl:px-12 w-full">
            {tabs.map((tab) => (
              <button
                onClick={() => setActiveTab(tab.id)}
                key={tab.id}
                className={`${activeTab === tab.id ? 'bg-text text-subMain' : 'bg-dry text-main hover:bg-text hover:text-subMain'} text-xs gap-4 flex items-center w-full p-4 rounded`}
              >
                <tab.icon className="text-lg" /> {tab.name}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6">
          {tabPanel()}
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
