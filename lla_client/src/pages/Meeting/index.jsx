import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const Meeting = () => {
  const { meetingId = "" } = useParams();
  /**
   * @type {[React.MutableRefObject<HTMLVideoElement>, React.MutableRefObject<HTMLVideoElement>]}
   */
  const [localVideo, remoteVideo] = [useRef(), useRef()];
  /**
   * @typedef {import('socket.io-client').Socket} Socket
   */
  /**
   * @type {React.MutableRefObject<Socket>}
   */
  const socket = useRef();
  /**
   * @type {React.MutableRefObject<RTCPeerConnection>}
   */
  const peerConnection = useRef();
  /**
   * @type {React.MutableRefObject<MediaStream>}
   */
  const localStream = useRef();
  const [callRunnning, setCallRunning] = useState(false);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SERVER_URL);

    socket.current.on("user-joined", callUser);
    socket.current.on("offer", handleIncomingCall);
    socket.current.on("answer", handleAnswer);
    socket.current.on("ice-candidate", (candidate) => {
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    });
    socket.current.on("user-left", () => {
      toast.warn("Peer just left the meeting");
      setCallRunning(false);
    });

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      socket.current.disconnect(); //! read more
      socket.current.off("connect");
      socket.current.off("disconnect");
    };
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      ?.getUserMedia({ video: true })
      .then((myStream) => {
        localVideo.current.srcObject = myStream;
        localStream.current = myStream;
      })
      .catch((err) => alert(err));
  }, []);

  const createPeer = (userId) => {
    const peerConnection = new RTCPeerConnection({
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
    peerConnection.onicecandidate = (e) => handleIceCandidateEvent(e, userId);
    peerConnection.ontrack = (e) => handleTrackEvent(e);

    return peerConnection;
  };

  const handleTrackEvent = (e) => {
    console.log(e.streams);
    setCallRunning(() => true);
    console.log("handle track");
    remoteVideo.current.srcObject = e.streams[0];
  };

  const callUser = (userId) => {
    console.log("calling");
    peerConnection.current = createPeer(userId);

    localStream.current
      ?.getTracks()
      .forEach((track) =>
        peerConnection.current.addTrack(track, localStream.current)
      );

    peerConnection.current
      .createOffer()
      .then((offer) => {
        peerConnection.current.setLocalDescription(offer);
        socket.current.emit("offer", {
          target: userId,
          caller: socket.current.id,
          sdp: offer,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleIncomingCall = (payload) => {
    console.log("incoming call");
    peerConnection.current = createPeer(payload.caller);
    peerConnection.current
      .setRemoteDescription(new RTCSessionDescription(payload.sdp))
      .then(() => {
        localStream.current
          ?.getTracks()
          .forEach((track) =>
            peerConnection.current.addTrack(track, localStream.current)
          );
      })
      .catch((err) => console.log(err));

    peerConnection.current
      .createAnswer()
      .then((answer) => {
        peerConnection.current.setLocalDescription(answer);
        socket.current.emit("answer", {
          target: payload.caller,
          caller: socket.current.id,
          sdp: answer,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleAnswer = (payload) => {
    console.log("incoming answer");
    toast.success("Peer has joined, if video is not visible click allow in");
    setCallRunning(() => true);

    peerConnection.current
      .setRemoteDescription(new RTCSessionDescription(payload.sdp))
      .catch((err) => console.log(err));
  };

  const handleIceCandidateEvent = (e, target) => {
    if (e.candidate) {
      const payload = {
        target,
        candidate: e.candidate,
      };
      socket.current.emit("ice-candidate", payload);
    }
  };

  const joinMeet = () => {
    socket.current.emit("join-meet", meetingId);
  };

  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-6 mx-auto flex flex-col">
        <div className="lg:w-5/6 mx-auto">
          <h1 className="font-medium text-center mb-2">{meetingId}</h1>
          <div className="rounded-lg h- overflow-hidden max-w-xl mx-auto">
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
              className={`object-cover object-center h-full w-full mx-auto ${
                callRunnning ? "ok" : "w-0"
              }`}
              autoPlay
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/2 text-center sm:pr-2 sm:py-8">
              <div className="w-50 h-60 rounded-full inline-flex items-center justify-center">
                <video
                  ref={localVideo}
                  playsInline
                  autoPlay
                  className="w-50 h-40"
                ></video>
              </div>
              <br />
              <button
                onClick={joinMeet}
                className="border b-2 border-black py-1 px-4"
              >
                {callRunnning ? "Allow In" : "Join Meeting"}
              </button>
            </div>
            <div className="sm:w-1/2 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 px-8 sm:mt-0 text-center sm:text-left bg-slate-100 dark:bg-slate-700">
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  className="w-full text-black pt-auto pl-4 border border-black b-2"
                />
                <button className="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg dark:text-yellow-900 dark:font-medium">
                  Send
                </button>
              </form>
              <div className="mt-2 leading-relaxed text-lg mb-4 min-h-32 max-h-60 overflow-y-auto flex flex-col">
                <span className="mr-auto mt-2 p-2 px-4 bg-yellow-500 text-slate-900 rounded-full">
                  hello
                </span>
                <span className="ml-auto mt-2 p-2 px-4 bg-yellow-500 text-slate-900 rounded-full">
                  hi
                </span>
                <span className="ml-auto mt-2 p-2 px-4 bg-yellow-500 text-slate-900 rounded-full">
                  what will you teach today?
                </span>
                <span className="mr-auto mt-2 p-2 px-4 bg-yellow-500 text-slate-900 rounded-full">
                  hello
                </span>
                <span className="mr-auto mt-2 p-2 px-4 bg-yellow-500 text-slate-900 rounded-full">
                  hello
                </span>
                <span className="ml-auto mt-2 p-2 px-4 bg-yellow-500 text-slate-900 rounded-full">
                  hi
                </span>
                <span className="ml-auto mt-2 p-2 px-4 bg-yellow-500 text-slate-900 rounded-full">
                  what will you teach today?
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Meeting;
