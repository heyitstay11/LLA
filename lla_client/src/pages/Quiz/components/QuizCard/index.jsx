import React from "react";
import {
  ResultCard,
  QuizImage,
  QuizAudio,
  Audio2Text,
  TextTranslate,
} from "../../components";

const QuizCard = ({ data = [], next, currQuestion, setAnswers }) => {
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
    return <TextTranslate {...{ options, question, desc, next, setAnswers }} />;
  }
  if (quizData.type === "image") {
    const { answer1, answer2, answer3, answer4, question, questionFile } =
      quizData;
    const options = [answer1, answer2, answer3, answer4];
    return (
      <QuizImage {...{ options, question, questionFile, next, setAnswers }} />
    );
  }
  if (quizData.type === "audio") {
    console.log(quizData);
    const {
      question,
      desc,
      file1,
      file2,
      file3,
      file4,
      answer1,
      answer2,
      answer3,
      answer4,
    } = quizData;
    const audios = [file1, file2, file3, file4];
    const options = [answer1, answer2, answer3, answer4];
    return (
      <QuizAudio {...{ question, desc, options, next, audios, setAnswers }} />
    );
  }
  if (quizData.type === "audio2text") {
    const { question, desc, audio } = quizData;
    return <Audio2Text {...{ next, question, desc, audio, setAnswers }} />;
  }
  if (quizData.type === "result") {
    console.log(quizData);
    return <ResultCard />;
  }
};
export default QuizCard;
