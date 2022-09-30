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
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meeting/:meetingId" element={<Meeting />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
