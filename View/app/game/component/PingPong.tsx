"use client"
import React, { useRef, useEffect } from 'react'

const drawRectangle = (context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) => {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

const drawCircle = (context: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) => {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

const PingPong = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if(context)
        {
            drawRectangle(context, 0, 0, context.canvas.width, context.canvas.height, "#000000");
            drawCircle(context, 100, 100, 50, "#FFFFFF");
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