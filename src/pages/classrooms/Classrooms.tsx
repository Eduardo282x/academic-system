import React, { useEffect, useState } from 'react'
import { getDataApi } from '../../backend/BaseAxios';
import { TableComponent } from '../../components/table/TableComponent';
import { columnsClassrooms } from './classrooms.data';
import { IClassrooms } from '../../interfaces/classrooms.interface';

export const Classrooms = () => {
    const [classrooms, setClassrooms] = useState<IClassrooms[]>([]);

    const getStudents = async () => {
        await getDataApi('classrooms',).then((response: IClassrooms[]) => {
            setClassrooms(response)
        })
    }

    useEffect(() => {
        getStudents();
    },[])

    return (
        <div className="cardDisplayComponent">
            {classrooms.length > 0 && (
                <TableComponent title="Salones" columns={columnsClassrooms} dataTable={classrooms}></TableComponent>
            )}
        </div>
    )
}
