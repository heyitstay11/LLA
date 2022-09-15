import { useState } from "react";
import { quizdata } from "./data";

const QuizImage = ({ options, question, imgsrc, next }) => {
  const Optcomp = ({ data }) => {
    return (
      <button className="mt-2 basis-1/4 bg-gray-300 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900 text-black focus:bg-yellow-400 focus:border-solid focus:border-2 focus:border-orange-700 ">
        <span className="flex items-start flex-col leading-none title-font font-medium">
          {data}
        </span>
      </button>
    );
  };
  return (
    <section className="text-gray-600 body-font h-4/5 dark:bg-slate-900 dark:text-white">
      <div className="container mx-auto flex flex-col px-5 py-12 pb-2 justify-center items-center h-3/5 bg-gray-100 dark:bg-slate-900 dark:text-white">
        <img
          className="lg:w-2/6 md:w-3/6 w-4/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src={imgsrc}
        />
        <div className="w-full flex flex-col mb-16 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-gray-200">
            {question}{" "}
          </h1>
          <div className="  flex-wrap mx-5">
            {options.map((e, i) => {
              return <Optcomp key={i} data={e} />;
            })}
          </div>
          <div className="flex my-3">
            <button
              onClick={() => {
                next((prev) => prev + 1);
              }}
              className="bg-yellow-300 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900 dark:text-yellow-900"
            >
              <span className=" flex items-start flex-col leading-none">
                <span className="title-font font-medium">Submit</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const QuizAudio = ({ question, desc, options, next }) => {
  const Audcomp = ({ data }) => {
    return (
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center justify-between dark:bg-slate-500 dark:text-white">
          <img src="./speaker-svgrepo-com.svg" className="w-6 h-6" />
          <span className="title-font font-medium">{data}</span>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            className="text-yellow-500 w-6 h-6 flex-shrink-0 mr-4"
            viewBox="0 0 24 24"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
        </div>
      </div>
    );
  };
  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-24 mx-auto dark:bg-slate-900 dark:text-white">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4 dark:bg-slate-900 dark:text-white">
            {question}
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            {desc}
          </p>
        </div>
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 ">
          {options.map((e, i) => {
            return <Audcomp key={i} data={e} />;
          })}
        </div>
        <button
          onClick={() => {
            next((prev) => prev + 1);
          }}
          className="flex mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg "
        >
          Submit
        </button>
      </div>
    </section>
  );
};

const QuizCard = ({ data = [], next, currQuestion }) => {
  const quizData = data?.[currQuestion];
  if (quizData.type === "image") {
    const { options, question, imgsrc } = quizData;
    return <QuizImage {...{ options, question, imgsrc, next }} />;
  }
  if (quizData.type === "audio") {
    console.log(quizData);
    const { question, desc, options } = quizData;
    return <QuizAudio {...{ question, desc, options, next }} />;
  }
};
export default QuizCard;
