import { z } from "zod";
import { IClassrooms } from "../../../interfaces/classrooms.interface";
import { IDataForm } from "../../../interfaces/form.interface";
import { IColumns, ConfigTable } from "../../../interfaces/table.interface";

export const columnsClassrooms: IColumns[] = [
    {
        header: 'Grado',
        column: 'grade',
        width: '80%',
        type: 'text',
        filterOption: true
    }
    // {
    //     header: 'Editar',
    //     column: 'edit',
    //     type: 'icon',
    //     action: 'edit',
    //     color: 'text-blue-500',
    //     icon: 'edit',
    //     filterOption: false
    // },
    // {
    //     header: 'Eliminar',
    //     column: 'delete',
    //     type: 'icon',
    //     action: 'delete',
    //     color: 'text-red-500',
    //     icon: 'delete',
    //     filterOption: false
    // }
];

export const body: IClassrooms = {
    grade: '',
    classroomId: 1
}

export const validationClassrooms: object = z.object({
    grade: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
})

export const dataForm: IDataForm[] = [
    {
        label: 'Salón',
        value: '',
        type: 'text',
        name: 'grade',
    },
]

export const configTableClassrooms: ConfigTable = {
    addBtn: true,
    searchInput: false
}

