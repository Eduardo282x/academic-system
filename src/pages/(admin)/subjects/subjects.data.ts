import { ConfigTable, IColumns } from "../../../interfaces/table.interface";

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

export const configTableSubjects: ConfigTable = {
    addBtn: false,
    searchInput: false
}