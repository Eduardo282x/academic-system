import { Outlet, useNavigate } from "react-router-dom"
// import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import './sidebar.css'
import { useState, useEffect } from "react";
import { UserData } from "../../interfaces/base-response.interface";
import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const Layout = () => {
    const [userName, setUserName] = useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.clear()
        navigate('/');
    }

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
                        <p className="text-[2rem] font-bold  rounded-lg px-4">Jorge Washington</p>

                        <div className="flex items-center justify-center gap-2">
                            <Button
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                className="bg-gray-800 gap-2"
                                sx={{ background: '#ddd', textTransform: 'normal' }}
                            >
                                <span className="material-icons-outlined">account_circle</span>
                                <p className="">{userName}</p>
                                {/* border-r-2 border-solid border-black pr-2 */}
                                <span className="material-icons-outlined">expand_more</span>
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} className="gap-2">
                                    <span className="material-icons-outlined">person</span>
                                    Perfil
                                </MenuItem>
                                <MenuItem onClick={() => {handleClose(); logout()}} className="gap-2">
                                    <span className="material-icons-outlined">logout</span>
                                    Cerrar sesión
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
