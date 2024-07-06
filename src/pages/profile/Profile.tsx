import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

export const Profile = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="cardDisplayComponent">
            <div className="w-full flex flex-col items-start justify-start p-2 gap-5 rounded-xl h-[80%] text-black">
                {/* <Button variant='contained' color="inherit" className=" w-[80%] !mx-auto">
                    <span className='material-icons-round'>person</span>
                    <span>Mi Perfil</span>
                </Button> */}
                <Button variant='contained' color="error" onClick={logout} className="flex items-center justify-between w-[80%] !mx-auto">
                    <span className='material-icons-round'>logout</span>
                    <span>Cerrar Sesión</span>
                </Button>
            </div>
        </div>
    )
}
