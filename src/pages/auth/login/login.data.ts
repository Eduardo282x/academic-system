import { z } from "zod";

export interface UserLogin {
    username : string;
    password: string;
}

export type UserKeys = 'username' | 'password';

export const loginValidationSchame = z.object({
    username : z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    password: z.string().min(3, {
        message:'Es muy corta'
    }),
})

export const defaultValues: UserLogin = {
    username : '',
    password: '',
}