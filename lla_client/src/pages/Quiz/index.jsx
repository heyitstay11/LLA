import { useState, useEffect } from "react";
import { QuizCard } from "./components/index";
import { quizdata } from "./components/QuizCard/data";
import axios from "axios";

const Quiz = () => {
  const [currQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(quizdata);
  const [loading, setLoading] = useState(true);

  const setCurrentQuestionInBounds = () => {
    if (currQuestion === questions.length - 1) {
      return;
    }
    return setCurrentQuestion((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/quiz/63a41c4b201e7b17549f83d6");
        console.log(data);
        setQuestions(data.quiz.questions);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  if (loading) {
    return <h1>Loading Please Wait ......</h1>;
  }

  return (
    <QuizCard
      data={questions}
      next={setCurrentQuestionInBounds}
      currQuestion={currQuestion}
    />
  );
};

export default Quiz;
