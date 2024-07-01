import React, { useEffect, useState } from 'react'
import { TableComponent } from '../../../components/table/TableComponent';
import { getDataApi } from '../../../backend/BaseAxios';
import { columnsSubjects, configTableSubjects } from './subjects.data';
import { ISubjects } from '../../../interfaces/subjects.interface';

export const SubjectsAdmin = () => {
    const [subjects, setSubjects] = useState<ISubjects[]>([]);

    const getStudents = async () => {
        await getDataApi('subjects',).then((response: ISubjects[]) => {
            setSubjects(response)
        })
    }
    
    const voidFunction = (anything: unknown) => {
        console.log(anything);
    }
    useEffect(() => {
        getStudents();
    },[])

    return (
        <div className="cardDisplayComponent">
            {subjects.length > 0 && (
                <TableComponent title="Materias" openForm={voidFunction} configTable={configTableSubjects} columns={columnsSubjects} dataTable={subjects}></TableComponent>
            )}
        </div>
    )
}
