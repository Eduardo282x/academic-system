import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import imgLogo from '../../assets/img/logoColegio.jpeg';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../interfaces/base-response.interface';
import { baseColor } from '../../styles';

export const Navbar = () => {
    const [userName, setUserName] = useState<string>('');
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const items = [
        { label: 'Perfil', icon: <span className="material-icons text-black mr-2">home</span> },
        { label: 'Cerrar sesión', icon: <span className="material-icons text-black mr-2">home</span> },
    ];

    useEffect(()=> {
        const getUserData: UserData = JSON.parse(String(localStorage.getItem('token')));
        setUserName(getUserData.username);
    }, [])

    return (
        <div className={`w-full ${baseColor} h-full text-black flex items-center justify-between px-4`}>
            <div className="flex items-center justify-center gap-5 cursor-pointer" onClick={() => navigate('/home')}>
                <img src={imgLogo} alt="" width={'55rem'} className=' cursor-pointer'/>
                <p className=' text-white text-[1.5rem] font-bold'>Jorge Washington</p>
            </div>

            <div className="flex items-center justify-center gap-2">
                <span className="material-icons mx-2 cursor-pointer text-white">notifications</span>
                <Avatar icon="pi pi-user" style={{background:'#ddd', cursor:'pointer'}} size="large" shape="circle" />
                {/* <SplitButton severity="secondary" model={items} /> */}
                <p className='text-white'>{userName}</p>
                <Button style={{background: 'transparent', outline:'none', border: 'none'}} onClick={() => setShowMenu(!showMenu)} icon="pi pi-angle-down" aria-label="Filter" />
                {showMenu && (
                    <Menu model={items} style={{background: '#ddd', color:'#000'}} className='w-[10rem] absolute top-16 right-4'/>
                )}
            </div>
        </div>
    )
}
