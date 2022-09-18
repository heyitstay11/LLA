import axios from "axios";

export const LoginUser = async (userCredentials = {}) => {
  return axios.post("/auth/login", { ...userCredentials });
};

export const SignUpUser = async (userDetails = {}) => {
  return axios.post("/auth/signup", { ...userDetails });
};
