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
  Qna,
  SingleQna,
  CreateCourse,
  CourseSection,
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
        <Route path="/course/create" element={<CreateCourse />} />
        <Route path="/section/create" element={<CourseSection />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/singlecourse" element={<SingleCourse />} />
        <Route path="/singlecourse/:author" element={<SingleCourse />} />
        <Route path="/quiz" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meeting/:meetingId" element={<Meeting />} />
        {/* <Route path="/newquiz" element={<NewQuiz />} /> */}
        <Route path="/qna" element={<Qna />} />
        <Route path="/qna/:qid" element={<SingleQna />} />
        <Route path="/quizmaker" element={<QuizMaker />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
