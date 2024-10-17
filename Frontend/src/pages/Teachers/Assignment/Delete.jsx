import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteParticularAssignment() {
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

        const response = await fetch("http://localhost:3000/teacher/deleteAssignment", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()

        // console.log("response : ",response)
        // console.log("responseData : ",responseData)
        toast.success(responseData.msg);
        toast.error(responseData.error);

    }

    return (
        <div>
            <div className="text-center mb-5">
                <b>
                    Delete Assignment
                </b>
            </div>
            <form onSubmit={submithandle}>
                <div className="grid grid-cols-2">
                    <label htmlFor="year">year : </label>
                    <input onChange={changehandle} type="text" id="year" name="year" className="mb-2 border-2 bg-gray-500" required />
                    <label htmlFor="subject">subject : </label>
                    <input onChange={changehandle} type="text" id="subject" name="subject" className="mb-2 border-2 bg-gray-500" required />
                    <label htmlFor="assignmentNo">assignmentNo : </label>
                    <input onChange={changehandle} type="text" id="assignmentNo" name="assignmentNo" className="mb-2 border-2 bg-gray-500" required />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 w-52 h-8 mt-5 rounded-lg">Delete Assignment</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}