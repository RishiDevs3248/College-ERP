import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CreateOrUpdateFYtt() {
    const [data , setData] = useState({})
    const changehandle = (e) => {
        let name = e.target.name;
        let value = name === "timetable" ? e.target.files[0] : e.target.value; // Handle file input separately

        setData({
            ...data,
            [name]: value,
        });
    };

    const submithandle = async (e)=>{

        e.preventDefault()
        const formData = new FormData();
        formData.append("div", data.div);
        formData.append("department", "FY");
        formData.append("timetable", data.timetable); // File field


        const response = await fetch("http://localhost:3000/teacher/updateOrCreateFirstYearTimetable",{
            method:"POST",
            credentials:"include",
            body:formData
        })

        const responseData = await response.json()
        toast.success(responseData.msg);
        toast.error(responseData.error);

    }

    return (
        <div>
            <div className="text-center mb-5"> 
                <b>
                    Create Timetable for First Year
                </b>
            </div>
            <form onSubmit={submithandle} encType="multipart/form-data">
            <div className="grid grid-cols-2">
                <label htmlFor="department">department : </label>
                <input onChange={changehandle}  type="text" id="department" name="department" className="mb-2 border-2 bg-gray-500" value="FY" required/>
                <label htmlFor="div">div : </label>
                <input  onChange={changehandle} type="text" id="div" name="div" className="mb-2 border-2 bg-gray-500" required/>
                <label htmlFor="timetable">timetable : </label>
                <input  onChange={changehandle} type="file" id="timetable" name="timetable" className="mb-2 border-2 bg-gray-500" required/>
            </div>
            <div className="flex justify-center">
                <button type="submit" className="mt-5 bg-blue-500 w-52 h-8 rounded-lg">Set Timmetable</button>
            </div>
            </form>
            <ToastContainer/>
        </div>
    );
}