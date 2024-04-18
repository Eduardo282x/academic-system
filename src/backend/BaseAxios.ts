import axios from '../env/axios-instance'
import { BaseResponse, ResponseLogin } from '../interfaces/base-response.interface';

export const getDataApi = (endpoint: string) => {
    return axios.get(endpoint).then((response) => {
        return response.data.response;
    }).catch(err => {
        console.log(err);
        return err;
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postDataApi = async (endpoint: string, data: any): Promise<ResponseLogin | BaseResponse> => {
    return await axios.post(endpoint, data).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data;
    })
}