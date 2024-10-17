import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Assignment from "./Students/Assignment";
import Dashboard from "./Students/Dashboard";
import FirstYearTimetable from "./Students/FierstYearTimetable";
import Timetable from "./Students/Timetable";
import DefaultComponent from "./Students/DefaultComponents";
import StudentLoginPage from "./Students/StudentLoginPage";
import NoMatch from "../components/NoMatch";
import StudentSideBar from "../components/SideBarStudent";
import CollageNameHeader from "../components/CollageNameHeader";
import DashboardSideBar from "../components/DashboardSideBar";
import Calander from "../components/Calander";
import Notice from "./Students/Notice";
import Attendance from "./Students/Attendance";

export default function StudentLandingPage() {
  const Location = useLocation();
  let ifDashboard = false;
  if (Location.pathname === "/student/Dashboard" || Location.pathname === "/student/Dashboard/Profile" || Location.pathname === "/student/Dashboard/UpdateProfile" || Location.pathname === "/student/Dashboard/UpdateCredentials" || Location.pathname === "/student/Dashboard/ID" || Location.pathname === "/student/Dashboard/Feedback") {
    ifDashboard = true;
  }
  // console.log(Location.pathname) ---------------------->
  return (
    <div className="bg-gray-700 ">
      <div className="grid grid-cols-4">
        <div className="col-span-1 sticky top-0 h-screen">
          {!ifDashboard && <>
            <StudentSideBar></StudentSideBar>
          </>}
          {ifDashboard && <>
            <DashboardSideBar></DashboardSideBar>
          </>}
        </div>
        <div className="col-span-3 ">
          <div className="sticky top-5 mb-10">
            <CollageNameHeader></CollageNameHeader>
          </div>

          <div className="w-full text-white">
            <Routes>
              <Route path="/" element={<DefaultComponent />} />
              <Route path="loginpage" element={<StudentLoginPage />} />
              <Route path="Assignment" element={<Assignment />} />
              <Route path="Dashboard/*" element={<Dashboard />} />
              <Route path="FirstYearTimetable" element={<FirstYearTimetable />} />
              <Route path="Timetable" element={<Timetable />} />
              <Route path="Notice" element={<Notice />} />
              <Route path="Attendance" element={<Attendance />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}