import { Route, Routes, useLocation } from "react-router-dom";
import Loginpage from "./Teachers/TeacherLoginPage";
import NoMatch from "../components/NoMatch";
import TeacherDefaultComponent from "./Teachers/TeacherDefaultComponent";
import TeacherSideBar from "../components/TeacherSideBar";
import CollageNameHeader from "../components/CollageNameHeader";
import TeacherDashboardSideBar from "../components/TeacherDashboardSideBar";
import TeacherTimetableSideBar from "../components/TeacherTimetableSideBar";
import TeacherAssignmentSideBar from "../components/TeacherAssignmentSideBar";
import TeacherNoticeSideBar from "../components/TeacherNoticeSideBar";
import Dashboard from "./Teachers/Dashboard/Dashboard";
import Timetable from "./Teachers/Timetable/Timetable";
import Assignment from "./Teachers/Assignment/Assignment";
import Notice from "./Teachers/Notice/Notice";
import Attendance from "./Teachers/Attendance/Attendance";
import TeacherAttendanceSideBar from "../components/TeacherAttendanceSideBar";
import NewMember from "./Teachers/NewMember/NewMember";
import TeacherNewMemberSideBar from "../components/TeacherNewMemberSideBar";
import DailyAnnouncement from "./Teachers/DailyAnnouncement/DailyAnnouncement";

export default function TeacherLandingPage() {
  const Location = useLocation();
  let ifDashboard = false;
  if (Location.pathname.includes("/Teacher/Dashboard")) {
    ifDashboard = true;
  }

  let isTimetable = false;
  if (Location.pathname.includes("/Teacher/Timetable")) {
    isTimetable = true;
  }

  let isAssignment = false;
  if (Location.pathname.includes("/Teacher/Assignment")) {
    isAssignment = true;
  }
  let isNotice = false;
  if (Location.pathname.includes("/Teacher/Notice")) {
    isNotice = true;
  }
  let isAttendance = false;
  if (Location.pathname.includes("/Teacher/Attendance")) {
    isAttendance = true;
  }
  let isNewMember = false;
  if (Location.pathname.includes("/Teacher/NewMember")) {
    isNewMember = true;
  }

  return (
    <div className="grid grid-cols-4 bg-gray-700">
      {/* Sidebar */}

      <div className="col-span-1 sticky top-0 h-screen">
        {/* Main Side Bar */}
        {(!ifDashboard && !isTimetable && !isAssignment && !isNotice && !isAttendance && !isNewMember) && <>
          <TeacherSideBar></TeacherSideBar>
        </>}
        {/* Dashboard */}
        {ifDashboard && <>
          <TeacherDashboardSideBar></TeacherDashboardSideBar>
        </>}
        {/* Timetable */}
        {isTimetable && <>
          <TeacherTimetableSideBar></TeacherTimetableSideBar>
        </>}
        {/* Assignment */}
        {isAssignment && <>
          <TeacherAssignmentSideBar></TeacherAssignmentSideBar>
        </>}
        {/* Notice */}
        {isNotice && <>
          <TeacherNoticeSideBar></TeacherNoticeSideBar>
        </>}
        {isAttendance && <>
          <TeacherAttendanceSideBar></TeacherAttendanceSideBar>
        </>}
        {isNewMember && <>
          <TeacherNewMemberSideBar></TeacherNewMemberSideBar>
        </>}
      </div>



      {/* Rest of the page  */}
      <div className="col-span-3">
        <div className="sticky top-5 mb-10">
          <CollageNameHeader></CollageNameHeader>
        </div>
        <div className="text-white">

          <Routes>
            <Route path="/" element={<TeacherDefaultComponent />} />
            <Route path="Loginpage" element={<Loginpage />} />
            <Route path="Dashboard/*" element={<Dashboard />} />
            <Route path="Timetable/*" element={<Timetable />} />
            <Route path="Assignment/*" element={<Assignment />} />
            <Route path="Notice/*" element={<Notice />} />
            <Route path="Attendance/*" element={<Attendance />} />
            <Route path="DailyAnnouncement" element={<DailyAnnouncement />} />
            <Route path="NewMember/*" element={<NewMember />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}