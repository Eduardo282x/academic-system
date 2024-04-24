/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { IDataForm, IForm, IOptions } from '../../interfaces/form.interface'
import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { TableReturn } from '../../interfaces/table.interface';
import { ColorButton } from '../buttonCustom/ButtonCustom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './form.css'

const optionStyles = {
    cursor: 'pointer',
    margin: '5px',
    padding: '10px',
    // Otros estilos que desees aplicar
};


export const FormComponent: FC<IForm> = ({ title, dataForm, defaultValues, validationSchema, action, onSubmitForm }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<any>({
        defaultValues,
        resolver: zodResolver(validationSchema)
    });

    const onSubmit = (returnForm: any) => {
        console.log(returnForm);
        const formData: TableReturn = {
            action: action,
            data: returnForm
        }
        onSubmitForm(formData)
    }

    return (
        <div className='w-[30rem]'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center py-4 px-8'>
                <h1 className='text-2xl font-bold text-blue-400'>{title}</h1>

                {dataForm && dataForm.map((form: IDataForm, index: number) => (
                    (form.type == 'text' &&
                        <div key={index} className="w-full my-3">
                            <label className=' text-black ml-2'>{form.label}</label>
                            <input type="text"
                                className={`bg-gray-100 rounded-md w-full h-12 px-2 text-black outline-none border-2 border-solid ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name)} />
                            {errors[form.name]?.message && <p className='text-red-500 text-sm ml-2'>{errors[form.name]?.message}</p>}
                        </div>
                    ) ||
                    (form.type == 'number' &&
                        <div key={index} className="w-full my-3">
                            <label className=' text-black ml-2'>{form.label}</label>
                            <input type="number"
                                className={`bg-gray-100 rounded-md w-full h-12 px-2 text-black outline-none border-2 border-solid ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                                {...register(form.name, {valueAsNumber: true})} />
                            {errors[form.name]?.message && <p className='text-red-500 text-sm ml-2'>{errors[form.name]?.message}</p>}
                        </div>
                    ) ||
                    (form.type == 'select' &&
                        <div key={index} className="w-full my-3 gap-5">
                            <label className=' text-black ml-2'>{form.label}</label>
                            <select
                                {...register(form.name)}
                                className={`bg-gray-100 rounded-md w-full h-12 px-2 text-black outline-none border-2 border-solid ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}  >
                                {form.options?.map((opt: IOptions) => (
                                    <option key={opt.value} value={opt.value} style={optionStyles}>{opt.label}</option>
                                ))}
                            </select>

                            {/* <Select
                            value={2}
                            {...register(form.name)}
                            className={`bg-gray-100 rounded-md w-full h-12 px-2 text-black outline-none border-2 border-solid ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                            >
                                {form.options?.map((opt: IOptions) => (
                                    <MenuItem key={opt.value} value={opt.value} style={optionStyles}>{opt.label}</MenuItem>
                                ))}
                            </Select> */}
                            {errors[form.name]?.message && <p className='text-red-500 text-sm ml-2'>{errors[form.name]?.message}</p>}
                        </div>
                    )
                ))}

                <div className="flex flex-col items-center justify-center ">
                    <ColorButton variant="contained" type='submit' >Enviar</ColorButton>
                </div>
            </form>
        </div>
    )
}
