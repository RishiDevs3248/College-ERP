import { NavLink } from "react-router-dom";
import ImageComponent from './ImageComponent';
import TeacherImageComponent from "./TeacherImageComponent";

export default function TeacherSideBar() {
    return (
        <div className="flex justify-center	bg-gray-500 h-screen	">
            <div className="flex flex-col justify-center  items-center px-5 w-full">
                <div className="bg-slate-500 h-52 w-52 mb-2 rounded-full text-center flex flex-col justify-center"><TeacherImageComponent></TeacherImageComponent></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Dashboard"}>Dashboard</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Timetable"}>Timetable</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Assignment"}>Assignment</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Notice"}>Notice</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Result"}>Result</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Fees"}>Fees</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"DailyAnnouncement"}>Daily Announcement</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Attendance"}>Attendance</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"NewMember"}>New Member</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={""}>Back</NavLink></div>
            </div>
        </div>
    )
}