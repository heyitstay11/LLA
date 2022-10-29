import React from "react";
import {
  ResultCard,
  QuizImage,
  QuizAudio,
  Audio2Text,
  TextTranslate,
} from "../../components";

const QuizCard = ({ data = [], next, currQuestion }) => {
  const quizData = data?.[currQuestion];
  if (quizData.type === "text") {
    const { options, question, desc } = quizData;
    return <TextTranslate {...{ options, question, desc, next }} />;
  }
  if (quizData.type === "image") {
    const { options, question, imgsrc } = quizData;
    return <QuizImage {...{ options, question, imgsrc, next }} />;
  }
  if (quizData.type === "audio") {
    console.log(quizData);
    const { question, desc, options, audios } = quizData;
    return <QuizAudio {...{ question, desc, options, next, audios }} />;
  }
  if (quizData.type === "audio2text") {
    const { question, desc, audio } = quizData;
    return <Audio2Text {...{ next, question, desc, audio }} />;
  }
  if (quizData.type === "result") {
    console.log(quizData);
    return <ResultCard />;
  }
};
export default QuizCard;
