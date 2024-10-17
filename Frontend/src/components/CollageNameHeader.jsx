import { NavLink } from "react-router-dom";

export default function CollageNameHeader() {
    return (
        <div className="my-2.5 px-3 ">
            <div className="bg-white flex justify-center items-center h-10 w-full rounded-3xl">
                <b>ERP Project By "RISHI" ... GITHUB - <NavLink to={"https://github.com/RishiDevs3248"} className="text-sky-500 cursor-pointer underline">RishiDevs3248</NavLink></b>
            </div>
        </div>
    );
}