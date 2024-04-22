import { useState, useEffect } from "react";
import { getDataApi } from "../../backend/BaseAxios";
import { TableComponent } from "../../components/table/TableComponent";
import { columnsUsers } from "./users.data";
import { IUsers } from "../../interfaces/users.interface";

export const Users = () => {
    const [usersData, setUsersData] = useState<IUsers[]>([]);

    const getStudents = async () => {
        await getDataApi('users/teachers',).then((response: IUsers[]) => {
            setUsersData(response)
        })
    }

    useEffect(() => {
        getStudents();
        
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
