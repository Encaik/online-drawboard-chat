'use client';

import { useEffect, useRef } from "react";

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let ctx = null;
    let w = 0;
    let h = 0;
    if(canvas){
      canvas.width = w = canvas.clientWidth;
      canvas.height = h = canvas.clientHeight;
      ctx = canvas.getContext('2d');
    }
    if(ctx){
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#23a5cd';
      ctx.fillRect(25, 25, 100, 100);
    }
  })
  
  return (
    <>
      <canvas ref={canvasRef} className="h-full w-full rounded"></canvas>
    </>
  )
}