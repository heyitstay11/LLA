import { Navbar, Footer } from "./components";
import {
  Home,
  Login,
  Signup,
  Quiz,
  Result,
  Contact,
  Meeting,
  Courses,
  SingleCourse,
  QuizList,
  NewQuiz,
  QuizMaker,
} from "./pages";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/singlecourse" element={<SingleCourse />} />
        <Route path="/singlecourse/:author" element={<SingleCourse />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meeting/:meetingId" element={<Meeting />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/newquiz" element={<NewQuiz />} />
        <Route path="/quizmaker" element={<QuizMaker />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
