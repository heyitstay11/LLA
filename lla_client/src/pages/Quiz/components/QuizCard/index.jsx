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
    const {
      answer1,
      answer2,
      answer3,
      answer4,
      question,
      desc = "",
    } = quizData;
    const options = [answer1, answer2, answer3, answer4];
    return <TextTranslate {...{ options, question, desc, next }} />;
  }
  if (quizData.type === "image") {
    const { answer1, answer2, answer3, answer4, question, questionFile } =
      quizData;
    const options = [answer1, answer2, answer3, answer4];
    return <QuizImage {...{ options, question, questionFile, next }} />;
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
