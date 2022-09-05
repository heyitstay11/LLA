import { NavLink, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { initialState, reducer, ACTION_TYPES } from "./reducer";

const Signup = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, email, password, confirmPassword, isLoading } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (password !== confirmPassword)
      return toast.error("Passwords doest not match");
    if (!name.trim()) return toast.error("Fill details properly");
    try {
      dispatch({ type: ACTION_TYPES.LOADING, payload: true });
      const response = await axios.post("/auth/signup", { ...state });
      if (response.data) {
        toast.success("SignIn Successful, Login to continue");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error Occured");
    } finally {
      dispatch({ type: ACTION_TYPES.LOADING, payload: false });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: ACTION_TYPES.INPUT,
      payload: { [name]: value },
    });
  };

  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container md:w-4/5 px-5 py-10 mx-auto flex flex-wrap items-center">
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 mx-auto"
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign Up
          </h2>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Username
            </label>
            <input
              value={name}
              onChange={handleInputChange}
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              value={email}
              onChange={handleInputChange}
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              value={password}
              onChange={handleInputChange}
              type="password"
              id="password"
              name="password"
              minLength={6}
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="confirmPassword"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={handleInputChange}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              minLength={6}
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {isLoading ? (
            <div className="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              <span className="block text-center">Loading ...</span>
            </div>
          ) : (
            <button className="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg dark:text-yellow-900 dark:font-medium">
              Submit
            </button>
          )}
          <p className="text-s text-gray-500 mt-3">
            Already Registered &nbsp;
            <NavLink to={"/login"} className="text-yellow-600">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
