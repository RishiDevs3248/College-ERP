import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateProfile() {
    const [imageSrc, setImageSrc] = useState('/images/DefaultProfile.jpg')
    const [sendData, setSendData] = useState({
        profilePhoto: null,
        name: "",
        dept: "",
        phoneNo: 0,
    })


    const changehandle = (e) => {
        let name = e.target.name;
        let value = name === "profilePhoto" ? e.target.files[0] : e.target.value; // Handle file input separately

        setSendData({
            ...sendData,
            [name]: value,
        });
    };

    const submitHandle = async (e) => {
        e.preventDefault();
        // Create FormData object
        const formData = new FormData();
        formData.append("name", sendData.name);
        formData.append("dept", sendData.dept);
        formData.append("profilePhoto", sendData.profilePhoto); // File field
        formData.append("phoneNo", sendData.phoneNo);
        
        // for (const [key, value] of formData.entries()) {
            //     console.log(key, value); // This will show the keys and values in FormData
            // }
            // Send request with FormData
            // console.log(sendData)
        const response = await fetch("http://localhost:3000/teacher/UpdateProfile", {
            method: "POST",
            credentials: "include",
            body: formData, // Automatically sets the right Content-Type
        });
        const responseData= await response.json()
        toast.success(responseData.msg);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileResponse = await fetch("http://localhost:3000/teacher/Profile", {
                    method: "GET",
                    credentials: "include",
                })
                const data = await profileResponse.json()
                setSendData({
                    name: data.name || "",
                    dept: data.dept || "",
                    profilePhoto: data.profilePhoto || null,
                    phoneNo: data.phoneNo || 0,
                });

                if (data.profilePhoto != null) {
                    // console.log(data.profilePhoto)
                    const imageData = data.profilePhoto; // Access the image object
                    const imageBuffer = imageData.data; // Access the data within the image object

                    // Convert the buffer to a Base64 string
                    const base64String = btoa(String.fromCharCode(...imageBuffer));
                    const imgSrc = `data:image/jpeg;base64,${base64String}`; // Create the src string

                    setImageSrc(imgSrc); // Set the image source state
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchProfile();
    }, []);




    return (
        <div >
            <form onSubmit={submitHandle} encType="multipart/form-data" >
                <div className="grid grid-cols-2">
                    <div className="col-span-2 mb-2"><img src={imageSrc} alt="" className="h-52 w-52" /></div>
                    {/* <div><img src={sendData.profilePhoto?sendData.profilePhoto:"image here"} alt="" className="col-span-2"/></div> -------------------------*/}
                    <label htmlFor="profilePhoto">profilePhoto</label>
                    <input  onChange={changehandle} type="file" id="profilePhoto" name="profilePhoto" className="bg-gray-500 border-2 mb-2" placeholder="Put your photo"  />
                    <label htmlFor="name">name</label>
                    <input  onChange={changehandle} type="text" id="name" name="name" value={sendData.name} className="bg-gray-500 border-2 mb-2" placeholder="Enter your name"  required/>
                    <label htmlFor="dept">dept</label>
                    <input  onChange={changehandle} type="text" id="dept" name="dept" value={sendData.dept} className="bg-gray-500 border-2 mb-2" placeholder="Enter your department"  required/>
                    <label htmlFor="phoneNo">phoneNo</label>
                    <input  onChange={changehandle} type="number" id="phoneNo" name="phoneNo" value={sendData.phoneNo} className="bg-gray-500 border-2 mb-2" placeholder="Enter your mobile no"  required/>
                </div>
                <div className="flex justify-center mt-5 h-8">
                    <button type="submit" className="bg-blue-500 w-52 rounded-lg">Submit</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
