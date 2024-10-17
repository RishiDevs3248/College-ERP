import React from 'react';
import AttendanceForm from '../../../components/AttendanceForm';
import { Route, Routes } from 'react-router-dom';
import NoMatch from '../../../components/NoMatch';
import GetAttendance from './GetAttendance';

export default function Attendance() {
  return (
    <div>
      <Routes>
            <Route path="/" element={<AttendanceForm />} />
            <Route path="GetAttendance" element={<GetAttendance />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </div>
  );
}