'use client';
import React, { useState } from 'react'
import Image from "next/image";
import DiscutionHeader from './discutionHeader';
import SendMessage from "./sendMessage";
import ChatBox from "./chatBox"
import initialContent, { Content } from './content';

function chatContent() 
{
    const [content, setContent] = useState<content[]>(initialContent);
    const addContent = (newContent: initialContent) => {
        setContent([...content, newContent]);
    }
    return (
        <div className=" relative lg:w-[1200px] md:w-[700px] h-[90%]  m-4 bg-[#321B38] rounded-2xl"> {/* chat*/}
            <DiscutionHeader />
            <ChatBox content={content}/>
            <SendMessage addContent={addContent}/>
        </div>
        );
}

export default chatContent