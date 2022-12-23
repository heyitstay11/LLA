import { useState, useEffect } from "react";
import { QuizCard } from "./components/index";
import { quizdata } from "./components/QuizCard/data";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(quizdata);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);

  const setCurrentQuestionInBounds = async (resultId = "") => {
    if (currQuestion === questions.length - 1) {
      return;
    }
    return setCurrentQuestion((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/quiz/${id}`);
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
      setAnswers={setAnswers}
    />
  );
};

export default Quiz;
