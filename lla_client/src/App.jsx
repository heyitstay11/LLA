import { Navbar, Footer } from './components';
import { Home, Login, Signup } from './pages';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App;