import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
    const [data , setData] = useState({})
    const changehandle = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name] : value,
        })
    }

    const submithandle = async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:3000/teacher/new",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body : JSON.stringify(data)
        })
        const responseData = await response.json()
        toast.success(responseData.msg);
        toast.error(responseData.error);

    }

    return (
        <div>
            <div>Default Password - 12345678</div>
            <form onSubmit={submithandle}>
                <label htmlFor="email">email : </label>
                <input onChange={changehandle}  type="text" id="email" name="email" className="border-2" required/>
                <button type="submit" className="bg-blue-500 rounded-lg">Register Teacher through admin</button>
            </form>
            <ToastContainer/>
        </div>
    );
}