export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id, "connected");
    socket.on("disconnect", () => {
      console.log(socket.id, "disconncted");
    });
  });
};
