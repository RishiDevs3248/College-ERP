import { useEffect, useState } from "react"

export default function ImageComponent() {
    const [imageSrc, setImageSrc] = useState('../../images/DefaultProfile.jpg')
    const [profileData, setprofileData] = useState({})
    useEffect(() => {
        const getImage = async () => {
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
                    const base64String = btoa(String.fromCharCode(...imageBuffer));
                    const imgSrc = `data:image/jpeg;base64,${base64String}`; // Create the src string
    
                    setImageSrc(imgSrc); // Set the image source state
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        getImage()
    },[])
    return (
        <div>
            <div><img src={imageSrc} alt="" className="bg-slate-500 h-52 w-52 rounded-full" /></div>
            {/* {profileData.profilePhoto ? <img src={profileData.profilePhoto} alt="Student image" className="bg-slate-500 h-60 w-60 rounded-full text-center flex flex-col justify-center"></img> : <img src="/images/DefaultProfile.jpg" alt="Student image" className="bg-slate-500 h-60 w-60 rounded-full text-center flex flex-col justify-center"></img>} */}
            {/* <img src="/images/DefaultProfile.jpg" alt="Student image" className="bg-slate-500 h-52 w-52 rounded-full"></img>             */}
        </div>
    )
}