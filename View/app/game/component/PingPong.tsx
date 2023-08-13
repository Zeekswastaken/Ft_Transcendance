"use client"
import React, { useRef, useEffect } from 'react'
import { render, initVars } from './render';


const game = (context: CanvasRenderingContext2D) => {
    const FPS = 60;
    setInterval(() => render(context), 1000/ FPS);
}

const PingPong = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if(context)
        {
            initVars(context);
            game (context);
        }
    }, []);
    return (
        <div className='border-[2px] border-gray w-fit'>
            <canvas ref={canvasRef} width={1200} height={600} >

            </canvas>
        </div>
    );
}

export default PingPong;