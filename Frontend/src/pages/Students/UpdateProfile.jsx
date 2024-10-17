import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateProfile() {
    const [imageSrc, setImageSrc] = useState('../../../images/DefaultProfile.jpg')
    const [sendData, setSendData] = useState({
        name: "",
        dept: "",
        year: "",
        div: "",
        profilePhoto: null,
        phoneNo: 0,
        rollNo: 0,
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
        // console.log(sendData)
        // Create FormData object
        const formData = new FormData();
        formData.append("name", sendData.name);
        formData.append("dept", sendData.dept);
        formData.append("year", sendData.year);
        formData.append("div", sendData.div);
        formData.append("profilePhoto", sendData.profilePhoto); // File field
        formData.append("phoneNo", sendData.phoneNo);
        formData.append("rollNo", sendData.rollNo);

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value); // This will show the keys and values in FormData
        // }
        // Send request with FormData
        const response =  await fetch("http://localhost:3000/student/UpdateProfile", {
            method: "POST",
            credentials: "include",
            body: formData, // Automatically sets the right Content-Type
        });

        const data = await response.json()
        toast.success(data.msg);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileResponse = await fetch("http://localhost:3000/student/Profile", {
                    method: "GET",
                    credentials: "include",
                })
                const data = await profileResponse.json()
                setSendData({
                    name: data.name || "",
                    dept: data.dept || "",
                    year: data.year || "",
                    div: data.div || "",
                    profilePhoto: data.profilePhoto || null,
                    phoneNo: data.phoneNo || 0,
                    rollNo: data.rollNo || 0
                });

                if (data.profilePhoto != null)  {
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
                    <div className="col-span-2 mb-3"><img src={imageSrc} alt="" className="h-52 w-52"  /></div>
                    {/* <div><img src={sendData.profilePhoto?sendData.profilePhoto:"image here"} alt="" className="col-span-2"/></div> -------------------------*/}
                    <label htmlFor="profilePhoto">Profile Photo</label>
                    <input onChange={changehandle} type="file" id="profilePhoto" name="profilePhoto" className="bg-slate-500 border-2 mb-2 "  placeholder="Put your photo" />
                    <label htmlFor="name">Name</label>
                    <input onChange={changehandle} type="text" id="name" name="name" value={sendData.name} className=" bg-slate-500 border-2 mb-2" required placeholder="Enter your name" />
                    <label htmlFor="dept">Dept</label>
                    <input onChange={changehandle} type="text" id="dept" name="dept" value={sendData.dept} className=" bg-slate-500 border-2 mb-2" required placeholder="Enter your department" />
                    <label htmlFor="year">Year</label>
                    <input onChange={changehandle} type="text" id="year" name="year" value={sendData.year} className=" bg-slate-500 border-2 mb-2" required placeholder="Stu of year ?" />
                    <label htmlFor="div">Div</label>
                    <input onChange={changehandle} type="text" id="div" name="div" value={sendData.div} className=" bg-slate-500 border-2 mb-2" required placeholder="Enter your Division" />
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input onChange={changehandle} type="number" id="phoneNo" name="phoneNo" value={sendData.phoneNo} className=" bg-slate-500 border-2 mb-2" required placeholder="Enter your mobile no" />
                    <label htmlFor="rollNo">Roll No</label>
                    <input onChange={changehandle} type="number" id="rollNo" name="rollNo" value={sendData.rollNo} className=" bg-slate-500 border-2 mb-2" required placeholder="Enter Roll No" />
                </div>
                <div className="h-8 mt-5 flex justify-center">
                    <button type="submit" className="bg-blue-500 w-52 rounded-lg">Submit</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
