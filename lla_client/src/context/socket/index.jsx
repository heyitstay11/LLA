import { useState } from "react";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
/**
 * @type {import('socket.io-client').Socket}
 */
let socket;
export const SocketProvider = ({ children }) => {
  const peer = useRef(null);
  const myVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [remoteUser, setRemoteUser] = useState("");
  const myVideoStream = useRef(null);
  useEffect(() => {
    socket = io(import.meta.env.VITE_SERVER_URL);

    socket.on("user-joined", callUser);
    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleICECandidateMsg);

    return () => {
      socket.disconnect(); //! read more
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-joined");
      socket.off("connect");
      socket.off("disconnect");
      peer.current?.close();
    };
  }, []);

  const createPeer = (userId) => {
    const newPeer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    newPeer.onicecandidate = handleICECandidateEvent;
    newPeer.ontrack = handleTrackEvent;
    newPeer.onnegotiationneeded = () => handleNegotiationNeededEvent(userId);

    return newPeer;
  };

  const handleNegotiationNeededEvent = (userId) => {
    console.log("offer");
    peer.current
      .createOffer()
      .then((offer) => {
        return peer.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userId,
          caller: socket.id,
          sdp: peer.current.localDescription,
        };
        socket.emit("offer", payload);
      })
      .catch((err) => console.log(err));
  };

  const handleOffer = (incoming) => {
    console.log("recieve");
    setRemoteUser(incoming.caller);
    peer.current = createPeer(incoming.target);
    const desc = new RTCSessionDescription(incoming.sdp);
    peer.current
      .setRemoteDescription(desc)
      .then(() => {
        myVideoStream.current
          .getTracks()
          .forEach((track) =>
            peer.current.addTrack(track, myVideoStream.current)
          );
      })
      .then(() => {
        return peer.current.createAnswer();
      })
      .then((answer) => {
        return peer.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socket.id,
          sdp: peer.current.localDescription,
        };
        socket.emit("answer", payload);
      })
      .catch((err) => console.log(err));
  };

  const handleAnswer = (message) => {
    console.log("answer");
    const desc = new RTCSessionDescription(message.sdp);
    peer.current.setRemoteDescription(desc).catch((err) => console.log(err));
  };

  const handleICECandidateEvent = (e) => {
    console.log("ice-event");
    if (e.candidate && remoteUser) {
      const payload = {
        target: remoteUser,
        candidate: e.candidate,
      };
      socket.emit("ice-candidate", payload);
    }
  };

  const handleICECandidateMsg = (incoming) => {
    console.log("ice-msg");
    const candidate = new RTCIceCandidate(incoming);
    peer.current.addIceCandidate(candidate).catch((err) => console.log(err));
  };

  const handleTrackEvent = (e) => {
    remoteVideoRef.current.srcObject = e.streams[0];
  };

  const callUser = (userId) => {
    peer.current = createPeer(userId);
    setRemoteUser(userId);
    myVideoStream.current
      .getTracks()
      .forEach((track) => peer.current.addTrack(track, myVideoStream.current));
  };

  const joinMeet = (meetingId) => {
    socket.emit("join-meet", meetingId);
  };

  const value = useMemo(() => {
    return { joinMeet, myVideoRef, remoteVideoRef, myVideoStream, remoteUser };
  }, [socket, remoteUser]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
