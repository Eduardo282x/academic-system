import { z } from "zod";
import { IDataForm } from "../../../interfaces/form.interface";
import { IColumns, ConfigTable } from "../../../interfaces/table.interface";
import { IUsers } from "../../../interfaces/users.interface";

export const columnsStudents: IColumns[] = [
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
        header: 'Salon',
        column: 'classrooms',
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
    userId: 0,
    name: '',
    lastname: '',
    username: '',
    email: '',
    age: '',
    classroomId: 0,
}

export const validationStudents: object = z.object({
    name: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    lastname: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    username: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    email: z.string().email({message:'Debe ingresar un correo electronico valido'}),
    age: z.number().max(100, {message: 'La edad no puede ser mayor a 100'}),
    classroomId: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
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
        label: 'Salón',
        value: '',
        type: 'select',
        name: 'classroomId',
    },
]

export const configTableStudents: ConfigTable = {
    addBtn: true,
    searchInput: true
}