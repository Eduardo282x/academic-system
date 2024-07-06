/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../env/axios-instance'
import { BaseResponse, ResponseLogin } from '../interfaces/base-response.interface';

export const getDataApi = (endpoint: string) => {
    return axios.get(endpoint).then((response) => {
        return response.data;
    }).catch(err => {
        return err.response.data;
    })
}

export const getParamsDataApi = (endpoint: string, params: any) => {
    return axios.get(endpoint, {params}).then((response) => {
        return response.data;
    }).catch(err => {
        return err.response.data;
    })
}

export const postDataApi = async (endpoint: string, data: any): Promise<ResponseLogin | BaseResponse | any> => {
    return await axios.post(endpoint, data).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}

export const postFilesDataApi = async (endpoint: string, file: File): Promise<ResponseLogin | BaseResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    return await axios.post(endpoint, formData, { headers: {
        "Content-Type": "multipart/form-data",
    },}).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}

export const putDataApi = async (endpoint: string, data: any): Promise<ResponseLogin | BaseResponse> => {
    return await axios.put(endpoint, data).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}

export const deleteDataApi = async (endpoint: string, data: number): Promise<ResponseLogin | BaseResponse> => {
    return await axios.delete(`${endpoint}/${data}`).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}