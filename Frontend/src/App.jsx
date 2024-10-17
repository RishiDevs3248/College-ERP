import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NoMatch from './components/NoMatch';
import TeacherLandingPage from './pages/TeacherLandingPage';
import StudentLandingPage from './pages/StudenetLandingPage';
import StudentSideBar from './components/SideBarStudent';
import CollageNameHeader from './components/CollageNameHeader';
import StudentLoginPage from './pages/Students/StudentLoginPage';
import TeacherLoginPage from './pages/Teachers/TeacherLoginPage';
import Admin from './pages/Admin/Admin';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentLoginPage/>} />
          <Route path="/Login" element={<TeacherLoginPage/>} />
          <Route path="teacher/*" element={<TeacherLandingPage/>} />
          <Route path="student/*" element={<StudentLandingPage/>} />
          <Route path="GsMozeAdmin@123PageFirstTeacherSetupPage" element={<Admin/>} />
          <Route path="*" element={<NoMatch/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
