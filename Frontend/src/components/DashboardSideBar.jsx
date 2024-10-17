import { NavLink } from "react-router-dom";
import ImageComponent from './ImageComponent';

export default function DashboardSideBar() {
    return (
        <div className="flex justify-center	bg-gray-500 h-screen	">
            <div className="flex flex-col justify-center  items-center w-full px-5">
                <div className="bg-black h-60 w-60 mb-2 rounded-full text-center flex flex-col justify-center items-center "><ImageComponent></ImageComponent></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Dashboard/Profile"}>Profile</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Dashboard/UpdateProfile"}>Update Profile</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Dashboard/UpdateCredentials"}>Update Credentials</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Dashboard/ID"}>ID</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={"Dashboard/Logout"}>Logout</NavLink></div>
                <div className="bg-red-500 h-10 w-full mb-2 rounded-3xl text-center flex flex-col justify-center"><NavLink to={""}>Back</NavLink></div>
            </div>
        </div>
    )
}