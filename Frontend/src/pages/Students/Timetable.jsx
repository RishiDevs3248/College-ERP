import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Timetable() {
    const [imageSrc, setImageSrc] = useState('')

    const bufferToBase64 = (buffer) => {
        // Create a Uint8Array from the buffer
        const byteArray = new Uint8Array(buffer);
        
        // Convert the byte array to a binary string
        let binaryString = '';
        byteArray.forEach((byte) => {
            binaryString += String.fromCharCode(byte);
        });
    
        // Convert the binary string to a Base64 string
        return btoa(binaryString);
    };

    useEffect(()=>{
        const getTimetable = async ()=>{
            const response = await fetch("http://localhost:3000/student/getTimetable",{
                method:"GET",
                credentials:"include",
            })
            const data = await response.json();
            if(data.error){
                toast.error(data.error);
            }
            if (data.timetable!=null) {
                console.log(data.timetable.data)
                const imageData = data.timetable; // Access the image object
                const imageBuffer = imageData.data; // Access the data within the image object

                // Convert the buffer to a Base64 string
                // const base64String = btoa(String.fromCharCode(...imageBuffer));
                const base64String = bufferToBase64(imageBuffer);
                const imgSrc = `data:image/jpeg;base64,${base64String}`; // Create the src string

                setImageSrc(imgSrc); // Set the image source state
            }
        }
        getTimetable()
    },[])
    return (
        <div>
            <div className="flex justify-center mb-3"><b>Your Current Year Timetable</b></div>
            <div className="flex justify-center"><img src={imageSrc} alt="" className="border-2 border-black" /></div>
            <ToastContainer />
        </div>
    );
}
