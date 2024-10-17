import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteParticularNotice() {
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
        const response = await fetch("http://localhost:3000/teacher/deleteNotice", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()
        console.log(responseData)


        toast.success(responseData.msg);
        toast.error(responseData.error);

    }

    return (
        <div>
            <div className="text-center mb-5">
                <b>
                    Delete a Particular Notice
                </b>
            </div>
            <form onSubmit={submithandle}>
                <div className="grid grid-cols-2">
                    <label htmlFor="id">Notice ID : </label>
                    <input onChange={changehandle} type="text" id="id" name="id" className="border-2 bg-gray-500" placeholder="Enter ID" required />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 rounded-lg w-52 h-8 mt-5">Delete Notice</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}