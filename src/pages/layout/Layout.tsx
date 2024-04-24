import { Outlet } from "react-router-dom"
// import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import './sidebar.css'
import { useState, useEffect } from "react";
import { UserData } from "../../interfaces/base-response.interface";
export const Layout = () => {

    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        const getUserData: UserData = JSON.parse(String(localStorage.getItem('token')));
        setUserName(getUserData.username);
    }, [])


    return (
        <div className="w-screen h-screen">
            {/* <div className="h-[4rem]">
                <Navbar></Navbar>
            </div> */}
            <div className="flex h-full w-full">

                <div className="w-[3.7rem] hover:w-48 animationDisplay">
                    <Sidebar></Sidebar>
                </div>
                <div className="flex flex-col items-center justify-center h-full bg-[#08ace8] w-full">
                    {/* <span className="material-icons">home</span>
                <span className="material-icons-outlined">home</span>
                <span className="material-icons-round">home</span>
                <span className="material-icons-sharp">home</span>
                <span className="material-icons-two-tone">home</span> */}
                    <div className="flex items-center justify-between w-[92%] mt-4 -mb-4 ">
                        <p className="text-[2rem] font-bold">Jorge Washington</p>

                        <div className="flex items-center justify-center gap-2">
                            <span className="material-icons-outlined">account_circle</span>
                            <p>{userName}</p>
                        </div>
                    </div>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}
