import '../css/app.css'
import NavBar from './layout/NavBar'
import Footer from './layout/Footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  // const [count, setCount] = useState(0);
  // let num = 4;
  return (
    <>
    <NavBar/>
    <main id='main-content'>
      <Routes>
        <Route path="/" element={<Home/>} />
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
