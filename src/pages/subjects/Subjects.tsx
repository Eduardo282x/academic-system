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
    },[])

    return (
        <div className="cardDisplayComponent">
            {subjects.length > 0 && (
                <div className='geometry' onClick={() =>navigate('/temas')}>
                </div>
            )}
        </div>
    )
}
