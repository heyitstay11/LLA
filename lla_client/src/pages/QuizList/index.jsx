import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const loadQuizzes = async () => {
    try {
      const { data } = await axios.get("/quiz");
      console.log(data);
      setQuizzes(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadQuizzes();
  }, []);
  return (
    <section className="text-gray-600 body-font overflow-hidden dark:bg-slate-900 dark:text-white">
      <div className="container md:w-5/6 w-8/10 px-5 py-12 mx-auto ">
        <div className="p-4 mb-6">
          <div className="md:w-1/3 mx-auto flex">
            Search
            <input className="border border-2 border-yellow-400 flex-grow ml-2 dark:text-black pl-2" />
          </div>
        </div>
        <div className="-my-8 divide-y-2 divide-gray-100">
          {quizzes?.map((quiz) => {
            const { createdAt, _id, title, desc } = quiz;
            return (
              <div key={_id} className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="font-semibold title-font text-gray-700 dark:text-slate-300">
                    English
                  </span>
                  <span className="mt-1 text-gray-500 text-sm dark:text-slate-100">
                    {new Date(createdAt).toDateString()}
                  </span>
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-gray-900 title-font mb-2 dark:text-slate-300">
                    {title}
                  </h2>
                  <p className="leading-relaxed">{desc}</p>
                  <div className="text-yellow-500 inline-flex items-center mt-2">
                    <Link to={"/quiz/" + _id}> Start </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuizList;
