import { IColumns } from "../../interfaces/table.interface";

export const columnsClassrooms: IColumns[] = [
    {
        header: 'Grado',
        column: 'grade',
        width: '80%',
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
