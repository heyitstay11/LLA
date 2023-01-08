import { Navbar, Footer } from "./components";
import {
  Home,
  Login,
  Signup,
  Contact,
  Meeting,
  Courses,
  QuizList,
  Qna,
  PageNotFound,
  Dashboard,
  MyCourse,
  Loading,
  TeacherDashboard,
  Profile,
} from "./pages";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";

const CreateCourse = lazy(() => import("./pages/CreateCourse"));
const CourseSection = lazy(() => import("./pages/CourseSection"));
const QuizMaker = lazy(() => import("./pages/QuizMaker"));
const Result = lazy(() => import("./pages/Result"));
const Quiz = lazy(() => import("./pages/Quiz"));
const SingleQna = lazy(() => import("./pages/SingleQna"));
const SingleCourse = lazy(() => import("./pages/SingleCourse"));

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
      <Suspense fallback={<Loading msg={"Loading page please wait ..."} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/section/create" element={<CourseSection />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<SingleCourse />} />
          <Route path="/quizmaker" element={<QuizMaker />} />
          <Route path="/quiz" element={<QuizList />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/meeting/:meetingId" element={<Meeting />} />
          <Route path="/qna" element={<Qna />} />
          <Route path="/courseboard" element={<Dashboard />} />
          <Route path="/courseboard/:id" element={<Dashboard />} />
          <Route path="/qna/:qid" element={<SingleQna />} />
          <Route path="/mycourse" element={<MyCourse />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/teacherboard" element={<TeacherDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
