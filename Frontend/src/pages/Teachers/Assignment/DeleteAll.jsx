import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteAllAssignment() {
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
        const response = await fetch("http://localhost:3000/teacher/deleteAllAssignment", {
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
            <div className="flex justify-center mb-5">
                <b>
                    Delete All Assignment for a Particular Subject
                </b>
            </div>
            <form onSubmit={submithandle}>
                <div className="grid grid-cols-2">
                    <label htmlFor="year">year : </label>
                    <input onChange={changehandle} type="text" id="year" name="year" className="mb-2 border-2 bg-gray-500" required />
                    <label htmlFor="subject">subject : </label>
                    <input onChange={changehandle} type="text" id="subject" name="subject" className="mb-2 border-2 bg-gray-500" required />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-red-500 w-52 h-8 mt-5 rounded-lg">Delete All Assignments</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}