import React from 'react'
import Image from "next/image";

const discutionHeader = () => {
    return (
        <div>
            <div className="relative w-1112 h-[80px] flex-shrink-0 rounded-tl-xl rounded-tr-xl rounded-br-0 rounded-bl-0 bg-[#2D0130] ">
                <Image src="/vector.svg" width={40} height={40} alt="icon" className="absolute mx-4 right-2 bottom-8" />
                <Image src="/Ellipse.png" width={50} height={50} alt="pic" className="absolute mx-4 left-0 bottom-4" />
                <h1 className=" absolute chat_text_username bottom-7 left-20">Judith</h1>
                <p className=" absolute chat_text_p bottom-3 left-20">judith juanita</p>
            </div>
        </div>
    )
}

export default discutionHeader