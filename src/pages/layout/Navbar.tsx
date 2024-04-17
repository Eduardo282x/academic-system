import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useState } from 'react';
import imgLogo from '../../assets/img/logoColegio.jpeg';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const items = [
        { label: 'Perfil', icon: <span className="material-icons text-black mr-2">home</span> },
        { label: 'Cerrar sesión', icon: <span className="material-icons text-black mr-2">home</span> },
    ];

    return (
        <div className="w-full bg-white h-full text-black flex items-center justify-between px-4">
            <div className="flex items-center justify-center gap-5 cursor-pointer" onClick={() => navigate('/home')}>
                <img src={imgLogo} alt="" width={'55rem'} className=' cursor-pointer'/>
                <p className=' text-blue-700 text-[1.5rem] font-bold'>Jorge Washington</p>
            </div>

            <div className="flex">
                <Avatar icon="pi pi-user" style={{background:'#ddd', cursor:'pointer'}} size="large" shape="circle" />
                {/* <SplitButton severity="secondary" model={items} /> */}
                <Button style={{background: 'transparent', outline:'none', border: 'none'}} onClick={() => setShowMenu(!showMenu)}  icon="pi pi-angle-down" aria-label="Filter" />
                {showMenu && (
                    <Menu model={items} style={{background: '#ddd', color:'#000'}} className='w-[10rem] absolute top-16 right-4'/>
                )}
            </div>
        </div>
    )
}
