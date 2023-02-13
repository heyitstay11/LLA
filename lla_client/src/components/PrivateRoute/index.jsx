import { useAuthContext } from "../../context/auth";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const {
    auth: { token = "" },
  } = useAuthContext();
  return token ? children : <Navigate to={"/login"} replace />;
};
