import { useState } from "react";
import { QuizCard } from "./components/index";
import { quizdata } from "./components/QuizCard/data";
const Quiz = () => {
  const [currQuestion, setCurrentQuestion] = useState(0);
  return (
    <QuizCard
      data={quizdata}
      next={setCurrentQuestion}
      currQuestion={currQuestion}
    />
  );
};

export default Quiz;
