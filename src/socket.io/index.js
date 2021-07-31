export function Socket(io) {
  io.on("connection", (socket) => {
    // console.log("user connect: ", socket.id);
    socket.on("sendMessage", (data, room, userId) => {
      socket.to(room).emit("receiveMessage", data, userId);
    });

    socket.on("join-room", (room) => {
      socket.join(room);
    });

    socket.on("disconnect", () => {
      console.log("user disconnect");
    });
  });
}
