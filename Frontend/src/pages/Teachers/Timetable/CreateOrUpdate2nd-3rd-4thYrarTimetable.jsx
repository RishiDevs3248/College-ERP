import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateOrUpdate2nd3rd4thYarTimetable() {
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
        formData.append("year", data.year);
        formData.append("department", data.department);
        formData.append("timetable", data.timetable); // File field

        console.log(data)
        const response = await fetch("http://localhost:3000/teacher/updateTimetable",{
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
                Create Timmetable for 2nd, 3rd & 4th year 
                </b>
            </div>
            <form onSubmit={submithandle} encType="multipart/form-data">
            <div className="grid grid-cols-2">
                <label htmlFor="department">department : </label>
                <input onChange={changehandle}  type="text" id="department" name="department" className="mb-2 border-2 bg-gray-500 text-white" required/>
                <label htmlFor="year">year : </label>
                <input  onChange={changehandle} type="text" id="year" name="year" className="mb-2 border-2 bg-gray-500 text-white" required/>
                <label htmlFor="timetable">timetable : </label>
                <input  onChange={changehandle} type="file" id="timetable" name="timetable" className="mb-2 border-2 bg-gray-500 text-white" required/>
            </div>
            <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 w-52 h-8 m-5 rounded-lg">Set Timmetable</button>
            </div>
            </form>
            <ToastContainer/>
        </div>
    );
}