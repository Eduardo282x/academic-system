import { useEffect, useState } from "react";
import { getDataApi } from "../../backend/BaseAxios"
import { IUsers } from "../../interfaces/users.interface";
import { TableComponent } from "../../components/table/TableComponent";
import { columnsStudents } from "./students.data";

export const Students = () => {
    const [studentsData, setStudentsData] = useState<IUsers[]>([]);

    const getStudents = async () => {
        await getDataApi('users/students').then((response: IUsers[]) => {
            setStudentsData(response)
        })
    }

    useEffect(() => {
        // const userInfo: UserData = JSON.parse(String(localStorage.getItem('token')));
        getStudents();
        

        setTimeout(() => {
            console.log(studentsData);
        }, 1500);
    },[])

    return (
        <div>
            {studentsData.length > 0 && (
                <div >
                    <TableComponent title="Estudiantes" columns={columnsStudents} dataTable={studentsData}></TableComponent>
                </div>
            )}
        </div>
    )
}
