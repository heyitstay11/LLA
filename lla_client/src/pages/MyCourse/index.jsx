import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../context/auth";
import { Link } from "react-router-dom";
import { Loading } from "../";

const CardGrid = ({ title, details, proficiency, price, thumbnail, _id }) => {
  return (
    <div className="max-w-xs mx-4 mb-2 rounded-lg pb-2 shadow-lg bg-gray-200 rounded-md shadow-lg">
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
          {title.slice(0, 49) || "Demo Title"}
        </h4>
        <div className=" flex flex-col">
          <p className=" text-gray-700">
            {`${details.slice(0, 59)}...` ||
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

const MyCourse = () => {
  const {
    auth: { token },
  } = useAuthContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMyCourses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/course/mycourses", {
        headers: { "x-auth-token": token },
      });
      setCourses(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMyCourses();
  }, []);

  if (loading) {
    return <Loading msg={"Fetching Your courses please Wait"} />;
  }
  return (
    <section className="text-gray-600 body-font relative dark:bg-slate-900 dark:text-white">
      <div className="mx-auto ">
        <div className="flex flex-col text-center w-full bg-gray-200 py-2 dark:bg-slate-900 dark:text-white">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-slate-900  dark:text-white">
            My Courses
          </h1>
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-full px-4 py-4 text-center bg-gray-200 flex flex-col items-center justify-center dark:bg-slate-900 dark:text-white dark:hover:text-gray-300">
            <header className="text-gray-800 body-font dark:bg-slate-900 dark:text-white">
              <div className="mx-auto flex flex-wrap  flex-col md:flex-row justify-centeritems-center">
                <nav className="flex flex-wrap items-center text-base justify-center font-bold ">
                  <a className="px-5 text-lg cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 ">
                    Course
                  </a>
                  <a className="px-5 text-lg cursor-pointer hover:text-gray-900 dark:hover:text-gray-300 ">
                    Quiz
                  </a>
                </nav>
              </div>
            </header>
          </div>
          <div className="w-4/5 px-4">
            <div className="pt-4 text-lg">
              <div className="md:w-1/2 mx-auto flex">
                Search &nbsp;
                <input className="border border-2 w-1/2 border-yellow-400 flex-grow  dark:text-black pl-2" />
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCourse;
