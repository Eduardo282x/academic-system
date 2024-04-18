import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"

export const Layout = () => {
    return (
        <div className="w-screen h-screen">
            <div className="h-[4rem]">
                <Navbar></Navbar>
            </div>
            <div className="flex h-[calc(100%-4rem)] w-full">

                <div className="w-48">
                    <Sidebar></Sidebar>
                </div>
                <div className="flex items-center justify-center h-full bg-gray-300 w-[calc(100%-12rem)]">
                    {/* <span className="material-icons">home</span>
                <span className="material-icons-outlined">home</span>
                <span className="material-icons-round">home</span>
                <span className="material-icons-sharp">home</span>
                <span className="material-icons-two-tone">home</span> */}

                    <Outlet />
                </div>

            </div>
        </div>
    )
}
