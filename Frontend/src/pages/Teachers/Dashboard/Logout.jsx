import { useEffect } from "react";

export default function Logout() {
    useEffect(()=>{
        const logoutFun = async ()=>{
            const response = await fetch("http://localhost:3000/teacher/logout",{
                method:"POST",
                credentials:"include"
            })
            const data = await response.json()
            console.log(data)
            if(data.redirect){
                window.location.href = data.redirect
            }
        }
        logoutFun()
    },[])
    return (<>
    </>
    );
}
