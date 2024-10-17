import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function NewNotice() {
    const [data , setData] = useState({})
    const changehandle = (e) => {
        let name = e.target.name;
        let value = name === "notice" ? e.target.files[0] : e.target.value; // Handle file input separately

        setData({
            ...data,
            [name]: value,
        });
    };

    const submithandle = async (e)=>{

        e.preventDefault()
        const formData = new FormData();
        formData.append("subject", data.subject);
        formData.append("notice", data.notice); // File field

        const response = await fetch("http://localhost:3000/teacher/newNotice",{
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
            <div className="flex justify-center mb-5">
                <b>
                    Create New Notice
                </b>
            </div>
            <form onSubmit={submithandle} encType="multipart/form-data">
            <div className="grid grid-cols-2">
                <label htmlFor="subject">subject : </label>
                <input onChange={changehandle}  type="text" id="subject" name="subject" className="mb-2 border-2 bg-gray-500" required/>
                <label htmlFor="notice">Notice : </label>
                <input  onChange={changehandle} type="file" id="notice" name="notice" className="mb-2 border-2 bg-gray-500" required/>
            </div>
            <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 w-52 h-8 mt-5 rounded-lg">Create Notice</button>
            </div>
            </form>
            <ToastContainer/>
        </div>
    );
}