/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

export const InputCustom: FC<InputCustomInterface> = ({onChangeOuput, iconLeft, icon, placeholder}) => {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueInput = event.target.value;
        onChangeOuput(valueInput);
    }

    return (
        <div className={`flex items-center justify-between ${iconLeft ? '' : 'flex-row-reverse'} rounded-lg bg-gray-900 h-12 w-full`}>
            <input placeholder={placeholder} onChange={onChange} type="text" className="text-white p-2 bg-transparent outline-none w-[85%] h-full"/>
            <span className="material-icons mr-[4%] -ml-[4%]">{icon}</span>
        </div>
    )
}

interface InputCustomInterface {
    placeholder: string;
    onChangeOuput: any;
    iconLeft: boolean;
    icon: string;
}