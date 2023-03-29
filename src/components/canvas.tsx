import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

export function Canvas({client}:{client:Socket|null}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let [ctx, setCtx] = useState<CanvasRenderingContext2D|null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let w = 0;
    let h = 0;
    if(canvas){
      canvas.width = w = canvas.clientWidth;
      canvas.height = h = canvas.clientHeight;
      if(!ctx){
        setCtx(canvas.getContext('2d'))
      }
    }
    client?.on("draw", ({x,y,w,h}) => {
      if(ctx){
        ctx.fillStyle = '#23a5cd';
        ctx.fillRect(x, y, w, h);
      }
    });
    return () => {
      client?.off("draw")
    }
  },[ctx,client])

  const onMouseDown = (e:any) => {
    if(ctx){
      ctx.fillStyle = '#23a5cd';
      ctx.fillRect(e.clientX-e.target.offsetLeft, e.clientY-e.target.offsetTop, 100, 100);
      client?.emit("draw",{
        x:e.clientX-e.target.offsetLeft,
        y:e.clientY-e.target.offsetTop,
        w:100,
        h:100
      })
    }
  }
  
  return (
    <>
      <canvas ref={canvasRef} className="h-full w-full rounded bg-white" onMouseDown={onMouseDown}></canvas>
    </>
  )
}