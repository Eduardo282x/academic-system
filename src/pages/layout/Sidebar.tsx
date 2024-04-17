import { useNavigate } from "react-router-dom";
import { menu, IMenu } from "./menu.data"

export const Sidebar = () => {
    const userType = 'admin';
    const navigate = useNavigate();

    const menuFilterFinal: IMenu[] = menu.filter(item => item.rol.includes(userType));
    console.log(menuFilterFinal);
    
    const menuFilter: IMenu[] = menu;

    return (
        <div className="h-full w-full flex flex-col items-start justify-between py-6 px-2 bg-gray-800 text-white">
            <div className="w-full gap-5 flex flex-col items-start justify-start">
                {menuFilter.map(opt => (
                    <div key={opt.title} onClick={() => navigate(opt.redirect)} className=" bg-blue-500 rounded-lg w-full flex items-center justify-start p-2 cursor-pointer hover:bg-blue-600 transition-all shadow-2xl">
                        <span className="material-icons mr-2">{opt.icon}</span>
                        <p>{opt.title}</p>
                    </div>
                ))}
            </div>

            <div className=" bg-red-500 rounded-lg w-full flex items-center justify-start p-2 cursor-pointer hover:bg-red-600 transition-all shadow-2xl">
                <span className="material-icons mr-2">logout</span>
                <p>Cerrar Sesión</p>
            </div>
        </div>
    )
}
