import { z } from "zod";

export interface UserLogin {
    name: string;
    password: string;
}

export type UserKeys = 'name' | 'password';

export const loginValidationSchame = z.object({
    name: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    password: z.string().min(3, {
        message:'Es muy corta'
    }),
})

export const defaultValues: UserLogin = {
    name: '',
    password: '',
}