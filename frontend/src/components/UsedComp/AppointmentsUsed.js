import { useState } from 'react';
import { appointmentsData } from '../Datas';
import { AppointmentTable } from '../Tables';

function AppointmentsUsed({ doctor, appointments  }) {
  
  return (
    <div className="w-full">
      <h1 className="text-sm font-medium mb-6">Appointments</h1>
      <div className="w-full overflow-x-scroll">
        <AppointmentTable
          data={appointments}
          doctor={doctor}
        />
      </div>
    </div>
  );
}

export default AppointmentsUsed;
