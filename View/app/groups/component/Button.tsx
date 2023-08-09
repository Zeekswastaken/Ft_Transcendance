
import React from 'react'

interface ButtonStateProps {
    name: string;
    bt_state: boolean;
    onClick: () => void
}

const GroupButton = ({name, bt_state, onClick}: ButtonStateProps) => {
    return (
        <div>
            {bt_state
                    ? <button className='transition ease-in-out delay-150 bg-[#FF1382] border-1 border-[#FFFFFF] text-white py-2 px-4 border border-blue-700 rounded-xl text-[24px] font-bold font-Bomb tracking-[2px]'>{name}</button>
                    : <button onClick={onClick} className='transition ease-in-out delay-150 bg-[#A1216C] border-1 border-[#FFFFFF] text-white py-2 px-4 border border-blue-700 rounded-xl text-[24px] font-bold font-Bomb tracking-[2px]'>{name}</button> }
        </div>
    );
}

export default GroupButton;