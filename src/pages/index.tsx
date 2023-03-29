import { Canvas } from '@/components/canvas';
import { Chat } from '@/components/chat';
import { useEffect, useState } from 'react';
import { Socket, io } from "socket.io-client";

export default function Home() {
  let [client, setClient] = useState<Socket|null>(null);

  useEffect(() => {
    //await fetch('/api/socketio')
    const socket = io(location.origin, {
      path: "/api/socketio",
      // transports: ["websocket"]
    })
    setClient(socket);
    socket.on("connect", () => {
      console.log("socket 连接成功");
    });
    socket.on("connect_error", (err) => {
      console.log("socket 连接err", err);
    });
  }, [])

  return (
    <>
      <div className='bg-slate-400 h-screen w-screen'>
        <div className='flex h-full p-4 gap-4'>
          <div className='flex-1 rounded bg-slate-100 shadow p-4'>
            <Canvas></Canvas>
          </div>
          <div className='flex-none w-80 rounded bg-slate-100 shadow'>
            <Chat client={client}></Chat>
          </div>
        </div>
      </div>
    </>
  )
}
