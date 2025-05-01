import '../css/app.css'
import NavBar from './layout/NavBar'
import Footer from './layout/Footer'
import Home from './pages/Guest/Home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './pages/Guest/Login'
import Register from './pages/Guest/Register'
import About from './pages/Guest/About'

function App() {
  // const [count, setCount] = useState(0);
  // let num = 4;
  return (
    <>
    <NavBar/>
    <main id='main-content'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer/>
    </>
  )
}

export default App
