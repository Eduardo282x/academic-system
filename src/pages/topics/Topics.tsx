import React, { useEffect, useState } from 'react'
import { ITopics } from '../../interfaces/topics.interface';
import { getDataApi } from '../../backend/BaseAxios';

export const Topics = () => {
    const [topics, setTopics] = useState<ITopics[]>([]);

    const getTopisc = async () => {
        await getDataApi('/topics').then((responseTopics: ITopics[]) => {
            setTopics(responseTopics)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getTopisc();
    }, [])

    return (
        <div className='cardDisplayComponent'>
            <div className="m-1 w-full h-auto p-2 rounded-xl bg-white text-black">
                {topics && topics.map((top: ITopics, index: number) => (
                    <div key={index}>
                        <p>{top.topicName}</p>
                        <p>{top.topicDescription}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
