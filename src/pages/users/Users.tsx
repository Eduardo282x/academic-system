import { useState, useEffect } from "react";
import { getParamsDataApi } from "../../backend/BaseAxios";
import { TableComponent } from "../../components/table/TableComponent";
import { columnsUsers } from "./users.data";
import { IUsers } from "../../interfaces/users.interface";

export const Users = () => {
    const [usersData, setUsersData] = useState<IUsers[]>([]);

    const getStudents = async (params: number) => {
        const rolId = {
            rolId: params
        }
        await getParamsDataApi('users', rolId ).then((response: IUsers[]) => {
            setUsersData(response)
        })
    }

    useEffect(() => {
        // const userInfo: UserData = JSON.parse(String(localStorage.getItem('token')));
        getStudents(1);
        

        setTimeout(() => {
            console.log(usersData);
        }, 1500);
    },[])

    return (
        <div>
            Usuarios
            {usersData.length > 0 && (
                <TableComponent columns={columnsUsers} dataTable={usersData}></TableComponent>
            )}
        </div>
    )
}
