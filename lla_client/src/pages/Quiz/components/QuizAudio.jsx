import { useRef, useState } from "react";

const Audcomp = ({ data, handleChange, index }) => {
  return (
    <button
      onClick={() => handleChange(index)}
      className="p-2 sm:w-1/2 w-full focus:bg-yellow-400 focus:border-solid focus:border-2 focus:border-orange-700"
    >
      <div className="bg-gray-100 rounded flex p-4 h-full items-center justify-between dark:bg-slate-500 dark:text-white">
        <img src="/speaker-svgrepo-com.svg" className="w-6 h-6" />
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
    </button>
  );
};

const QuizAudio = ({ question, desc, options, next, audios, setAnswers }) => {
  /**
   * @type {React.MutableRefObject<HTMLAudioElement>}
   */
  const audioRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState(0);

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
          <source src={audios[currentAudio]} />
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
          {options.map((option, i) => {
            return (
              <Audcomp
                key={i}
                data={option}
                handleChange={handleChange}
                index={i}
              />
            );
          })}
        </div>
        <button
          onClick={() => {
            setAnswers((prev) => [...prev, options[currentAudio]]);
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

export default QuizAudio;
