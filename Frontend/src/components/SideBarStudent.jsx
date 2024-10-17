import { NavLink } from "react-router-dom";
import ImageComponent from './ImageComponent';

export default function StudentSideBar() {
    return (
        <div className="flex justify-center	h-screen bg-gray-500	">
            <div className="flex flex-col justify-center items-center px-5 w-full">
                <div className="bg-slate-500 h-52 w-52 mb-2 rounded-full text-center flex flex-col justify-center "><ImageComponent></ImageComponent></div>
                <div className="bg-red-500  h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center "><NavLink to={"Dashboard"}>Dashboard</NavLink></div>
                <div className="bg-red-500  h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center "><NavLink to={"Timetable"}>Timetable</NavLink></div>
                <div className="bg-red-500  h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center "><NavLink to={"Assignment"}>Assignment</NavLink></div>
                <div className="bg-red-500  h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center "><NavLink to={"Notice"}>Notice</NavLink></div>
                <div className="bg-red-500  h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center "><NavLink to={"Result"}>Result</NavLink></div>
                <div className="bg-red-500  h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center "><NavLink to={"Fees"}>Fees</NavLink></div>
                <div className="bg-red-500  h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center "><NavLink to={"Attendance"}>Attendance</NavLink></div>
                <div className="bg-red-500  h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center "><NavLink to={""}>Back</NavLink></div>
            </div>
        </div>
    )
}