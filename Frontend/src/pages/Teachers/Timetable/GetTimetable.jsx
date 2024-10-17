import { useEffect, useState } from "react";

export default function GetTimetable() {
    const [imageSrc, setImageSrc] = useState()
    const [sendData, setSendData] = useState({
    })

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

    const changeHandle = (e) => {
        let name = e.target.name
        let value = e.target.value
        setSendData({
            ...sendData,
            [name]: value
        })
    }


    const submitHandle = async (e) => {
        e.preventDefault();
        // console.log(sendData);
        const response = await fetch("http://localhost:3000/teacher/GetTimetable", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })

        const data = await response.json();
        if (data.timetable != null) {
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


    // useEffect(() => {
    //     const getTimetable = async () => {
    //         const response = await fetch("http://localhost:3000/teacher/GetTimetable", {
    //             method: "GET",
    //             credentials: "include",
    //         })
    //         const data = await response.json();
    //         if (data.timetable != null) {
    //             console.log(data.timetable.data)
    //             const imageData = data.timetable; // Access the image object
    //             const imageBuffer = imageData.data; // Access the data within the image object

    //             // Convert the buffer to a Base64 string
    //             // const base64String = btoa(String.fromCharCode(...imageBuffer));
    //             const base64String = bufferToBase64(imageBuffer);
    //             const imgSrc = `data:image/jpeg;base64,${base64String}`; // Create the src string

    //             setImageSrc(imgSrc); // Set the image source state
    //         }
    //     }
    //     getTimetable()
    // }, [])
    return (
        <div>
            <div className="text-center mb-5">
                <b>
                    Get timetable for a Particular Division
                </b>
            </div>
            <form onSubmit={submitHandle}>
                <div className="grid grid-cols-2">
                    <label htmlFor="dept">dept : </label>
                    <input type="text" id="dept" name="dept" onChange={changeHandle} className="bg-gray-500 mb-2 border-2" required />
                    <label htmlFor="year">year : </label>
                    <input type="text" id="year" name="year" onChange={changeHandle} className="bg-gray-500 mb-2 border-2" required />
                    <label htmlFor="div">div : </label>
                    <input type="text" id="div" name="div" onChange={changeHandle} className="bg-gray-500 mb-2 border-2" required />
                </div>
                <div className="flex justify-center mt-5">
                    <button type="submit" className="bg-blue-500 w-52 h-8 rounded-lg">Get Assignment</button>
                </div>
            </form>
            <div className="flex justify-center mt-5"><img src={imageSrc} alt="" className="border-2 border-black" /></div>
        </div>
    );
}
