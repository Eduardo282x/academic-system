/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseResponse } from "../interfaces/base-response.interface"
import { actionsValid } from "../interfaces/table.interface"
import { postDataApi, putDataApi, deleteDataApi } from "./BaseAxios"

export interface BaseApiReturn {
    close: boolean,
    open: boolean,
    body: object,
    title: string,
    action: actionsValid,
    // data: any
}

export const BaseApi = async (action: actionsValid, data: any, body: any, keyWord: string, urlComponent: string): Promise<BaseApiReturn> => {

    const response: BaseApiReturn = {
        close: false,
        open: false,
        body: {},
        title: '',
        action: '',
    };
    
    response.body = action === 'edit' ? data : body
    response.title = action === 'edit' ? 'Actualizar' : 'Agregar';
    response.action = action === 'edit' ? 'editApi' : 'addApi';
    if (action === 'add' || action === 'edit') {
        response.open = true
    }

    if (action === 'delete') {
        await deleteApi(urlComponent, data, keyWord)
    }

    if (action == 'addApi') {
        await addApi(urlComponent, data)
        response.close = true;
    }
    if (action == 'editApi') {
        await updateApi(urlComponent, data)
        response.close = true;
    }

    return response;
}

const addApi = async (url: string, newData: any) => {
    await postDataApi(url, newData).then((response: BaseResponse) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    })
}
const updateApi = async (url: string, updateData: any) => {
    await putDataApi(url, updateData).then((response: BaseResponse) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    })
}
const deleteApi = async (url: string, deleteData: any, keyWord: string) => {
    await deleteDataApi(url, deleteData[keyWord]).then((response: BaseResponse) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    })
}