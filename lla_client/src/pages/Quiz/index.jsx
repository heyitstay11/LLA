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
        const res = await axios.get("/quiz/635d101e95a8d8fbb5c58629");
        console.log(res.data);
        setQuestions(res.data.questions);
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
