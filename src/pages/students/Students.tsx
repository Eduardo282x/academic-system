import { useEffect, useState } from "react";
import { getParamsDataApi } from "../../backend/BaseAxios"
import { IUsers } from "../../interfaces/users.interface";
import { TableComponent } from "../../components/table/TableComponent";
import { columnsStudents } from "./students.data";

export const Students = () => {
    const [studentsData, setStudentsData] = useState<IUsers[]>([]);

    const getStudents = async (params: number) => {
        const rolId = {
            rolId: params
        }
        await getParamsDataApi('users/students', rolId ).then((response: IUsers[]) => {
            setStudentsData(response)
        })
    }

    useEffect(() => {
        // const userInfo: UserData = JSON.parse(String(localStorage.getItem('token')));
        getStudents(2);
        

        setTimeout(() => {
            console.log(studentsData);
        }, 1500);
    },[])

    return (
        <div>
            Students
            {studentsData.length > 0 && (
                <div >
                    <TableComponent columns={columnsStudents} dataTable={studentsData}></TableComponent>
                </div>
            )}
        </div>
    )
}
