import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DailyAnnouncement() {
    const [sendData, setSendData] = useState({})

    const changeHandle = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setSendData({
            ...sendData,
            [name]: value,
        })
    }

    const submithandle = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/teacher/DailyAnnouncement",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(sendData)
        })
        const responseData = await response.json()
        toast.success(responseData.msg);
        toast.error(responseData.error);
    }

    return (
        <div>
            <div className='text-center mb-5'>
                <b>
                    Daily Announcement
                </b>
            </div>
            <form onSubmit={submithandle}>
                <div className='grid grid-cols-2'>
                    <label htmlFor="dept">dept : </label>
                    <input type="text" id='dept' name='dept' required className='bg-gray-500 border-2 mb-2' onChange={changeHandle} placeholder='Enter dept' />
                    <label htmlFor="year">year : </label>
                    <input type="text" id='year' name='year' required className='bg-gray-500 border-2 mb-2' onChange={changeHandle} placeholder='Enter year' />
                    <label htmlFor="div">div : </label>
                    <input type="text" id='div' name='div' required className='bg-gray-500 border-2 mb-2' onChange={changeHandle} placeholder='Enter div' />
                    <label htmlFor="subject">Announcement : </label>
                    <input type="text" id='subject' name='subject' required className='bg-gray-500 border-2 mb-2' onChange={changeHandle} placeholder='Enter Announcement' />
                </div>
                <div className='flex justify-center'>
                <button type='submit' className='bg-blue-500 w-52 h-8 mt-5 rounded-md'>Send Announcement</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
}