'use client';

import React, { useState } from 'react'
import Image from "next/image";
import SendMessage from "./sendMessage"
import SendButton from './SendButton';
import initialContent, { Content } from './content';


interface addContentProps {
    addContent: (newContent :initialContent) => void;
 }

const sendMessage = ({addContent}: addContentProps) => {
    const [value, setValue] = useState("");
    const submitSendMessage= (e) => 
    {
        e.preventDefault();
        if (value.trim() != "")
        {
            const newContent: initialContent = {
                id: Math.floor(Math.random() * 1000000),
                text: value,
            };
            addContent(newContent);
            setValue("");
        }
    }
    const handlSendMessage= (e) => 
    {
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            if (value.trim() != "")
            {
                const newContent: initialContent = {
                    id: Math.floor(Math.random() * 1000000),
                    text: value,
                };
                addContent(newContent);
            setValue("");
            }
        }
    }
    return (
        <div>
            <div className="flex justify-center absolute bottom-3 w-full h-16">
                <div className="flex flex-row relative bottom-0 rounded-lg w-[90%] h-full bg-[#4F2150]">
                    <form onSubmit={submitSendMessage} onKeyDown={handlSendMessage}>
                        <Image src="/imogi.png" width={35} height={35} alt="icon" className="absolute mx-1 left-1 bottom-4 space-y-2" />
                        <textarea value = {value} onChange={e => setValue(e.target.value)} type="text" className=" my-1 py-4 resize-none text-white absolute w-[70%] px-10 h-[90%] bg-[#4F2150] rounded-md focus:outline-none left-16 scrollbar-hide" placeholder="Type here ..."></textarea>

                        {/* <textarea id="chat" rows="1" class=" absolute w-[70%] px-10 h-full mx-4 text-sm text-gray-900 rounded-md bg-[#4F2150] focus:outline-none left-16" placeholder="Type here ..."></textarea> */}
                        <Image src="/icons.png" width={35} height={35} alt="icon" className="absolute mx-4 right-20 bottom-3" />
                        <SendButton />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default sendMessage