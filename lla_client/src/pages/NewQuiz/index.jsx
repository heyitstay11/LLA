import { useState } from "react";
import {
  QuestionPlaceholder,
  AudioQuizForm,
  AudioToTextQuizForm,
  TextQuizForm,
  ImageQuizForm,
} from "./components";

const NewQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [selectedType, setSelectedType] = useState("text");

  const handleTextQuestionAdd = (e) => {
    e.preventDefault();
    const { question, desc, optionA, optionB, optionC, optionD, answer } =
      e.target;
    const options = { optionA, optionB, optionC, optionD };

    const newQuiz = {
      type: "text",
      question: question.value,
      desc: desc.value,
      options: [optionA.value, optionB.value, optionC.value, optionD.value],
      answer: options[answer.value].value,
    };

    setQuizData((prev) => [...prev, newQuiz]);
    e.target.reset();
  };

  const handleImageQuestionAdd = (e) => {
    e.preventDefault();
    const {
      question,
      desc,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      image,
    } = e.target;
    const options = { optionA, optionB, optionC, optionD };
    const newQuiz = {
      type: "image",
      question: question.value,
      desc: desc.value,
      imgsrc: image.value,
      options: [optionA.value, optionB.value, optionC.value, optionD.value],
      answer: options[answer.value].value,
    };

    setQuizData((prev) => [...prev, newQuiz]);
    e.target.reset();
  };

  const handleAudioQuestionAdd = (e) => {
    e.preventDefault();
    const {
      question,
      desc,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      audioA,
      audioB,
      audioC,
      audioD,
    } = e.target;

    const options = { optionA, optionB, optionC, optionD };
    const newQuiz = {
      type: "audio",
      question: question.value,
      desc: desc.value,
      options: [optionA.value, optionB.value, optionC.value, optionD.value],
      audios: [audioA.value, audioB.value, audioC.value, audioD.value],
      answer: options[answer.value].value,
    };

    setQuizData((prev) => [...prev, newQuiz]);
    e.target.reset();
  };

  const handleAudioToTextQuestionAdd = (e) => {
    e.preventDefault();
    const { question, desc, answer, audio } = e.target;

    const newQuiz = {
      type: "audio2text",
      question: question.value,
      desc: desc.value,
      audio: audio.value,
      answer: answer.value,
    };

    setQuizData((prev) => [...prev, newQuiz]);
    e.target.reset();
  };

  const handleTypeSelection = (e) => {
    const value = e.target.value;
    setSelectedType(value);
  };

  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <h1 className="text-center text-2xl pt-1">New Quiz </h1>
      <div className="md:w-1/2 mx-auto px-4 py-10 pb-2">
        <div className="pb-4">
          <label htmlFor="title">Quiz Title:</label>
          <input
            type="text"
            id="title"
            className="pl-2 ml-4 text-black border border-2 border-black rounded-md"
          />
        </div>

        {quizData.map((quiz, index) => (
          <QuestionPlaceholder
            key={`${question}-${index}`}
            quiz={quiz}
            index={index}
          />
        ))}

        <div className="py-2">
          <p className="text-lg pb-1 ">Choose Type</p>
          <select
            name="quiz-type"
            id="quiz-type"
            className="text-black text-lg border border-2 border-black rounded-md"
            onChange={handleTypeSelection}
            defaultValue={"default"}
          >
            <option value="default" disabled={true}>
              Select a type
            </option>
            <option value="text">Translate Text</option>
            <option value="image">Guess Image</option>
            <option value="audio">Guess Audio</option>
            <option value="audio2text">Audio to Text</option>
          </select>
        </div>

        {selectedType === "text" && (
          <TextQuizForm handler={handleTextQuestionAdd} />
        )}

        {selectedType === "image" && (
          <ImageQuizForm handler={handleImageQuestionAdd} />
        )}

        {selectedType === "audio" && (
          <AudioQuizForm handler={handleAudioQuestionAdd} />
        )}

        {selectedType === "audio2text" && (
          <AudioToTextQuizForm handler={handleAudioToTextQuestionAdd} />
        )}
      </div>

      <div className="text-center py-4">
        <button className="text-center p-2 border border-2 border-yellow-500 rounded-md">
          Save Quiz
        </button>
      </div>
    </section>
  );
};

export default NewQuiz;
