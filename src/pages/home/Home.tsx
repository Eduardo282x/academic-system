import React from 'react'
import { IMenu, menu } from '../layout/menu.data'

export const Home = () => {
    return (
        <div className='w-full h-full flex items-start justify-start p-8'>
            <div className="flex items-center justify-around gap-5 flex-wrap">
                {menu.map((card: IMenu, index: number) => (
                    <div key={index} className={`flex ${card.color} p-5 rounded-xl cursor-pointer`} >
                        <span className="material-icons mr-2 text-[3rem]">{card.icon}</span>
                        <p className='text-[2rem]'>{card.title}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
