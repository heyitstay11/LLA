import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
/**
 * @type {import('socket.io-client').Socket}
 */
let socket;
export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket = io(import.meta.env.VITE_SERVER_URL);

    return () => {
      socket.disconnect(); //! read more
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
