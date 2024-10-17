import { useEffect, useState } from "react";

export default function ID() {
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
                // console.log("Response from backend : ", data)
                setprofileData(data)
                if (data.profilePhoto != null) {
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
        <div className="flex justify-center">
            <div className="bg-white text-black border-2 border-black rounded-lg p-5 w-80">
                <div className="flex justify-center "><b className="text-center">GENBA SOPANRAO MOZE COLLEGE OF ENGINEERING</b></div>
                <div className="pb-2 mb-5 flex justify-center border-b-2 border-black">BALEWADI PUNE</div>
                <div className="flex justify-center"><img src={imageSrc} alt="" className="h-52 w-52" /></div>
                <div className=" mt-2 pb-2 mb-2 flex justify-center border-b-2 border-black " ><b>{profileData.name}</b></div>
                <div className="mb-2">
                    Dept :{profileData.dept}
                </div>
                <div className="mb-2">
                    Email : 
                    {profileData.email}
                </div>
                <div className="mb-2">
                    Phone No : 
                    {profileData.phoneNo}
                </div>
                <div className="mb-2">
                    Year :
                    {profileData.year}
                </div>
                <div className="mb-2">
                    Div : 
                    {profileData.div}
                </div>
                <div className="mb-2">
                    Roll No : 
                    {profileData.rollNo}
                </div>
            </div>
        </div>
    );
}
