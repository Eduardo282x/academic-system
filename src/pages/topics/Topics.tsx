import React, { useEffect, useState } from 'react'
import { ITopics } from '../../interfaces/topics.interface';
import { getDataApi } from '../../backend/BaseAxios';
import './topics.css';
import { Button, Divider } from '@mui/material';
import { UserData } from '../../interfaces/base-response.interface';
import { userToken } from '../../backend/authenticate';
export const Topics = () => {
    const [topics, setTopics] = useState<ITopics[]>([]);
    const [showBtnAdd, setShowBtnAdd] = useState<boolean>(false);

    const getTopics = async () => {
        await getDataApi('/topics').then((responseTopics: ITopics[]) => {
            setTopics(responseTopics)
        }).catch((err) => console.log(err))
    }

    const validateRol = () => {
        const user: UserData = userToken();
        if (user.roles !== "Estudiante") {
            setShowBtnAdd(true)
        }
    }

    useEffect(() => {
        getTopics();
        validateRol();
    }, [])


    return (
        <div className='cardDisplayComponent'>
            <div className="m-1 w-full h-auto p-2 rounded-xl bg-white text-black">
                <div className='mb-2'>
                    {topics && topics.map((top: ITopics, index: number) => (
                        <div key={index}>
                            <div className="py-4">
                                <p className='text-2xl pl-2 underline mb-2'>{top.topicName}</p>
                                <p className='pl-4 leading-5'>{top.topicDescription}</p>
                            </div>
                            <Divider />
                        </div>
                    ))}
                </div>

                {showBtnAdd &&
                    <div className='w-full flex items-center justify-center'>
                        <Button variant="contained">Agregar nuevo</Button>
                    </div>
                }
            </div>
        </div>
    )
}
