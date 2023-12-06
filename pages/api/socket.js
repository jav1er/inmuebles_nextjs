import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    //console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send-message", (obj) => {
      //console.log(obj);
      io.emit("receive-message", obj);
    });

    socket.on("send-likes", (obj) => {
      console.log(obj);

      io.emit("receive-likes", obj);
    });
  });

  //console.log("Setting up socket");
  res.end();
}
