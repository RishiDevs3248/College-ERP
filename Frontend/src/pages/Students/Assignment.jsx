import { useState } from "react";


export default function Assignment() {
    const [resData, setresData] = useState([])

    const [sendData, setSendData] = useState({
        subject: ""
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
        setSendData({
            subject: e.target.value
        })
    }

    const submitHandler = (e) => {

        e.preventDefault();
        const getAssignment = async () => {
            const response = await fetch("http://localhost:3000/student/getAssignment", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData)
            })
            const data = await response.json();
            console.log(data)
            // console.log(data)
            setresData(data);

        }
        getAssignment()


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
            <div key={index} className="border-2 border-black mb-5">
                <div><b>Assignment {element.assignmentNo}</b></div>
                <div><img src={imgSrc} alt="" className="" /></div>
                <div>Submit till <b>{element.submitDate}</b></div>
            </div>
        )
    }
    )

    return (
        <div>
            <div className="mb-10">
                <b>
                    <h1>Enter Subject Short-Form</h1>
                    <h2>1. Data Structures And Algorithms - 'DSA'</h2>
                    <h2>2. Physics - 'PHY'</h2>
                </b>
            </div>
            <form onSubmit={submitHandler}>
                <div className="flex justify-center">
                    <input type="text" name="subject" id="subject" className="bg-slate-500 border-black border-2 w-60" placeholder="Enter Subject" onChange={changeHandle} required />
                </div>
                <div className="flex justify-center mt-5 mb-5">
                    <button type="submit" className="bg-blue-500 w-52 rounded-lg">Get Assignment</button>
                </div>
            </form>
            {resData.length > 0 ? Assignment : <div>No Assignment Present for Subject {sendData.subject}</div>}
        </div>
    );
}
