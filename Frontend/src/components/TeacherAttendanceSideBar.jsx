import { NavLink } from "react-router-dom";
import TeacherImageComponent from "./TeacherImageComponent";

export default function TeacherAttendanceSideBar() {
    return (
        <div className="flex justify-center	bg-gray-500 h-screen	">
            <div className="flex flex-col justify-center  items-center w-full px-5">
                <div className="bg-black h-60 w-60 mb-2 rounded-full text-center flex flex-col justify-center items-center "><TeacherImageComponent></TeacherImageComponent></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Attendance/"}>Set Attendance</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Attendance/GetAttendance"}>Get Attendance</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={""}>Back</NavLink></div>
            </div>
        </div>
    )
}