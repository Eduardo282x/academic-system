import { FormControl, OutlinedInput, InputAdornment, Icon, IconButton } from "@mui/material";
import { BaseResponse, ResponseLogin } from "../../../interfaces/base-response.interface";
import { defaultValues, UserLogin, loginValidationSchame } from "./login.data";
import { ColorButton } from "../../../components/buttonCustom/ButtonCustom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { postDataApi } from "../../../backend/BaseAxios";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import { useState } from "react";

export const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severityType, setSeverityType] = useState<boolean>(true);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {return;}
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
        })
    };

    return (
        <div className='flex flex-col items-center justify-center gap-5 bg-blue-600 rounded-2xl shadow-2xl w-96 h-auto py-8'>
            <h1 className='text-2xl font-bold'>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">

                <div className="mx-4 my-4">
                    <label className=' text-white ml-1'>Nombre de usuario</label>
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        {/* <InputLabel htmlFor="inputUser">Usuario</InputLabel> */}
                        <OutlinedInput
                            className=" bg-gray-200 text-white"
                            id="inputUser"
                            type="text"
                            label="Usuario"
                            {...register('username')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Icon>
                                        {<AccountCircleIcon />}
                                    </Icon>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>

                <div className="mx-4 my-4">
                    <label className=' text-white ml-1 mb-2'>Contraseña</label>
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <OutlinedInput
                            label="Contraseña"
                            id="outlined-adornment-password"
                            className=" bg-gray-200"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            name="password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword((show) => !show)}
                                        onMouseDown={(event: any) => { event.preventDefault(); }}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>

                <div className="flex flex-col items-center justify-center gap-5">
                    <ColorButton variant="contained" type='submit' >Iniciar sesión</ColorButton>
                    {/* <button type='submit' className=' bg-gray-500 hover:bg-gray-600 transition-all text-white rounded-md shadow-2xl p-4'>Iniciar sesión</button> */}
                </div>
            </form>

            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
                <Alert
                    onClose={handleClose}
                    severity={severityType ? 'success': 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}
