import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

export function Canvas({ client }: { client: Socket | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let w = 0;
    let h = 0;
    if (canvas) {
      canvas.width = w = canvas.clientWidth;
      canvas.height = h = canvas.clientHeight;
      if (!ctx) {
        setCtx(canvas.getContext('2d'))
      }
    }
    client?.on("draw", ({ type, x, y }) => {
      switch (type) {
        case 'begin':
          if (ctx) {
            ctx.fillStyle = '#23a5cd';
            ctx.strokeStyle = '#23a5cd'
            ctx.beginPath();
          }
          break;
        case 'draw':
          ctx?.lineTo(x, y);
          ctx?.stroke();
          break;
      }
    });
    return () => {
      client?.off("draw")
    }
  }, [ctx, client])

  const onMouseDown = (e: any) => {
    const canvas = canvasRef.current;
    canvas?.addEventListener('mousemove', onMouseMove)
    if (ctx) {
      ctx.fillStyle = '#23a5cd';
      ctx.strokeStyle = '#23a5cd'
      ctx.beginPath();
      client?.emit("draw", {
        type: 'begin'
      })
    }
  }

  const onMouseUp = () => {
    const canvas = canvasRef.current;
    canvas?.removeEventListener('mousemove', onMouseMove)
  }

  const onMouseMove = (e: any) => {
    ctx?.lineTo(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop)
    ctx?.stroke();
    client?.emit("draw", {
      type: 'draw',
      x: e.clientX - e.target.offsetLeft,
      y: e.clientY - e.target.offsetTop,
    })
  }

  return (
    <>
      <canvas ref={canvasRef} className="h-full w-full rounded bg-white" onMouseDown={onMouseDown} onMouseUp={onMouseUp}></canvas>
    </>
  )
}