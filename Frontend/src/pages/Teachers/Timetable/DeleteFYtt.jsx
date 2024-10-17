import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteFYtt() {
    const [data, setData] = useState({})
    const changehandle = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        })
    }

    const submithandle = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/teacher/deleteFirstYearTimetable", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        toast.success(responseData.msg);
        toast.error(responseData.error);

    }

    return (
        <div>
            <div className="text-center mb-5">
                <b>
                    Delete First Year Timetable
                </b>
            </div>
            <form onSubmit={submithandle}>
                <div className="grid grid-cols-2">
                    <label htmlFor="department">department : </label>
                    <input onChange={changehandle} type="text" id="department" name="department" className="bg-gray-500 border-2 mb-2" value="FY" required />
                    <label htmlFor="div">div : </label>
                    <input onChange={changehandle} type="text" id="div" name="div" className="bg-gray-500 border-2 mb-2" required />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 w-52 h-8 mt-5 rounded-lg">Delete Timmetable</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}