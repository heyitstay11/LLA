import { useMemo, useContext, useState, createContext } from "react";

const userData = window.localStorage.getItem("lla_user");
const AuthContext = createContext({});
// const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [auth, setAuthn] = useState(JSON.parse(userData) || {});

  const setAuth = (data) => {
    let authData = { ...data, genAt: Date.now() };
    setAuthn(authData);
    window.localStorage.setItem("lla_user", JSON.stringify(authData));
  };

  const value = useMemo(() => {
    return { auth, setAuth };
  }, [auth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
