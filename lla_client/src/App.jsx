import { Suspense, lazy } from "react";
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

const CreateCourse = lazy(() => import("./pages/CreateCourse"));
const CourseSection = lazy(() => import("./pages/CourseSection"));
const QuizMaker = lazy(() => import("./pages/QuizMaker"));
const Result = lazy(() => import("./pages/Result"));
const Quiz = lazy(() => import("./pages/Quiz"));
const SingleQna = lazy(() => import("./pages/SingleQna"));
const SingleCourse = lazy(() => import("./pages/SingleCourse"));
const Sessions = lazy(() => import("./pages/Sessions"));
const TOS = lazy(() => import("./pages/TOS"));
const JoinMentor = lazy(() => import("./pages/JoinMentor"));

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
      <Suspense fallback={<Loading msg={"Loading pages please wait ..."} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/join_mentor" element={<JoinMentor />} />
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/section/create" element={<CourseSection />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/sessions" element={<Sessions />} />
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
          <Route path="/teacherboard" element={<TeacherDashboard />} />
          <Route path="/myprofile" element={<Profile />} />
          <Route path="/privacy" element={<TOS />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
