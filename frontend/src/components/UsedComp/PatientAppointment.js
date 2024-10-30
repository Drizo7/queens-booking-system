import { useState } from 'react';
import { appointmentsData } from '../Datas';
import { PatientAppointmentTable } from '../Tables';

function PatientAppointment({ patient, appointments  }) {
  
  return (
    <div className="w-full">
      <h1 className="text-sm font-medium mb-6">Appointments</h1>
      <div className="w-full overflow-x-scroll">
        <PatientAppointmentTable
          data={appointments}
          patient={patient}
        />
      </div>
    </div>
  );
}

export default PatientAppointment;
