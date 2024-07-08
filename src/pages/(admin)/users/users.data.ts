import { z } from "zod";
import { IDataForm } from "../../../interfaces/form.interface";
import { IColumns, ConfigTable } from "../../../interfaces/table.interface";
import { IUsers } from "../../../interfaces/users.interface";

export const columnsUsers: IColumns[] = [
    {
        header: 'Nombre',
        column: 'name',
        type: 'text',
        filterOption: true
    },
    {
        header: 'Apellido',
        column: 'lastname',
        type: 'text',
        filterOption: true
    },
    {
        header: 'Usuario',
        column: 'username',
        type: 'text',
        filterOption: true
    },
    {
        header: 'Edad',
        column: 'age',
        type: 'text',
        filterOption: true
    },
    {
        header: 'Cedula',
        column: 'identify',
        type: 'text',
        filterOption: true
    },
    {
        header: 'Editar',
        column: 'edit',
        type: 'icon',
        action: 'edit',
        color: 'text-blue-500',
        icon: 'edit',
        filterOption: false
    },
    {
        header: 'Eliminar',
        column: 'delete',
        type: 'icon',
        action: 'delete',
        color: 'text-red-500',
        icon: 'delete',
        filterOption: false
    }
];

export const body: IUsers = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    age: '',
    identify: '',
}

export const validationUsers: object = z.object({
    name: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    lastname: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    username: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    email: z.string().email({message: 'El correo es requerido'}),
    age: z.number().max(100, {message: 'La edad no puede ser mayor a 100'}),
    identify: z.string().refine(text => text.length <= 8 , {message: 'La cedula no puede tener más de 8 caracteres'}),
})

export const dataForm: IDataForm[] = [
    {
        label: 'Nombre',
        value: '',
        type: 'text',
        name: 'name',
    },
    {
        label: 'Apellido',
        value: '',
        type: 'text',
        name: 'lastname',
    },
    {
        label: 'Nombre de usuario',
        value: '',
        type: 'text',
        name: 'username',
    },
    {
        label: 'Correo',
        value: '',
        type: 'text',
        name: 'email',
    },
    {
        label: 'Edad',
        value: '',
        type: 'number',
        name: 'age',
    },
    {
        label: 'Cedula',
        value: '',
        type: 'text',
        name: 'identify',
    }
]


export const configTableUsers: ConfigTable = {
    addBtn: true,
    searchInput: true
}