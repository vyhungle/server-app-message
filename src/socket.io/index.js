export function Socket(io) {
  io.on("connection", (socket) => {
    console.log("User connect id: ", socket.id);
    socket.on("sendMessage", (data) => {
      io.emit("sendMessage",data);
    });
  });
}
