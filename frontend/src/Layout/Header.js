import React, { useEffect, useState } from 'react';
import { MenuSelect } from '../components/Form';
import { TbUser } from 'react-icons/tb';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import NotificationComp from '../components/NotificationComp';
import { useNavigate } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import MenuDrawer from '../components/Drawer/MenuDrawer';
import axios from 'axios';
import { FaSun, FaCloudSun, FaCloudMoon, FaMoon } from 'react-icons/fa';

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
  });

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return { message: "Good morning", icon: <FaSun size={25} color="#FFA500" /> }; // Sun icon
    } else if (currentHour < 18) {
      return { message: "Good afternoon", icon: <FaCloudSun size={25} color="#FFD700" /> }; // Cloud with sun icon
    } else if (currentHour < 21) {
      return { message: "Good evening", icon: <FaCloudMoon size={25} color="#C0C0C0" /> }; // Cloud with moon icon
    } else {
      return { message: "Good night", icon: <FaMoon size={25} color="#C0C0C0" /> }; // Moon icon
    }
  };

  const greeting = getGreeting();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is passed in headers
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // toggle drawer
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const DropDown1 = [
    {
      title: 'Profile',
      icon: TbUser,
      onClick: () => {
        navigate('/settings');
      },
    },
    {
      title: 'Logout',
      icon: AiOutlinePoweroff,
      onClick: () => {
        navigate('/login');
      },
    },
  ];

  return (
    <>
      {isOpen && <MenuDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />}

      {/* cmp */}
      <div className="xl:w-5/6 w-full 2xl:max-w-[1640px] bg-dry grid md:grid-cols-2 grid-cols-12 items-center bg-opacity-95 fixed top-0 z-40 xs:px-8 px-2">
        <div className="md:col-span-1 sm:col-span-11 col-span-10 flex gap-4 items-center md:py-0 py-4">
          <button
            onClick={toggleDrawer}
            className="block xl:hidden border text-2xl bg-greyed w-16 md:w-12 h-12 rounded-md flex-colo text-textGray transitions hover:bg-border"
          >
            <BiMenu />
          </button>
          {/* header */}
          <div className="flex items-center justify-between">
              {greeting.icon}
              <span className="ml-4 text-2xl font-bold text-gray-800 hidden sm:inline">{greeting.message}</span>
            <p className="ml-3 text-xl text-gray-600 font-small hidden sm:inline">
              {`${userData.first_name} `}
            </p>
          </div>
          {/* search */}
          {/* <input
            type="text"
            placeholder='Search "Patients"'
            className="md:w-96 w-full h-12 text-sm text-main rounded-md bg-dry border border-border px-4"
          /> */}
        </div>
        <div className="md:col-span-1 sm:col-span-1 col-span-2 items-center justify-end pr-4 md:pr-0">
          <div className="float-right flex gap-4 items-center justify-center">
            <NotificationComp>
              <div className="relative">
                <MdOutlineNotificationsNone className="text-2xl hover:text-subMain" />
                <span className="absolute -top-2.5 -right-2.5 font-semibold bg-subMain rounded-full px-1.5 py-0.5 text-xs text-white text-center">
                  0
                </span>
              </div>
            </NotificationComp>

            <div className=" items-center md:flex hidden">
              <MenuSelect datas={DropDown1}>
                <div className="flex gap-2 items-center p-6 rounded-lg">
                  <img
                    src="/images/user11.png"
                    alt="user"
                    className="w-7 object-cover h-7 rounded-full"
                  />
                  <p className="text-sm text-textGray font-medium">{`${userData.first_name} ${userData.last_name}`}</p>
                </div>
              </MenuSelect>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
