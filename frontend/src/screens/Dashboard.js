import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Layout from '../Layout';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { TbCalendar, TbUserHeart, TbUsers } from 'react-icons/tb';
import { MdOutlineInventory2 } from 'react-icons/md';
import { BiChevronLeft, BiChevronRight, BiTime } from 'react-icons/bi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { BsArrowDownLeft, BsArrowDownRight, BsArrowUpRight,} from 'react-icons/bs';
import { DashboardSmallChart } from '../components/Charts';

// custom toolbar
const CustomToolbar = (toolbar) => {
  // today button handler
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  // next button handler
  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  // today button handler
  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };

  // month button handler
  const goToMonth = () => {
    toolbar.onView('month');
  };

  // week button handler
  const goToWeek = () => {
    toolbar.onView('week');
  };

  // day button handler
  const goToDay = () => {
    toolbar.onView('day');
  };

  // view button group
  const viewNamesGroup = [
    { view: 'month', label: 'Month' },
    { view: 'week', label: 'Week' },
    { view: 'day', label: 'Day' },
  ];

  return (
    <div className="flex flex-col gap-8 mb-8 mt-8">
      <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4">
        <div className="md:col-span-1 flex sm:justify-start justify-center items-center">
          <button
            onClick={goToCurrent}
            className="px-6 py-2 border border-subMain rounded-md text-subMain"
          >
            Today
          </button>
        </div>
        {/* label */}
        <div className="md:col-span-9 flex-rows gap-4">
          <button onClick={goToBack} className="text-2xl text-subMain">
            <BiChevronLeft />
          </button>
          <span className="text-xl font-semibold">
            {moment(toolbar.date).format('MMMM YYYY')}
          </span>
          <button onClick={goToNext} className="text-2xl text-subMain">
            <BiChevronRight />
          </button>
        </div>
        {/* filter */}
        <div className="md:col-span-2 grid grid-cols-3 rounded-md  border border-subMain">
          {viewNamesGroup.map((item, index) => (
            <button
              key={index}
              onClick={
                item.view === 'month'
                  ? goToMonth
                  : item.view === 'week'
                  ? goToWeek
                  : goToDay
              }
              className={`border-l text-xl py-2 flex-colo border-subMain ${
                toolbar.view === item.view
                  ? 'bg-subMain text-white'
                  : 'text-subMain'
              }`}
            >
              {item.view === 'month' ? (
                <HiOutlineViewGrid />
              ) : item.view === 'week' ? (
                <HiOutlineCalendarDays />
              ) : (
                <BiTime />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};



function Dashboard() {

  const localizer = momentLocalizer(moment);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [events, setEvents] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalClinics, setTotalClinics] = useState(0);

  // Fetching data from API
  const fetchDashboardData = async () => {
    try {
      const [patientsRes, doctorsRes, appointmentsRes, clinicsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/patient'),
        axios.get('http://localhost:5000/api/doctor'),
        axios.get('http://localhost:5000/api/appointment'),
        axios.get('http://localhost:5000/api/clinic')
      ]);

      setTotalPatients(patientsRes.data.count);
      setTotalDoctors(doctorsRes.data.count);
      setTotalAppointments(appointmentsRes.data.count);
      setTotalClinics(clinicsRes.data.count);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    }
  };


  // handle modal close
  const handleClose = () => {
    setOpen(!open);
    setData({});
  };

  const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointment'); // Update with your API endpoint
        const appointments = response.data.appointments;

        // Map the fetched appointments to match Calendar's event format
        const formattedEvents = appointments.map((appointment) => ({
          id: appointment.id,
          title: `${appointment.Patient.first_name} ${appointment.Patient.last_name}`, // assuming patient data
          start: new Date(appointment.date), // or appointment.start_time
          end: new Date(new Date(appointment.date).getTime() + appointment.duration * 60000), // Calculate end time using duration
          color: '#66B5A3', // default color, can be dynamic
        }));

        setEvents(formattedEvents); // Update the state with formatted events
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  // Fetch appointments from API when component mounts
  useEffect(() => {
    fetchDashboardData();
    fetchAppointments();
  }, []); // Empty dependency array ensures it runs on mount

  // onClick event handler
  const handleEventClick = (event) => {
    setData(event);
    setOpen(!open);
  };

  const dashboardCards = [
    {
      id: 1,
      title: 'Total Patients',
      icon: TbUsers,
      value: totalPatients,
      percent: 45.06,
      color: ['bg-subMain', 'text-subMain', '#66B5A3'],
      datas: [92, 80, 45, 15, 49, 77, 70, 51, 110, 20, 90, 60],
    },
    {
      id: 2,
      title: 'Total Doctors',
      icon: TbUserHeart,
      value: totalDoctors,
      percent: 25.06,
      color: ['bg-green-500', 'text-green-500', '#34C759'],
      datas: [92, 80, 45, 15, 49, 77, 70, 51, 110, 20, 90, 60],
    },
    {
      id: 3,
      title: 'Appointments',
      icon: TbCalendar,
      value: totalAppointments,
      percent: 25.06,
      color: ['bg-yellow-500', 'text-yellow-500', '#F9C851'],
      datas: [20, 30, 45, 55, 60, 65, 70, 41, 50, 20, 20, 30],
    },
    {
      id: 4,
      title: 'Clinics',
      icon: MdOutlineInventory2,
      value: totalClinics,
      percent: 45.06,
      color: ['bg-red-500', 'text-red-500', '#FF3B30'],
      datas: [20, 50, 75, 15, 108, 97, 70, 41, 50, 20, 90, 60],
    },
  ];

  const colors = ['#66B5A3', '#FC8181', '#FFD700', '#3B82F6', '#F87171'];

  return (
    <Layout>
      {/* boxes */}
      <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {dashboardCards.map((card, index) => (
          <div
            key={card.id}
            className=" bg-white rounded-xl border-[1px] border-border p-5"
          >
            <div className="flex gap-4 items-center">
              <div
                className={`w-10 h-10 flex-colo bg-opacity-10 rounded-md ${card.color[1]} ${card.color[0]}`}
              >
                <card.icon />
              </div>
              <h2 className="text-sm font-medium">{card.title}</h2>
            </div>
            <div className="grid grid-cols-8 gap-4 mt-4 bg-dry py-5 px-8 items-center rounded-xl">
              <div className="col-span-5">
                {/* statistc */}
                <DashboardSmallChart data={card.datas} colors={card.color[2]} />
              </div>
              <div className="flex flex-col gap-4 col-span-3">
                <h4 className="text-md font-medium">
                  {card.value}
                  {
                    // if the id === 4 then add the $ sign
                    card.id === 4 ? '+' : '+'
                  }
                </h4>
                <p className={`text-sm flex gap-2 ${card.color[1]}`}>
                  {card.percent > 50 && <BsArrowUpRight />}
                  {card.percent > 30 && card.percent < 50 && (
                    <BsArrowDownRight />
                  )}
                  {card.percent < 30 && <BsArrowDownLeft />}
                  {card.percent}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Calendar
        localizer={localizer}
        events={events} // Use the dynamic events here
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 900,
          marginBottom: 50,
        }}
        onSelectEvent={(event) => handleEventClick(event)}
        defaultDate={new Date()}
        timeslots={1}
        resizable
        step={60}
        selectable={true}
        eventPropGetter={(event) => {
          // Get a color based on the event ID (cyclical assignment)
          const color = colors[event.id % colors.length];
          const style = {
            backgroundColor: color, // default or dynamic color
            borderRadius: '10px',
            color: 'white',
            border: '1px',
            fontSize: '12px',
            padding: '5px 5px',
          };
          return { style };
        }}
        dayPropGetter={(date) => {
          const backgroundColor = 'white';
          const style = { backgroundColor };
          return { style };
        }}
        views={['month', 'day', 'week']}
        components={{ toolbar: CustomToolbar }}
      />

    </Layout>
  );
}

export default Dashboard;
