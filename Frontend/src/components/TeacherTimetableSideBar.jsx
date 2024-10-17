import { NavLink } from "react-router-dom";
import ImageComponent from './ImageComponent';
import TeacherImageComponent from "./TeacherImageComponent";

export default function TeacherTimetableSideBar() {
    return (
        <div className="flex justify-center	bg-gray-500 h-screen	">
            <div className="flex flex-col justify-center  items-center w-full px-5">
                <div className="bg-black h-60 w-60 mb-2 rounded-full text-center flex flex-col justify-center items-center "><TeacherImageComponent></TeacherImageComponent></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Timetable"}>Create Or Update 2nd/3rd/4th year timetable</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Timetable/CreateOrUpdateFYtt"}>Create Or Update FY Timetable</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Timetable/GetTimetable"}>Get Timetable</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Timetable/DeleteFYtt"}>Delete FY Timetable</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={""}>Back</NavLink></div>
            </div>
        </div>
    )
}