import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/auth";
import { Link } from "react-router-dom";
import { Loading } from "../";

const CardGrid = ({ title, details, proficiency, price, thumbnail, _id }) => {
  return (
    <div className="max-w-xs md:mx-4 mb-2 rounded-lg pb-2 shadow-lg bg-gray-200 rounded-md shadow-lg">
      <Link to={"/courseboard/" + _id}>
        <img
          className="w-full rounded-md"
          src={
            thumbnail ||
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
          }
          alt="product"
        />
      </Link>
      <div className="px-6 py-4">
        <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800">
          {title?.slice(0, 49) || "Demo Title"}
        </h4>
        <div className=" flex flex-col">
          <p className=" text-gray-700">
            {`${details?.slice(0, 59)}...` ||
              "Lorem ipsum dolor sit amet consectetur dipisicing."}
          </p>
          <Link
            to={"/courseboard/" + _id}
            className="my-2 font-bold text-yellow-600"
          >
            Go to Course
          </Link>
        </div>
      </div>
    </div>
  );
};
export const SessionCard = ({
  duration,
  title,
  price,
  host,
  startTime,
  _id,
}) => {
  return (
    <div className="p-2 pb-0 md:w-1/2 lg:w-1/3">
      <div className="h-auto border-2 border-gray-500 dark:border-yellow-400 border-opacity-60 rounded-lg overflow-hidden">
        <div className="py-4 px-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-2 dark:text-white">
            {title}
          </h1>
          <h2 className="tracking-widest title-font font-medium text-gray-800 dark:text-gray-300 mb-1">
            <i className="text-sm">with</i> {host?.name}
          </h2>
          <p className="leading-relaxed text-md  mb-3 flex justify-between">
            <span className="inline-block">{duration} min</span>{" "}
            <span className="inline-block">₹ {price}</span>
          </p>
          <div className="text-md text-gray-800 dark:text-gray-300">
            Timings: {new Date(startTime)?.toLocaleString()?.slice(0, 17)}
          </div>
          <div className="text-center my-2">
            <Link
              to={"/meeting/" + _id}
              className="font-medium  border border-yellow-500 py-1 px-4 text-center text-yellow-600 dark:text-yelllow-500 hover:underline"
            >
              Join Session
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
const MyCourse = () => {
  const {
    auth: { token },
  } = useAuthContext();
  const [courses, setCourses] = useState([]);
  const [quizRes, setQuizRes] = useState([]);
  const [sessionRes, setSessionRes] = useState([]);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadMyCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/course/mycourses", {
        headers: { "x-auth-token": token },
      });
      setCourses(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const loadMySessions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/meeting/my", {
        headers: { "x-auth-token": token },
      });
      setSessionRes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMyCourses();
  }, []);
  useEffect(() => {
    loadMySessions();
  }, []);

  const loadMyResults = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/quiz/result", {
        headers: { "x-auth-token": token },
      });
      setQuizRes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMyResults();
  }, []);

  if (loading) {
    return <Loading msg={"Fetching Your courses please Wait"} />;
  }
  return (
    <section className="text-gray-600 body-font relative dark:bg-slate-900 dark:text-white">
      <div className="mx-auto ">
        <div className="flex flex-col text-center w-full bg-gray-200 py-2 dark:bg-slate-900 dark:text-white">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-slate-900  dark:text-white">
            {isQuizOpen ? "My Quizzes" : "My Courses"}{" "}
          </h1>
          <Link to={"/myprofile"} className="my-2 font-bold text-yellow-600">
            Check Profile
          </Link>
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-full px-4 py-4 text-center bg-gray-200 flex flex-col items-center justify-center dark:bg-slate-900 dark:text-white dark:hover:text-gray-300">
            <header className="text-gray-800 body-font dark:bg-slate-900 dark:text-white">
              <div className="mx-auto flex flex-wrap  flex-col md:flex-row justify-centeritems-center">
                <nav className="flex flex-wrap items-center text-base justify-center font-bold ">
                  <button
                    onClick={() => setIsQuizOpen(false)}
                    className="px-5 text-lg cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 "
                  >
                    Course
                  </button>
                  <button
                    onClick={() => setIsQuizOpen(true)}
                    className="px-5 text-lg cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 "
                  >
                    Quiz
                  </button>
                </nav>
              </div>
            </header>
          </div>
          <div className="w-4/5 md:px-4">
            <div className="pt-4 text-lg">
              <div className="md:w-1/2 mx-auto flex">
                Search &nbsp;
                <input className="border border-2 w-1/2 border-yellow-400 flex-grow  dark:text-black pl-2" />
              </div>
            </div>
            <div className="mt-2">
              <h1 className="text-lg font-bold">Upcoming Sessions</h1>
              <div className="flex flex-wrap">
                {sessionRes?.map((session) => {
                  return <SessionCard key={session._id} {...session} />;
                })}
              </div>
            </div>

            {isQuizOpen ? (
              <div className="grid md:grid-cols-1 gap-6 md:ml-32 my-20 mt-6">
                {!loading && quizRes.length == 0 && (
                  <div className="flex flex-col">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-slate-900  dark:text-white">
                      No Previous Quiz Attempted{" "}
                    </h1>
                    <Link
                      className="font-medium text-yellow-600 dark:text-yelllow-500 hover:underline"
                      to={"/quiz"}
                    >
                      Check Quiz
                    </Link>
                  </div>
                )}
                {quizRes?.map((quiz) => {
                  const {
                    _id,
                    attemptedQuiz: quizData = {},
                    score,
                    total,
                  } = quiz;
                  return (
                    <div className="">
                      <Link
                        to={"/quiz/" + _id}
                        key={_id}
                        className="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
                      >
                        {quizData.title}
                      </Link>{" "}
                      &nbsp; Score: {score} / {total}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-6 my-4 mt-6">
                {!loading && courses.length == 0 && (
                  <div className="flex flex-col">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-slate-900  dark:text-white">
                      Enrolled in no courses{" "}
                    </h1>
                    <Link
                      className="font-medium text-yellow-600 dark:text-yelllow-500 hover:underline"
                      to={"/courses"}
                    >
                      Check Courses
                    </Link>
                  </div>
                )}

                {courses?.map((course) => {
                  const { _id, courseId: courseData = {} } = course;
                  return <CardGrid key={_id} {...courseData} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCourse;
