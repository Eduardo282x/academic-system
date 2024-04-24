/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITable{
    title: string;
    dataTable: any[];
    columns: IColumns[];
    openForm: (open: TableReturn) => void;
}

export interface TableReturn {
    action: string;
    data: any;
}

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