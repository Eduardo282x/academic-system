/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITable {
    title: string;
    dataTable: any[];
    columns: IColumns[];
    configTable: ConfigTable;
    openForm: (open: TableReturn) => void;
}

export interface ConfigTable {
    searchInput: boolean;
    addBtn: boolean;
}

export interface TableReturn {
    action: actionsValid;
    data: any;
}

export type actionsValid = 'edit' | 'add' | 'delete' | 'addApi' | 'editApi' | '';

export interface IColumns {
    header: string;
    column: string;
    type: string;
    icon?: string;
    width?: string;
    color?: string;
    action?: string;
    filterOption: boolean;
}