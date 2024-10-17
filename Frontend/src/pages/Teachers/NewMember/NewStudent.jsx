import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewStudent() {
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
        const response = await fetch("http://localhost:3000/teacher/RegisterStudent", {
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
                    Register New Student 
                </b>
            </div>
            <form onSubmit={submithandle}>
                <div className="grid grid-cols-2">
                    <label htmlFor="email">email : </label>
                    <input onChange={changehandle} type="text" id="email" name="email" className="border-2 bg-gray-500 mb-2" required />
                    <div><b>Default Password - 12345678</b></div>
                </div>
                <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 h-8 w-52 mt-5 rounded-lg">Register Student</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}