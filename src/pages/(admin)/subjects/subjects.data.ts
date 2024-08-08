import { z } from "zod";
import { ConfigTable, IColumns } from "../../../interfaces/table.interface";
import { IDataForm } from "../../../interfaces/form.interface";
import { ISubjectsApi } from "../../../interfaces/subjects.interface";

export const columnsSubjects: IColumns[] = [
    {
        header: 'Nombre de la materia',
        column: 'subjectName',
        type: 'text',
        filterOption: true,
        width: '40%'
    },
    {
        header: 'Grado',
        column: 'classrooms',
        type: 'text',
        filterOption: true,
        width: '40%'
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

export const body: ISubjectsApi = {
    subjectName: '',
    subjectId: 0,
    classroomId: 0
}

export const validationSubjects: object = z.object({
    subjectName: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    classroomId: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
})

export const dataForm: IDataForm[] = [
    {
        label: 'Nombre de la materia',
        value: '',
        type: 'text',
        name: 'subjectName',
    },
    {
        label: 'Salon',
        value: '',
        type: 'select',
        name: 'classroomId',
        options: []
    }
]

export const configTableSubjects: ConfigTable = {
    addBtn: true,
    searchInput: false
}