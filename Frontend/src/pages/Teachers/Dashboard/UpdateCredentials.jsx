import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateCredentials() {
    const [password,setpassword] = useState({
        password : "",
        confirmpassword : ""
    })

    const changeHandle = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setpassword({
            ...password,
            [name]:value
        })
    }

    const submitHalndle = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3000/teacher/UpdateCredentials",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(password)
        })
        const responseData = await response.json()
        toast.success(responseData.msg);
        toast.error(responseData.error);
    }

    return (
        <div>
            <form onSubmit={submitHalndle}>
                <div className="grid grid-cols-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="bg-gray-500 border-2 mb-2" placeholder="Enter your new password" required onChange={changeHandle}/>
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password" id="confirmpassword" name="confirmpassword" className="bg-gray-500 border-2 mb-2" placeholder="Re-enter your password" required onChange={changeHandle}/>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-orange-500 h-7 w-52 rounded-lg mt-5">Change Passowrd</button>
                </div>
            </form>
            <ToastContainer/>
        </div>

    );
}
