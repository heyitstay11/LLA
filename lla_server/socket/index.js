const meetings = {};

/**
 *
 * @param {import('socket.io').Server} io
 */
export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    const socketId = socket.id;
    let meeting = "";
    console.log(socketId, "conn");

    socket.on("join-meet", (meetingId = "") => {
      console.log(meetingId, "hello", meetings);
      if (meetingId && meetings[meetingId]) {
        meetings[meetingId].push(socketId);
      } else {
        meetings[meetingId] = [socketId];
      }
      socket.join(meetingId);
      meeting = meetingId;
      socket.broadcast.to(meetingId).emit("user-joined", socketId);
    });

    socket.on("offer", (payload = {}) => {
      console.log("offer", meeting, "meet");
      io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", (payload = {}) => {
      console.log("ans", meeting, "meet");
      io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", (incoming = {}) => {
      console.log(incoming.target, "ice");
      io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });

    socket.on("disconnect", () => {
      console.log(socketId, "disconn", meeting);
      // clean up
      meetings[meeting]?.filter((user) => user !== socketId);
      socket.broadcast.to(meeting).emit("user-left", socketId);
    });
  });
};
