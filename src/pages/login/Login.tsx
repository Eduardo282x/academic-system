
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useForm, Controller } from 'react-hook-form';

interface UserLogin {
    name: string;
    password: string;
}

type UserKeys = 'name' | 'password';

export const Login = () => {
    
    const defaultValues: UserLogin = {
        name: '',
        password: '',
    }

    const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues });

    const getFormErrorMessage = (name: string) => {
        return errors[name as UserKeys] && <small className=" text-white">{errors[name as UserKeys]?.message}</small>
    };

    const onSubmit = (data: UserLogin) => {
        console.log(data);
    };

    return (
        <div className='flex flex-col items-center justify-center gap-5 bg-blue-600 rounded-2xl shadow-2xl w-96 h-auto py-8'>
            <h1 className='text-2xl font-bold'>Login</h1>

            <div className="flex items-center justify-center w-[482px] h-full"></div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-start justify-center h-[10rem]">
                    <label className=' text-white ml-2 mb-2'>Username</label>
                    <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field }) => (
                        <InputText id={field.name} {...field} autoFocus/>
                    )} />
                    {getFormErrorMessage('name')}
                </div>

                <div className="flex flex-col items-start justify-center h-[10rem]">
                    <label className=' text-white ml-2 mb-2'>Password</label>
                    <Controller name="password" control={control} rules={{ required: 'Hola' }} render={({ field }) => (
                        <Password id={field.name} {...field} toggleMask feedback={false}/>
                    )} />
                    {getFormErrorMessage('password')}
                </div>

                <div className="flex items-center justify-center gap-5">
                    <button type='submit' className=' bg-gray-500 hover:bg-gray-600 transition-all text-white rounded-md shadow-2xl p-4'>Iniciar sesión</button>
                </div>
            </form>
        </div>
    )
}
