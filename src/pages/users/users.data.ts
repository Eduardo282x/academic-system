import { IColumns } from "../../interfaces/table.interface";

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
