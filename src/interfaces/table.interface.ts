/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITable{
    dataTable: any[];
    columns: IColumns[];
}

export interface IColumns {
    header: string;
    column: string;
    type: string;
    filterOption: boolean;
}