
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { useForm } from 'react-hook-form';

export const Login = () => {
    const { register, handleSubmit } = useForm();

    return (
        <div className='flex flex-col items-center justify-center gap-5 bg-blue-500 rounded-2xl shadow-2xl p-16 '>
            <h1 className='text-2xl font-bold'>Login</h1>

            <form onSubmit={handleSubmit(data => console.log(data))}>
                <div className="flex flex-col items-start justify-center h-[10rem]">
                    <label className=' text-white ml-4 mb-2'>Username</label>
                    <InputText id="username" {...register('username')} />
                </div>

                <div className="flex flex-col items-start justify-center h-[10rem]">
                    <label className=' text-white ml-4 mb-2'>Password</label>
                    <InputText id="username" {...register('password')} />
                </div>

                <div className="flex items-center justify-center">
                    <Button label="Iniciar sesión" severity="secondary"  type='submit' />
                </div>
            </form>
        </div>
    )
}
