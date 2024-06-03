import { UserData } from "../interfaces/base-response.interface";

export const userToken = ():UserData => {
    return JSON.parse(String(localStorage.getItem('token')));
}