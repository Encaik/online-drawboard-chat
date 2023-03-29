import { NextApiRequest } from "next";
import { Server,Socket } from "socket.io";

const handle = async (req: NextApiRequest, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server,{
      path: "/api/socketio",
    });
    io.on('connection', (socket: Socket) => {
      console.log('user connection');
      socket.on("message", (data) => {
        console.log(data);
        socket.broadcast.emit("message", data)
      });
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    })
    res.socket.server.io = io
  }
  res.end();
};

export default handle;
