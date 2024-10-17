import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Attendance() {
    const [url, setUrl] = useState("");
    useEffect(() => {
        const getQRcode = async () => {
            const response = await fetch("http://localhost:3000/student/generateQR", {
                method: "GET",
                credentials: "include"
            })
            const responseData = await response.json();
            // console.log(responseData)
            toast.success(responseData.msg);
            setUrl(responseData)
        }
        getQRcode()
    }, [])

    return (
        <div className="flex justify-center">
            <div className="flex flex-col justify-center">
            <div className="text-center mb-3 "><b>Attendance QR Code</b></div>
            <div className="flex justify-center">
                    {url.qrCode ? <img src={url.qrCode} alt="QR Code" className="h-80 w-80"></img> : url.msg}
            </div>
            <ToastContainer />
            </div>
        </div>
    );
}
