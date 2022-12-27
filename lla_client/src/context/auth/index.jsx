import { useMemo, useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const userData = window.localStorage.getItem("lla_user");
const AuthContext = createContext({});
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuthn] = useState(JSON.parse(userData) || {});

  if (auth.token && Date.now() - auth.genAt > 6 * MILLISECONDS_IN_A_DAY) {
    navigate("/login");
    toast("Log in again to proceed");
  }

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
