import { useState } from "react";


export default function GetAssignment() {
    const [resData, setresData] = useState([])

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

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/teacher/GetAssignment", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        const data = await response.json();
        // console.log(data)
        setresData(data);
    }

    const Assignment = [];
    resData.forEach((element, index) => {
        let imgSrc;
        if (element.assignment != null) {
            // console.log(element.assignment.data)
            const imageData = element.assignment; // Access the image object
            const imageBuffer = imageData.data; // Access the data within the image object

            // Convert the buffer to a Base64 string
            // const base64String = btoa(String.fromCharCode(...imageBuffer));
            const base64String = bufferToBase64(imageBuffer);
            imgSrc = `data:image/jpeg;base64,${base64String}`; // Create the src string

            // Set the image source state
        }
        Assignment.push(
            <div key={index} className="border-4 mb-5 border-2 border-black">
                <div><b>Assignment {element.assignmentNo}</b></div>
                <div><img src={imgSrc} alt="" className="" /></div>
                <div>Submit till <b>{element.submitDate}</b></div>
            </div>
        )
    }
    )

    return (
        <div>
            <div className="mb-5">
                <b>
                    <h1>Enter Subject Short-Form in Capital Case</h1>
                    <h2>Data Structures And Algorithms - 'DSA'</h2>
                    <h2>Physics - 'PHY'</h2>
                </b>
            </div>
            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-3">
                    <label htmlFor="dept">Dept : </label>
                    <input type="text" name="dept" id="dept" placeholder="Enter dept " className="col-span-2 border-2 bg-gray-500 mb-2" onChange={changeHandle} required />
                    <label htmlFor="year">Year : </label>
                    <input type="Number" name="year" id="year" placeholder="Enter year " className="col-span-2 border-2 bg-gray-500 mb-2" onChange={changeHandle} required />
                    <label htmlFor="div">Div : </label>
                    <input type="text" name="div" id="div" placeholder="Enter div " className="col-span-2 border-2 bg-gray-500 mb-2" onChange={changeHandle} required />
                    <label htmlFor="subject">Subject : </label>
                    <input type="text" name="subject" id="subject" placeholder="Enter subject" className="col-span-2 border-2 bg-gray-500 mb-2" onChange={changeHandle} required />
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-500 w-52 h-8 mt-5 rounded-md" type="submit">Get Assignment</button>
                </div>
            </form>
            {resData.length > 0 ? Assignment : <div>No Assignment Present for Subject {sendData.subject}</div>}
        </div>
    );
}
