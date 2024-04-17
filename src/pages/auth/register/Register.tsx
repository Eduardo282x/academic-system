import { useRef } from 'react'
import { defaultValues, Form, registerForm, RegisterKeys, UserRegister, validationSchema } from './register.data';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const toastBottomCenter = useRef(null);
    const navigate = useNavigate();
    
    const { control, formState: { errors }, handleSubmit } = useForm({ 
        defaultValues,
        resolver: zodResolver(validationSchema)
    });
    const getFormErrorMessage = (name: string) => {
        const messageError = errors[name as RegisterKeys]?.message;
        return errors[name as RegisterKeys] && <small className=" text-red-500 text-[.9rem]">{messageError}</small>
    };

    const onSubmit = (data: UserRegister) => {
        console.log(data);
        showMessage('Registro existoso', toastBottomCenter, 'success');
        navigate('/')
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const showMessage = (message: string, ref: any, severity: string) => {
        ref.current.clear();
        ref.current.show({ severity: severity, summary: message, detail: message, life: 1500 });
    };

    return (
        <div className='flex flex-col items-center justify-start gap-5 bg-blue-600 rounded-2xl shadow-2xl w-[35rem] max-h-[55rem] overflow-y-auto py-8'>
            <h1 className='text-2xl font-bold'>Registro</h1>

            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>

                {registerForm.map((form: Form, index: number) => (
                    <div key={index} className="flex flex-col items-start justify-center h-auto my-5 mx-auto w-[80%]">
                        <label className=' text-white ml-2 mb-2'>{form.label}</label>
                        {form.type == 'text' && (
                            <Controller name={form.name as RegisterKeys} control={control} render={({ field }) => (
                                <InputText id={field.name} {...field} className='w-full'/>
                            )} />
                        )}
                        {form.type == 'password' && (
                            <Controller name={form.name as RegisterKeys} control={control} render={({ field }) => (
                                <Password id={field.name} {...field} className='w-full' inputStyle={{width: '100%'}}  toggleMask feedback={false}/>
                            )} />
                        )}
                        {getFormErrorMessage(form.name as RegisterKeys)}
                    </div>
                ))}

                <div className="flex items-center justify-center gap-5">
                    <button type='submit' className=' bg-gray-500 hover:bg-gray-600 transition-all text-white rounded-md shadow-2xl p-4'>Iniciar sesión</button>
                </div>
            </form>

            <Toast ref={toastBottomCenter} position="bottom-center" />
        </div>
    )
}
