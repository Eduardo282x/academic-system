/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeysForms } from "../components/form/formComponent";
import { actionsValid, TableReturn } from "./table.interface";

export interface IForm {
    title: string;
    dataForm: IDataForm[];
    defaultValues: any;
    validationSchema: any;
    action: actionsValid;
    keyWordId: KeysForms;
    onSubmitForm: (formData: TableReturn) => void;
}

export interface IDynamicForm {
    [key: string] : string;
}

export interface IDataForm {
    label: string;
    value: string;
    type: TypesInputs;
    name: string;
    options?: IOptions[];
}

export type TypesInputs = 'text' | 'number' | 'select' | 'textArea';

export interface IOptions {
    label: string;
    value: string | number;
}