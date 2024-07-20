import React, { useEffect, useState } from 'react'
import { getDataApi } from '../../backend/BaseAxios';
import { ISubjects } from '../../interfaces/subjects.interface';
import './subjects.css';
import { useNavigate } from 'react-router-dom';

export const Subjects = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState<ISubjects[]>([]);

    const getStudents = async () => {
        await getDataApi('subjects',).then((response: ISubjects[]) => {
            setSubjects(response);
        })
    }

    useEffect(() => {
        getStudents();
    }, [])

    return (
        <div className="flex flex-col items-start justify-start gap-5 cardDisplayComponent">
            {subjects.length > 0 && subjects.map((subj: ISubjects) => (

                    <div className={subj.subjectName == 'Geometria' ? 'geometry' : 'other'} onClick={() => navigate('/temas')}>
                        {subj.subjectName !== 'Geometria' && (subj.subjectName)}
                    </div>
            ))}
        </div>
    )
}
