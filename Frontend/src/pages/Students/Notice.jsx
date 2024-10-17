import { useEffect, useState } from "react";


export default function Notice() {
    const [data , setdata] = useState([])

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
        const fetchdata = async ()=>{
            const response = await fetch("http://localhost:3000/student/getNotice",{
                method:"GET",
                credentials:"include"
            })
            const responseData = await response.json();
            // console.log(responseData)
            setdata(responseData)
        }
        fetchdata()
    },[])

    const Notice = [];
    data.forEach((element,index)=>{
        let imgSrc;
        if (element.notice!=null) {
            // console.log(element.notice.data)
            const imageData = element.notice; // Access the image object
            const imageBuffer = imageData.data; // Access the data within the image object

            // Convert the buffer to a Base64 string
            // const base64String = btoa(String.fromCharCode(...imageBuffer));
            const base64String = bufferToBase64(imageBuffer);
             imgSrc = `data:image/jpeg;base64,${base64String}`; // Create the src string

             // Set the image source state
        }
        Notice.push(
        <div key={index} className="border-2 border-black mb-4">
            <div>Subject : <b>{element.subject}</b></div>
            <div className="mb-3 flex justify-center" ><img src={imgSrc} alt="" className="" /></div>
        </div>
        )
    })

    return (
        <div>
            <div className="text-center mb-3"><b>All Notices</b></div>
            {data.length > 0 ?Notice : <div>No Notice Present</div>}
        </div>
    );
}
