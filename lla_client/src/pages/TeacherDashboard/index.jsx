import axios from "axios";
import { useEffect, useReducer } from "react";
import { useAuthContext } from "../../context/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../Loading";

const Leftboard = () => {
  return (
    <div className="h-full w-full py-8 gap-2 flex flex-col items-center bg-white border-r-2 border-yellow-400 dark:bg-slate-900 dark:text-white">
      {/* <button className="flex py-2 mb-2 bg-gray-200 hover:bg-yellow-500 dark:hover:text-yellow-300 font-bold text-sm text-gray-900 py-2 px-4 hover:text-gray-900 dark:bg-gray-500 rounded-lg dark:text-white">
        Profile
      </button> */}
      <button className="flex py-2 mb-2 bg-gray-200 hover:bg-yellow-500 dark:hover:text-yellow-300 font-bold text-sm text-gray-900 py-2 px-4 hover:text-gray-900 dark:bg-gray-500 rounded-lg dark:text-white">
        Course
      </button>
      <button className="flex py-2 mb-2 bg-gray-200 hover:bg-yellow-500 dark:hover:text-yellow-300 font-bold text-sm text-gray-900 py-2 px-4 hover:text-gray-900 dark:bg-gray-500 rounded-lg dark:text-white">
        Class
      </button>
    </div>
  );
};

const Rightboard = ({ sessions }) => {
  const {
    auth: { token },
  } = useAuthContext();
  const [state, dispatch] = useReducer(
    (state, payload) => {
      return { ...state, ...payload };
    },
    {
      title: "",
      price: 0,
      date: new Date().toISOString().slice(0, 16),
      duration: 15,
    }
  );
  const { title, date, duration, price } = state;

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/meeting/create",
        {
          ...state,
          date: new Date(date).toISOString(),
        },
        { headers: { "x-auth-token": token } }
      );
      console.log(data);
      toast.success("New Class Created");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full h-full text-gray-600 body-font">
      <div className="w-full h-full px-5 py-8 mx-auto flex flex-wrap">
        <div className="w-full h-full flex flex-wrap -m-4">
          {sessions?.map((session) => {
            const { title, attendee, startTime, booked } = session;
            return (
              <div key={session._id} className="p-4 lg:w-1/2 md:w-full">
                <div className="flex border-2 rounded-lg border-gray-200 dark:bg-slate-800 border-opacity-50 p-8 sm:flex-row flex-col">
                  <div className="flex-grow">
                    <h2 className="text-gray-900 dark:text-yellow-400  text-lg title-font font-medium mb-3">
                      {title}
                    </h2>
                    <p className="leading-relaxed text-base dark:text-gray-200 ">
                      Date - {new Date(startTime).toLocaleString()}
                    </p>
                    {booked && (
                      <>
                        <p className="leading-relaxed text-base dark:text-gray-200 ">
                          Booked ✔
                        </p>
                        <p className="leading-relaxed text-base dark:text-gray-200 ">
                          Student : {attendee?.name}
                        </p>
                      </>
                    )}

                    <a className="mt-3 text-indigo-600 dark:text-yellow-500 inline-flex items-center">
                      meeting link
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {/*  */}
          <div className="p-4 lg:w-1/2 md:w-full">
            <div className="flex border-2 rounded-lg border-gray-200 dark:bg-slate-800 border-opacity-50 p-8 sm:flex-row flex-col">
              <form onSubmit={handleSubmit} className="flex-grow">
                <h2 className="text-gray-900 dark:text-yellow-400  text-lg title-font font-medium mb-3">
                  Create New Meeting Schedule
                </h2>
                <div className="py-3">
                  <label className="dark:text-white mx-3" htmlFor="title">
                    Title:
                  </label>
                  <input
                    value={title}
                    onChange={handleInput}
                    name="title"
                    className="px-1"
                    type="text"
                    required={true}
                  />
                </div>
                <div className="py-3">
                  <label className="dark:text-white mx-3" htmlFor="price">
                    Price :
                  </label>
                  <input
                    value={price}
                    onChange={handleInput}
                    className="px-1 text-lg"
                    type="number"
                    name="price"
                    min={0}
                    max={9999}
                    required={true}
                  />
                </div>
                <div className="">
                  <label className="dark:text-white mx-3" htmlFor="date">
                    Date:
                  </label>
                  <input
                    value={date}
                    onChange={handleInput}
                    type="datetime-local"
                    name="date"
                    required={true}
                    className="px-1"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                <div className="py-3">
                  <label className="dark:text-white mx-3" htmlFor="duration">
                    Session Duration (in mins):
                  </label>
                  <input
                    value={duration}
                    onChange={handleInput}
                    className="px-1"
                    type="number"
                    name="duration"
                    required={true}
                    step={15}
                    min={15}
                    max={90}
                  />
                </div>
                <button className="mx-auto mx-6 my-2 px-8 border border-1 p-2 border-yellow-500 text-indigo-600 dark:text-yellow-500 inline-flex items-center">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeacherDashboard = () => {
  const {
    auth: { token },
  } = useAuthContext();
  const [sessions, setSessionRes] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMySessions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/meeting/my", {
        headers: { "x-auth-token": token },
      });
      setSessionRes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMySessions();
  }, []);
  if (loading) {
    return <Loading msg={"Fetching Your Sessions please Wait"} />;
  }
  return (
    <section className="h-5/6 text-gray-600 body-font relative h-full dark:bg-slate-900 dark:text-white">
      <div className="flex flex-col md:flex-row flex-wrap mr-0 dark:bg-slate-900 dark:text-white">
        <div className="lg:w-1/5 md:w-1/5 bg-gray-300 border-b-2 border-yellow-400 rounded-lg overflow-y-auto flex items-end justify-start relative">
          <Leftboard />
        </div>
        <div className="lg:w-4/5 pb-10 md:w-4/5 bg-white flex flex-col md:ml-auto w-full ml-4 mt-8 md:mt-0 dark:bg-slate-900 dark:text-white">
          <h1 className="sm:text-3xl max-w-2xl mx-auto text-2xl text-center py-6 font-medium title-font text-gray-900 dark:bg-slate-900 dark:text-white">
            Upcoming Meetings
          </h1>
          <div className="flex flex-col items-center justify-center">
            <Rightboard sessions={sessions} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboard;
