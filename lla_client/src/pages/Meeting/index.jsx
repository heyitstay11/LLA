import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const Meeting = () => {
  const { meetingId = "" } = useParams();
  const myVideo = useRef();
  const remoteVideo = useRef();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const userStream = useRef();
  const senders = useRef([]);
  const [callRunnning, setCallRunning] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        myVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current = io.connect(import.meta.env.VITE_SERVER_URL);

        socketRef.current.on("other user", (userID) => {
          callUser(userID);
          otherUser.current = userID;
        });

        socketRef.current.on("user joined", (userID) => {
          otherUser.current = userID;
        });

        socketRef.current.on("offer", handleRecieveCall);

        socketRef.current.on("answer", handleAnswer);

        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

        socketRef.current.on("message", handleMessage);

        socketRef.current.on("user-left", () => {
          toast.warn("Peer just left the meeting");
          setCallRunning(false);
        });
      });

    return () => {
      if (peerRef.current) {
        peerRef.current.close();
      }
      socketRef.current.disconnect(); //! read more
      socketRef.current.off("connect");
      socketRef.current.off("disconnect");
    };
  }, []);

  const joinRoom = () => {
    socketRef.current.emit("join room", meetingId);
  };

  function callUser(userID) {
    peerRef.current = createPeer(userID);
    userStream.current
      .getTracks()
      .forEach((track) =>
        senders.current.push(
          peerRef.current.addTrack(track, userStream.current)
        )
      );
  }

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
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

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            senders.current.push(
              peerRef.current.addTrack(track, userStream.current)
            )
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("answer", payload);
      });
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
    setCallRunning(true);
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    setCallRunning(true);
    remoteVideo.current.srcObject = e.streams[0];
  }

  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
      const screenTrack = stream.getTracks()[0];
      console.log(senders);
      senders.current
        ?.find((sender) => sender.track.kind === "video")
        ?.replaceTrack(screenTrack);
      screenTrack.onended = function () {
        senders.current
          ?.find((sender) => sender.track.kind === "video")
          ?.replaceTrack(userStream.current.getTracks()[1]);
      };
    });
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e?.currentTarget?.["message-input"]?.value;
    if (!message.trim()) return;
    socketRef.current.emit("send-message", {
      user: socketRef.current.id,
      meetingId,
      message,
    });
  };

  const handleMessage = ({ user, message }) => {
    setMessages((prev) => [{ user, message }, ...prev]);
  };

  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-6 mx-auto flex flex-col">
        <div className="lg:w-5/6 mx-auto">
          <div className="rounded-lg overflow-hidden max-w-lg mx-auto">
            {!callRunnning && (
              <img
                alt=""
                src="https://dummyimage.com/400x400?text=waiting+for+user"
                className="object-cover object-center h-60 w-full mx-auto"
                autoPlay
              />
            )}
            <video
              ref={remoteVideo}
              className={`${
                callRunnning
                  ? "object-cover object-center h-full w-full mx-auto"
                  : "sr-only"
              }`}
              autoPlay
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/2 text-center sm:pr-2 sm:py-8">
              <div className="w-50 h-60 rounded-full inline-flex items-center justify-center">
                <video
                  ref={myVideo}
                  playsInline
                  autoPlay
                  muted={true}
                  className="w-50 h-40"
                ></video>
              </div>
              <br />
              <button
                onClick={joinRoom}
                className="border b-2 border-black py-1 px-4"
              >
                Join Meeting
              </button>
              {callRunnning && (
                <button
                  onClick={shareScreen}
                  className="border b-2 border-black py-1 px-4"
                >
                  Share Screen
                </button>
              )}
            </div>
            <div className="sm:w-1/2 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 px-8 sm:mt-0 text-center sm:text-left bg-slate-100 dark:bg-slate-700">
              <form className="flex" onSubmit={handleSendMessage}>
                <input
                  name="message-input"
                  type="text"
                  className="w-full text-black pt-auto pl-4 border border-black b-2"
                />
                <button className="dark:text-white text-black bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg dark:text-yellow-900 dark:font-medium">
                  Send
                </button>
              </form>
              <div className="mt-2 leading-relaxed text-lg mb-4 min-h-32 max-h-60 overflow-y-auto flex flex-col">
                {messages?.length === 0 && (
                  <span className="mr-auto mt-2 p-2 px-4 bg-yellow-500 text-slate-900 rounded-full">
                    No Messages{" "}
                  </span>
                )}
                {messages?.map((msg, index) => {
                  const { user, message } = msg;
                  const isMine = user === socketRef.current.id;
                  return (
                    <span
                      key={index}
                      className={`${
                        isMine ? "ml-auto" : "mr-auto"
                      } mt-2 p-2 px-4 bg-yellow-500 text-slate-900 rounded-full`}
                    >
                      {message}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Meeting;
