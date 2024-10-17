import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateOrUpdateAssignment() {
    const [data, setData] = useState({})
    const changehandle = (e) => {
        let name = e.target.name;
        let value = name === "assignment" ? e.target.files[0] : e.target.value; // Handle file input separately

        setData({
            ...data,
            [name]: value,
        });
    };

    const submithandle = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("year", data.year);
        formData.append("subject", data.subject);
        formData.append("div", data.div);
        formData.append("assignmentNo", data.assignmentNo);
        formData.append("submitDate", data.submitDate);
        formData.append("assignment", data.assignment); // File field

        const response = await fetch("http://localhost:3000/teacher/newAssignment", {
            method: "POST",
            credentials: "include",
            body: formData
        })

        const responseData = await response.json()
        toast.success(responseData.msg);
        toast.error(responseData.error);

    }

    return (
        <div>
            <div className="text-center mb-5">
                <b>
                    Create New Assignment Or Update Old Assignment
                </b>
            </div>
            <form onSubmit={submithandle}>
                <div className="grid grid-cols-2">
                    <label htmlFor="year">year : </label>
                    <input onChange={changehandle} type="text" id="year" name="year" className="mb-2 border-2 bg-gray-500" required />
                    <label htmlFor="subject">subject : </label>
                    <input onChange={changehandle} type="text" id="subject" name="subject" className="mb-2 border-2 bg-gray-500" required />
                    <label htmlFor="div">div : </label>
                    <input onChange={changehandle} type="text" id="div" name="div" className="mb-2 border-2 bg-gray-500" required />
                    <label htmlFor="assignmentNo">assignmentNo : </label>
                    <input onChange={changehandle} type="text" id="assignmentNo" name="assignmentNo" className="mb-2 border-2 bg-gray-500" required />
                    <label htmlFor="assignment">assignment : </label>
                    <input onChange={changehandle} type="file" id="assignment" name="assignment" className="mb-2 border-2 bg-gray-500" required />
                    <label htmlFor="submitDate">submitDate : </label>
                    <input onChange={changehandle} type="text" id="submitDate" name="submitDate" className="mb-2 border-2 bg-gray-500" required />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 rounded-lg w-52 h-8 mt-5">Set Assignment</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}