import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/auth";
import { useThemeContext } from "../../context/theme";

const Navbar = () => {
  const { auth = {}, setAuth } = useAuthContext();
  const { theme, updateTheme } = useThemeContext();

  const normalClass =
    "mr-5 hover:text-yellow-600 hover:bg-gray-100 dark:hover:bg-slate-100 p-1";
  const activeClass = "mr-5 text-yellow-600 p-1";

  const handleThemeToggle = () => {
    if (theme === "dark") return updateTheme("light");

    updateTheme("dark");
  };
  return (
    <header className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img
            src="/lm.png"
            alt=""
            className={`w-20 h-15 text-white p-2  rounded-full ${
              theme !== "dark" ? "darklogo" : ""
            }`}
          />
          <span className="ml-3 text-xl dark:text-white">LingoMax</span>
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {auth?.token ? (
            <>
              <NavLink
                to={"/mycourse"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to={"/courses"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                <span className="underline">Courses</span>
              </NavLink>
              <NavLink
                to={"/quiz"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                <span className="underline">Quiz</span>
              </NavLink>
              <NavLink
                to={"/qna"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                <span className="underline">QNA</span>
              </NavLink>
              <button
                className={normalClass}
                onClick={() => {
                  setAuth({});
                  window.location.href = "/";
                }}
              >
                Log Out
              </button>
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
                to={"/courses"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Courses
              </NavLink>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                LogIn
              </NavLink>
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Contact
              </NavLink>
            </>
          )}
          <button
            onClick={handleThemeToggle}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0 dark:bg-slate-700 dark:hover:bg-slate-500"
          >
            <span className="hidden  md:inline">
              {" "}
              {theme === "dark" ? "Light" : "Dark"}{" "}
            </span>
            {theme === "dark" ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="w-4 h-4  md:ml-1"
              >
                <path
                  fill="currentColor"
                  d="M12 5q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm4.95 2.05q-.275-.275-.275-.688q0-.412.275-.712l1.4-1.425q.3-.3.712-.3q.413 0 .713.3q.275.275.275.7q0 .425-.275.7L18.35 7.05q-.275.275-.7.275q-.425 0-.7-.275ZM20 13q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287q.288.288.288.713t-.288.712Q22.425 13 22 13Zm-8 10q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05l-1.425-1.4q-.3-.3-.3-.725t.3-.7q.275-.275.7-.275q.425 0 .7.275L7.05 5.65q.275.275.275.7q0 .425-.275.7q-.3.275-.7.275q-.4 0-.7-.275Zm12.7 12.725l-1.4-1.425q-.275-.3-.275-.712q0-.413.275-.688q.275-.275.688-.275q.412 0 .712.275l1.425 1.4q.3.275.287.7q-.012.425-.287.725q-.3.3-.725.3t-.7-.3ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm2.225 6.775q-.275-.275-.275-.7q0-.425.275-.7L5.65 16.95q.275-.275.688-.275q.412 0 .712.275q.3.3.3.713q0 .412-.3.712l-1.4 1.4q-.3.3-.725.3t-.7-.3ZM12 18q-2.5 0-4.25-1.75T6 12q0-2.5 1.75-4.25T12 6q2.5 0 4.25 1.75T18 12q0 2.5-1.75 4.25T12 18Zm0-2q1.65 0 2.825-1.175Q16 13.65 16 12q0-1.65-1.175-2.825Q13.65 8 12 8q-1.65 0-2.825 1.175Q8 10.35 8 12q0 1.65 1.175 2.825Q10.35 16 12 16Z"
                />
              </svg>
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="w-4 h-4 md:ml-1"
              >
                <path
                  fill="currentColor"
                  d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"
                />
              </svg>
            )}
          </button>
        </nav>
      </div>
      <div className="h-0.5 w-100 bg-yellow-500"></div>
    </header>
  );
};

export default Navbar;
