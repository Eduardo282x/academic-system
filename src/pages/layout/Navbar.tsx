import { useEffect, useState } from 'react';
// import imgLogo from '../../assets/img/logoColegio.jpeg';
import { UserData } from '../../interfaces/base-response.interface';
import { baseColor, minWidthMobile } from '../../styles';
import { Sidebar } from './Sidebar';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';
import { userToken } from '../../backend/authenticate';
export const Navbar = () => {
    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);
    const [userName, setUserName] = useState<string>('');
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    const handleResize = () => {
        setWidth(window.innerWidth);
        // setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const getUserData: UserData = userToken();
        setUserName(getUserData.username);
    }, [])

    return (
        <div className={`w-full ${baseColor} h-full text-white flex items-center justify-between px-4`}>
            {showSidebar && (
                <Drawer open={showSidebar} onClose={() => setShowSidebar(false)}>
                    <Sidebar widthMobile={true}></Sidebar>
                </Drawer>
            )}
            <div className="flex items-center justify-center gap-5 cursor-pointer">
                <button onClick={() => setShowSidebar(!showSidebar)} className="material-icons-round mx-2 cursor-pointer ">menu</button>
                <p className='font-bold'>Jorge Washington</p>
            </div>

            <div className="flex items-center justify-center gap-2 mx-4" onClick={logout}>
                <span className="material-icons-round mx-2 cursor-pointer ">account_circle</span>
                {width >= minWidthMobile &&
                    <span >{userName}</span>
                }
            </div>
        </div>
    )
}
