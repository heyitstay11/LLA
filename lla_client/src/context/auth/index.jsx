import { useMemo, useContext, useState, createContext } from "react";

const userData = window.localStorage.getItem("lla_user");
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuthn] = useState(JSON.parse(userData) || {});

  const setAuth = (data) => {
    setAuthn(data);
    window.localStorage.setItem("lla_user", JSON.stringify(data));
  };

  const value = useMemo(() => {
    return { auth, setAuth };
  }, [auth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
