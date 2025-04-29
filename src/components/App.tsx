import '../css/app.css'
import NavBar from './layout/NavBar'
import Footer from './layout/Footer'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'

function App() {
  // const [count, setCount] = useState(0);
  // let num = 4;
  return (
    <>
    <NavBar/>
    <main id='content'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </main>
    <Footer/>
    </>
  )
}

export default App
