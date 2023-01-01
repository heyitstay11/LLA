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
  QuizMaker,
  Qna,
  SingleQna,
  CreateCourse,
  CourseSection,
  PageNotFound,
  Dashboard,
  MyCourse,
  Loading,
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
        <Route path="/course/:id" element={<SingleCourse />} />
        <Route path="/singlecourse/:author" element={<SingleCourse />} />
        <Route path="/quizmaker" element={<QuizMaker />} />
        <Route path="/quiz" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meeting/:meetingId" element={<Meeting />} />
        <Route path="/qna" element={<Qna />} />
        <Route path="/courseboard" element={<Dashboard />} />
        <Route path="/courseboard/:id" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/qna/:qid" element={<SingleQna />} />
        <Route path="/mycourse" element={<MyCourse />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
