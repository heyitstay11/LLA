import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

let socket;
export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket = io(import.meta.env.VITE_SERVER_URL);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => useContext(SocketContext);
