import { useNavigate } from "react-router-dom";
import { menu, IMenu } from "./menu.data"
import { FC, useEffect, useState } from "react";
import { UserData } from "../../interfaces/base-response.interface";
import { baseColor } from "../../styles";
import './sidebar.css'

interface ISidebar {
    widthMobile: boolean;
}

export const Sidebar: FC<ISidebar> = ({widthMobile}) => {

    const [menuFilter, setMenuFilter] = useState<IMenu[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userData: UserData = JSON.parse(String(localStorage.getItem('token')));
        const menuCopy: IMenu[]  = menu.filter(item => item.rol.toString().toLowerCase().includes(userData.roles.toLowerCase()));
        setMenuFilter(menuCopy)
    },[])

    return (
        <div className={`h-full md:w-full w-[12rem] md:text-base text-xl flex flex-col items-start justify-between py-6 px-2 ${baseColor} text-white ${widthMobile ? 'sideBarMobile' : 'sideBar'} `}>
            <div className="w-full gap-5 flex flex-col items-start justify-start">
                <div className="imgSchoolSidebar"></div>
                {menuFilter.map((opt: IMenu) => (
                    <div key={opt.title} onClick={() => navigate(opt.redirect)} className=" bg-orange-400 rounded-lg w-full flex items-center justify-start p-2 cursor-pointer hover:bg-orange-500 transition-all shadow-2xl">
                        <span className="material-icons mr-2">{opt.icon}</span>
                        <p className="titleHidden">{opt.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}