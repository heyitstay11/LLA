import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { quizdata } from "./data";

const QuizImage = ({ options, question, imgsrc, next }) => {
  const Optcomp = ({ data }) => {
    return (
      <button className="mt-2 flex-1 bg-gray-300 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900 text-black focus:bg-yellow-400 focus:border-solid focus:border-2 focus:border-orange-700 ">
        <span className="mx-auto items-start flex-col leading-none title-font font-medium">
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
          <div className="w-9/10 flex flex-wrap">
            {options.map((e, i) => {
              return <Optcomp key={i} data={e} />;
            })}
          </div>
          <div className="flex my-3">
            <button
              onClick={() => {
                next((prev) => prev + 1);
              }}
              className="bg-yellow-500 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900 dark:text-slate-100 font-bold "
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

const audios = [
  "/audio/a1.wav",
  "/audio/a2.wav",
  "/audio/a3.wav",
  "/audio/a4.wav",
];

const Audcomp = ({ data, handleChange, index }) => {
  return (
    <div className="p-2 sm:w-1/2 w-full">
      <div className="bg-gray-100 rounded flex p-4 h-full items-center justify-between dark:bg-slate-500 dark:text-white">
        <img
          onClick={() => handleChange(audios[index])}
          src="./speaker-svgrepo-com.svg"
          className="w-6 h-6"
        />
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

const QuizAudio = ({ question, desc, options, next }) => {
  /**
   * @type {React.MutableRefObject<HTMLAudioElement>}
   */
  const audioRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState("/audio/a1.wav");

  const handleChange = (src) => {
    setCurrentAudio(() => src);
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.play();
  };
  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-24 mx-auto dark:bg-slate-900 dark:text-white">
        <audio ref={audioRef} loop={false} controls={false}>
          <source src={currentAudio} />
        </audio>
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
            return (
              <Audcomp key={i} data={e} handleChange={handleChange} index={i} />
            );
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

const Audio2Text = ({ next }) => {
  return (
    <section className="text-gray-600 body-font relative dark:bg-slate-900 dark:text-white">
      <div className="container lg:w-5/6 px-5 md:h-[72vh] py-12 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="px-4 py-2 rounded-md min-h-full md:w-1/2 bg-white flex flex-col mx-auto w-5/6 md:py-8 mt-8 md:mt-0 border-2 border-yellow-500 dark:bg-slate-900 ">
          <div className="relative mb-4 mx-auto flex flex-col justify-center text-yellow-400 font-bold">
            <h1 className="md:text-3xl text-black dark:text-white text-xl text-center">
              Write what you hear
            </h1>
            <p className="text-xs text-center text-black dark:text-white">
              An audio will pe played write what you hear in the textspace
            </p>
          </div>
          <div className="relative mb-4 flex md:flex-row h-full flex-col">
            <div className="flex flex-col justify-center mx-auto mb-2 md:mr-2">
              <img src="./speaker-svgrepo-com.svg" className="w-12 h-12 " />
            </div>
            <textarea
              id="message"
              name="message"
              className="w-full md:h-5/6 md:my-auto bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>

          <button
            onClick={() => {
              next((prev) => prev + 1);
            }}
            className="text-white font-md bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

const ResultCard = () => {
  return (
    <section className="text-gray-600 body-font m-h-screen p-24 px-0 dark:bg-slate-900 dark:text-white">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:bg-slate-900 dark:text-white">
            Well Done with the Quiz
          </h1>
          <p className="mb-8 leading-relaxed">
            Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing
            tousled. Chambray dreamcatcher trust fund, kitsch vice godard
            disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh.
            Pour-over meditation PBR B pickled ennui celiac mlkshk freegan photo
            booth af fingerstache pitchfork.
          </p>
          <div className="flex justify-center">
            <button className=" font-bold  inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              <NavLink to={"/result"}> Check Result </NavLink>
            </button>
          </div>
        </div>
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
  if (quizData.type === "audio2text") {
    console.log(quizData);
    return <Audio2Text {...{ next }} />;
  }
  if (quizData.type === "result") {
    console.log(quizData);
    return <ResultCard />;
  }
};
export default QuizCard;
