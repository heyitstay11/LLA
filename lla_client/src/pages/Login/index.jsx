import { NavLink, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { toast } from "react-toastify";
import { initialState, reducer, ACTION_TYPES } from "./reducer";
import { useAuthContext } from "../../context/auth";
import { LoginUser } from "../../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, isLoading } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return toast.error("Please enter Password");
    if (!email) return toast.error("Please enter Email");
    try {
      dispatch({ type: ACTION_TYPES.LOADING, payload: true });
      const response = await LoginUser(state);
      if (response?.data) {
        setAuth(response?.data);
        toast.success("Log in successful");
        navigate("/");
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
      <div className="container md:w-4/5 px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <div className="w-4/5">
            <h1 className="title-font font-medium text-3xl text-gray-900 dark:text-white">
              Knowledge of languages is the doorway to wisdom
            </h1>
            <p className="leading-relaxed mt-4">
              “If you talk to a man in a language he understands, that goes to
              his head. If you talk to him in his language, that goes to his
              heart.”
              <br className="hidden md:inline-block" />― Nelson Mandela
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Log In
          </h2>
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
            Don't have an acount &nbsp;
            <NavLink to={"/signup"} className="text-yellow-600">
              Signup
            </NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
