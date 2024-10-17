import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteAllNotice() {
    const submithandle = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/teacher/deleteAllNotice", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const responseData = await response.json()
        toast.success(responseData.msg);
        toast.error(responseData.error);

    }

    return (
        <div>
            <form onSubmit={submithandle}>
                <div className="text-center mb-5">
                    <b>
                        Delete All Notice
                    </b>
                </div>
                <div className="text-center bg-red-500 p-3">
                    <b>
                        WARNING
                    </b>
                    <div>
                        All the notices could be deleted
                    </div>
                </div>
                <div className="flex justify-center mt-10">
                    <button type="submit" className="bg-red-500 w-60 h-16 rounded-lg">Press to Delete All Notice in Database</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}