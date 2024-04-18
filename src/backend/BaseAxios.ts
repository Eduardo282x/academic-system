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

export const postDataApi = async (endpoint: string, data: any): Promise<ResponseLogin | BaseResponse> => {
    return await axios.post(endpoint, data).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}