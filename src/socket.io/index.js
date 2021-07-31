export function Socket(io) {
  io.on("connection", (socket) => {
    console.log("User connect id: ", socket.id);
    
    socket.on("sendMessage", (data, room) => {
      socket.to(room).emit("receiveMessage", data);
    });

    socket.on("join-room", (room) => {
      socket.join(room);
    });
  });
}
