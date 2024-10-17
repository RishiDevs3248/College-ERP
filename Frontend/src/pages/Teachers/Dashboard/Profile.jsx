import { useEffect, useState } from "react";

export default function Profile() {
    const [imageSrc, setImageSrc] = useState('../../../images/DefaultProfile.jpg')
    const [profileData, setProfileData] = useState({});

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

    useEffect(() => {
        const getprofile = async () => {
            const response = await fetch("http://localhost:3000/teacher/Profile", {
                method: "GET",
                credentials: "include"
            })
            const data = await response.json()
            setProfileData(data)
            if (data.profilePhoto!=null) {
                // console.log(data.profilePhoto)
                const imageData = data.profilePhoto; // Access the image object
                const imageBuffer = imageData.data; // Access the data within the image object

                // Convert the buffer to a Base64 string
                const base64String = bufferToBase64(imageBuffer);
                const imgSrc = `data:image/jpeg;base64,${base64String}`; // Create the src string

                setImageSrc(imgSrc); // Set the image source state
            }
            // console.log(data)
        }
        getprofile()
    }, [])
    return (
        <div className="mt-10">
            <div className="mb-2"><img src={imageSrc} alt="" className="h-52 w-52" /></div>
            {/* <div>profilePhoto : {profileData.profilePhoto?profileData.profilePhoto:"Please update your profile"}</div> */}
            <div className="mb-2">name : <b>{profileData.name?profileData.name:"Please update your profile"} </b></div>
            <div className="mb-2">email : <b>{profileData.email?profileData.email:"Please update your profile"}</b></div>
            <div className="mb-2">phoneNo : <b>{profileData.phoneNo?profileData.phoneNo:"Please update your profile"}</b></div>
            <div className="mb-2">dept : <b>{profileData.dept?profileData.dept:"Please update your profile"}</b></div>
        </div>
    );
}