import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GetAttendance() {
    const [sendData,setsendData] = useState({})
    const [Data,setData] = useState({})

    const changeHandle = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setsendData({
            ...sendData,
            [name]:value
        })
    }

    const submitHandle = async (e)=>{
        e.preventDefault()
        // console.log(sendData)
        const response = await fetch("http://localhost:3000/teacher/getAttendance", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        const data = await response.json();

        toast.success(data.msg);
        toast.error(data.error);
        setData(data)
        // console.log(Data)
    }

    // const Attendance = [];
    // resData.forEach((element ,index) => {
    //     let imgSrc;
    //     if (element.Attendance!=null) {
    //         // console.log(element.Attendance.data)
    //         const imageData = element.Attendance; // Access the image object
    //         const imageBuffer = imageData.data; // Access the data within the image object

    //         // Convert the buffer to a Base64 string
    //         // const base64String = btoa(String.fromCharCode(...imageBuffer));
    //         const base64String = bufferToBase64(imageBuffer);
    //          imgSrc = `data:image/jpeg;base64,${base64String}`; // Create the src string

    //          // Set the image source state
    //     }
    //     Attendance.push(
    //         <div key={index} className="border-4 mb-5">
    //             <div>{element.AttendanceNo}</div>
    //             <div><img src={imgSrc} alt="" className="" /></div>
    //             <div>{element.submitDate}</div>
    //         </div>
    //     )
    // })

    return (
        <div>
            <div className="text-center mb-5">
                <b>
                    Get Attendance for a date
                </b>
            </div>
            <form onSubmit={submitHandle}>
                <div className="grid grid-cols-2">
                    <label htmlFor="dept">dept : </label>
                    <input className="mb-2 border-2 bg-gray-500" type="text" id="dept" name="dept" onChange={changeHandle} required />
                    <label htmlFor="year">College year : </label>
                    <input className="mb-2 border-2 bg-gray-500" type="number" id="year" name="year" onChange={changeHandle} required />
                    <label htmlFor="subject">subject : </label>
                    <input className="mb-2 border-2 bg-gray-500" type="text" id="subject" name="subject" onChange={changeHandle} required />
                    <label htmlFor="date">date : </label>
                    <input className="mb-2 border-2 bg-gray-500" type="number" id="date" name="date" onChange={changeHandle} required />
                    <label htmlFor="month">month : </label>
                    <input className="mb-2 border-2 bg-gray-500" type="number" id="month" name="month" onChange={changeHandle} required />
                    <label htmlFor="dateWithYear">Year : </label>
                    <input className="mb-2 border-2 bg-gray-500" type="number" id="dateWithYear" name="dateWithYear" onChange={changeHandle} required />
                </div>
                <div className="flex justify-center">
                    <button type="Submit" className="bg-blue-500 w-52 h-8 mt-5 mb-5 rounded-md">Get Attendance</button>
                </div>
            </form>
            {Data.length > 0 ?Data.join(", ")  : <div>No Attendance Present for This Data</div>}
            <ToastContainer/>
        </div>
    );
}