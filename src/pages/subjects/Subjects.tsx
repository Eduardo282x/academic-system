import React, { useEffect, useState } from 'react'
import { TableComponent } from '../../components/table/TableComponent';
import { getDataApi } from '../../backend/BaseAxios';
import { columnsSubjects } from './subjects.data';
import { ISubjects } from '../../interfaces/subjects.interface';

export const Subjects = () => {
    const [subjects, setSubjects] = useState<ISubjects[]>([]);

    const getStudents = async () => {
        await getDataApi('subjects',).then((response: ISubjects[]) => {
            setSubjects(response)
        })
    }

    useEffect(() => {
        getStudents();
    },[])

    return (
        <div className="cardDisplayComponent">
            {subjects.length > 0 && (
                <TableComponent title="Materias" columns={columnsSubjects} dataTable={subjects}></TableComponent>
            )}
        </div>
    )
}
