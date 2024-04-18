/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useForm, Controller } from 'react-hook-form';
import { defaultValues, UserKeys, UserLogin, loginValidationSchame } from "./login.data";
import { Toast } from 'primereact/toast';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postDataApi } from "../../../backend/BaseAxios";
import { BaseResponse, ResponseLogin } from "../../../interfaces/base-response.interface";

export const Login = () => {
    const toastBottomCenter = useRef(null);
    const navigate = useNavigate();

    const { control, formState: { errors }, handleSubmit } = useForm({ 
        defaultValues,
        resolver: zodResolver(loginValidationSchame)
    });
    const getFormErrorMessage = (name: string) => {
        return errors[name as UserKeys] && <small className=" text-gray-300 ml-2">{errors[name as UserKeys]?.message}</small>
    };

    const onSubmit = (data: UserLogin) => {
        postDataApi('auth/login', data).then((response: ResponseLogin | BaseResponse | any) => {
            showMessage(response.message, toastBottomCenter, response.success ? 'success' : 'error');
            if(response.success){
                localStorage.setItem('token', JSON.stringify(response.userData) )
                setTimeout(() => {
                    navigate('/home');
                }, 1500);
            }
        })
    };

    const showMessage = (message: string, ref: any, severity: string) => {
        ref.current.clear();
        ref.current.show({ severity: severity, summary: message, detail: message, life: 1500 });
    };

    return (
        <div className='flex flex-col items-center justify-center gap-5 bg-blue-600 rounded-2xl shadow-2xl w-96 h-auto py-8'>
            <h1 className='text-2xl font-bold'>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex flex-col items-start justify-center h-auto my-8 w-[80%] mx-auto">
                    <label className=' text-white ml-2 mb-2'>Nombre de usuario</label>
                    <Controller name="username" control={control} render={({ field }) => (
                        <InputText id={field.name} {...field} className="w-full" autoFocus/>
                    )} />
                    {getFormErrorMessage('username')}
                </div>

                <div className="flex flex-col items-start justify-center h-auto my-8 w-[80%] mx-auto">
                    <label className=' text-white ml-2 mb-2'>Contraseña</label>
                    <Controller name="password" control={control} render={({ field }) => (
                        <Password id={field.name} {...field} className="w-full" inputStyle={{width: '100%'}} toggleMask feedback={false}/>
                    )} />
                    {getFormErrorMessage('password')}
                </div>

                <div className="flex items-center justify-center gap-5">
                    <button type='submit' className=' bg-gray-500 hover:bg-gray-600 transition-all text-white rounded-md shadow-2xl p-4'>Iniciar sesión</button>
                </div>
            </form>

            <Toast ref={toastBottomCenter} position="bottom-center" />
        </div>
    )
}
