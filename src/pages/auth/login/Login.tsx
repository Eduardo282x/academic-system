// import { FormControl, OutlinedInput, InputAdornment, Icon, IconButton } from "@mui/material";
import { BaseResponse, ResponseLogin } from "../../../interfaces/base-response.interface";
import { defaultValues, UserLogin, loginValidationSchame } from "./login.data";
import { ColorButton } from "../../../components/buttonCustom/ButtonCustom";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { VisibilityOff, Visibility } from "@mui/icons-material";
import { postDataApi } from "../../../backend/BaseAxios";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import { useState } from "react";
import './login.css'
export const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severityType, setSeverityType] = useState<boolean>(true);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') { return; }
        setOpen(false);
    };

    const { register, handleSubmit } = useForm({
        defaultValues,
        resolver: zodResolver(loginValidationSchame)
    });

    const showMessage = (message: BaseResponse) => {
        setMessage(message.message);
        setSeverityType(message.success);
        setOpen(true);
    }

    const onSubmit = (data: UserLogin) => {
        postDataApi('auth/login', data).then((response: ResponseLogin | BaseResponse | any) => {
            showMessage(response)
            if (response.success) {
                localStorage.setItem('token', JSON.stringify(response.userData))
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            }
        }).catch(err => {
            showMessage(err)
        })
    };

    return (
        <div className='flex items-center imgBackground justify-end rounded-2xl shadow-2xl'>

            <div className="imgWave rounded-2xl w-full h-full flex items-center md:justify-end justify-center py-8">
                <div className="md:w-[40%] w-full mx-2">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5">
                        {/* <h1 className='text-[2rem] font-bold text-white'>Jorge Washington</h1> */}
                        <div className="imgSchool"></div>
                        <div className="m-4 flex flex-col md:w-full w-[90%]">
                            <label className=' text-white ml-1'>Nombre de usuario</label>
                            <input type="text" className="bg-gray-100 rounded-md w-full h-12 px-2 text-black outline-none"  {...register('username')} />
                        </div>
                        <div className="m-4 flex flex-col md:w-full w-[90%]">
                            <label className=' text-white ml-1'>Contraseña</label>
                            <div className="flex items-center justify-between bg-gray-100 rounded-md px-2">
                                <input type={showPassword ? 'text' : 'password'} className=" bg-transparent w-[80%] h-12 text-black outline-none"  {...register('password')} />
                                <span className="material-icons-outlined cursor-pointer text-black mx-2" onClick={() => setShowPassword((show) => !show)}>{showPassword ? 'visibility' : 'visibility_off'}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-5">
                            <ColorButton variant="contained" type='submit' >Iniciar sesión</ColorButton>
                        </div>
                    </form>
                </div>
            </div>

            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert
                    onClose={handleClose}
                    severity={severityType ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}
