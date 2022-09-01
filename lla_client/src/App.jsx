import { Navbar, Footer } from "./components";
import { Home, Login, Signup ,Quiz , Result } from "./pages";
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
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
