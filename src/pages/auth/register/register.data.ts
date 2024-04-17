import { z } from "zod";

export interface UserRegister {
    name: string;
    lastname: string;
    username: string;
    email: string;
    age: string;
    password: string;
}

export interface Form {
    label: string;
    name: string;
    type: string;
}

export const registerForm: Form[] = [
    {
        name: 'name',
        label: 'Nombre',
        type: 'text'
    },
    {
        name: 'lastname',
        label: 'Apellido',
        type: 'text'
    },
    {
        name: 'username',
        label: 'Nombre de usuario',
        type: 'text'
    },
    {
        name: 'email',
        label: 'Correo',
        type: 'text'
    },
    {
        name: 'age',
        label: 'Edad',
        type: 'text'
    },
    {
        name: 'password',
        label: 'Contraseña',
        type: 'password'
    },
    {
        name: 'confirmPassword',
        label: 'Confirmar contraseña',
        type: 'password'
    }
];

export type RegisterKeys = 'name' | 'password' | 'lastname' | 'username' | 'email' | 'age';

export const validationSchema = z.object({
    name: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    lastname: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    username: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    email: z.string().email({message: 'El Correo es requerido'}),
    age: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    password: z.string().min(8, {message:'Es muy corta'}),
    confirmPassword: z.string().min(8, {message:'Es muy corta x2'}),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñan no coinciden',
    path: ['confirmPassword']
})

export const defaultValues: UserRegister = {
    name: '',
    password: '',
    lastname: '',
    username: '',
    email: '',
    age: '',
}