const rooms = {};

/**
 *
 * @param {import('socket.io').Server} io
 */
export const setupSocket = (io) => {
  let room = "";
  io.on("connection", (socket) => {
    socket.on("join room", (roomID) => {
      // console.log(socket.id, roomID);
      if (rooms[roomID]) {
        rooms[roomID].push(socket.id);
      } else {
        rooms[roomID] = [socket.id];
      }
      const otherUser = rooms[roomID].find((id) => id !== socket.id);
      if (otherUser) {
        socket.emit("other user", otherUser);
        socket.to(otherUser).emit("user joined", socket.id);
      }
      socket.join(roomID);
      room = roomID;
    });

    socket.on("offer", (payload) => {
      io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", (payload) => {
      io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", (incoming) => {
      io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });

    socket.on("send-message", ({ user = "", meetingId = "", message = "" }) => {
      io.to(meetingId).emit("message", { user, message });
    });

    socket.on("disconnect", () => {
      // console.log(socket.id, "disconn", room);
      // clean up
      if (!room) return;
      rooms[room] = rooms[room]?.filter((user) => user !== socket.id);
      if (rooms[room]?.length === 0) {
        delete rooms[room];
      }
      socket.broadcast.to(room).emit("user-left", socket.id);
    });
  });
};
