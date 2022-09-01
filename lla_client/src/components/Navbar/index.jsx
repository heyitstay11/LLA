import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/auth";
const Navbar = () => {
  const { auth = {} } = useAuthContext();

  const normalClass = "mr-5 hover:text-yellow-600 hover:bg-gray-100 p-1";
  const activeClass = "mr-5 text-yellow-600 p-1";

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src="" alt="" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Lingomax</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {auth?.token ? (
            <>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Courses
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                LogIn
              </NavLink>
              <a className="mr-5 hover:text-yellow-600 hover:bg-gray-100 p-1">
                Third Link
              </a>
            </>
          )}
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      <div className="h-0.5 w-100 bg-yellow-500"></div>
    </header>
  );
};

export default Navbar;
