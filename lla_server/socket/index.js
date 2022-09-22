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

    socket.on("send-message", ({ user = "", meetingId = "", message = "" }) => {
      io.to(meetingId).emit("message", { user, message });
    });

    socket.on("join-meet", (meetingId = "") => {
      if (meetingId && meetings[meetingId]) {
        meetings[meetingId].push(socketId);
        meetings[meetingId] = [...new Set(meetings[meetingId])];
      } else {
        meetings[meetingId] = [socketId];
      }
      socket.join(meetingId);
      meeting = meetingId;
      socket.broadcast.to(meetingId).emit("user-joined", socketId);
      console.log(meetingId, "hello", meetings);
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
      if (!meeting) return;
      meetings[meeting] = meetings[meeting]?.filter(
        (user) => user !== socketId
      );
      if (meetings[meeting]?.length === 0) {
        delete meetings[meeting];
      }
      socket.broadcast.to(meeting).emit("user-left", socketId);
      console.log(meetings);
    });
  });
};
