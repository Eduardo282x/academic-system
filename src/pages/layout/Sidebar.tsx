import { useNavigate } from "react-router-dom";
import { menu, IMenu } from "./menu.data"
import { useEffect, useState } from "react";
import { UserData } from "../../interfaces/base-response.interface";
import { baseColor } from "../../styles";

export const Sidebar = () => {
    const [menuFilter, setMenuFilter] = useState<IMenu[]>([]);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        navigate('/');
    }

    useEffect(() => {
        const userData: UserData = JSON.parse(String(localStorage.getItem('token')));
        const menuCopy: IMenu[]  = menu.filter(item => item.rol.toString().toLowerCase().includes(userData.rolText.toLowerCase()));
        setMenuFilter(menuCopy)
    },[])

    return (
        <div className={`h-full w-full flex flex-col items-start justify-between py-6 px-2 ${baseColor} text-white`}>
            <div className="w-full gap-5 flex flex-col items-start justify-start">
                {menuFilter.map((opt: IMenu) => (
                    <div key={opt.title} onClick={() => navigate(opt.redirect)} className=" bg-blue-800 rounded-lg w-full flex items-center justify-start p-2 cursor-pointer hover:bg-white hover:text-black transition-all shadow-2xl">
                        <span className="material-icons mr-2">{opt.icon}</span>
                        <p>{opt.title}</p>
                    </div>
                ))}
            </div>

            <div onClick={logout} className=" bg-red-500 rounded-lg w-full flex items-center justify-start p-2 cursor-pointer hover:bg-red-600 transition-all shadow-2xl">
                <span className="material-icons mr-2">logout</span>
                <p>Cerrar Sesión</p>
            </div>
        </div>
    )
}
