/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableReturn } from "./table.interface";

export interface IForm {
    title: string;
    dataForm: IDataForm[];
    defaultValues: any;
    validationSchema: any;
    action: string;
    keyWordId: string;
    onSubmitForm: (formData: TableReturn) => void;
}

export interface IDataForm {
    label: string;
    value: string;
    type: string;
    name: string;
    options?: IOptions[];
}

export interface IOptions {
    label: string;
    value: string | number;
}