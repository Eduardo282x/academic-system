/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, useFormState } from 'react-hook-form';
import { IDataForm, IForm, IOptions } from '../../interfaces/form.interface'
import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { TableReturn } from '../../interfaces/table.interface';
import { ColorButton } from '../buttonCustom/ButtonCustom';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import './form.css'

type Keys = 'classroomId' | 'userId' | 'id';

export const FormComponent: FC<IForm> = ({ title, dataForm, defaultValues, keyWordId, validationSchema, action, onSubmitForm }) => {

    const { register, control, handleSubmit, formState: { errors } } = useForm<any>({
        defaultValues,
        resolver: zodResolver(validationSchema),
        mode: 'onChange'
    });

    const {isValid} = useFormState({control});

    const onSubmit = (returnForm: any) => {
        returnForm[keyWordId] = defaultValues[keyWordId as Keys];
        const formData: TableReturn = {
            action: action,
            data: returnForm
        }

        console.log(formData);
        
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
                                // value={defaultValues[form.name]}
                                {...register(form.name)}
                                className={`bg-gray-100 rounded-md w-full h-12 px-2 text-black outline-none border-2 border-solid ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500 selectOption`}  >
                                {form.options?.map((opt: IOptions) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>

                            {/* <Select
                            {...register(form.name)}
                            className={`bg-gray-100 rounded-md w-full h-12 px-2 text-black outline-none border-2 border-solid ${errors[form.name]?.message ? 'border-red-500' : 'border-blue-200'} focus:border-blue-500`}
                            >
                                {form.options?.map((opt: IOptions) => (
                                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                ))}
                            </Select> */}
                            {errors[form.name]?.message && <p className='text-red-500 text-sm ml-2'>{errors[form.name]?.message}</p>}
                        </div>
                    )
                ))}

                <div className="flex flex-col items-center justify-center ">
                    <ColorButton variant="contained" type='submit' disabled={!isValid}>Enviar</ColorButton>
                </div>
            </form>
        </div>
    )
}
