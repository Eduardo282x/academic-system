import { useEffect, useState } from 'react';
// import imgLogo from '../../assets/img/logoColegio.jpeg';
import { UserData } from '../../interfaces/base-response.interface';
import { baseColor } from '../../styles';
import { Sidebar } from './Sidebar';
import Drawer from '@mui/material/Drawer';
export const Navbar = () => {
    const [userName, setUserName] = useState<string>('');
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    useEffect(() => {
        const getUserData: UserData = JSON.parse(String(localStorage.getItem('token')));
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
                <p className='  font-bold'>Jorge Washington</p>
            </div>

            <div className="flex items-center justify-center gap-2 mx-4">
                <span className="material-icons-round mx-2 cursor-pointer ">account_circle</span>
                <span>{userName}</span>
            </div>
        </div>
    )
}
