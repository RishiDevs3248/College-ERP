import { useEffect, useState } from "react";

export default function Profile() {
    const [imageSrc, setImageSrc] = useState('../../../images/DefaultProfile.jpg')
    const [profileData, setprofileData] = useState({})

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
        const fetchProfile = async () => {
            try {
                const profileResponse = await fetch("http://localhost:3000/student/Profile", {
                    method: "GET",
                    credentials: "include",
                })
                const data = await profileResponse.json()
                console.log("Response from backend : ", data)
                setprofileData(data)

                if (data.profilePhoto!=null) {
                    // console.log(data.profilePhoto)
                    const imageData = data.profilePhoto; // Access the image object
                    const imageBuffer = imageData.data; // Access the data within the image object
    
                    // Convert the buffer to a Base64 string
                    const base64String = bufferToBase64(imageBuffer);
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
        <div className="mt-10">
            <div className="mb-3"><img src={imageSrc} alt="" className="h-52 w-52" /></div>
            {/* <div><img src={"../../../images/DefaultProfile.jpg"} alt="" className="h-52 w-52"/></div> */}
            <div className="mb-2">Name : <b>{profileData.name}</b></div>
            <div className="mb-2">Email : <b>{profileData.email}</b></div>
            <div className="mb-2">Phone No : <b>{profileData.phoneNo}</b></div>
            <div className="mb-2">Dept :<b> {profileData.dept}</b></div>
            <div className="mb-2">Year : <b>{profileData.year}</b></div>
            <div className="mb-2">Div : <b>{profileData.div}</b></div>
            <div className="mb-2">Roll No : <b>{profileData.rollNo}</b></div>
        </div>
    );
}
