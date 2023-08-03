import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import Register from "./pages/Register"
import Header from "./components/Header"
import Movies from "./pages/Movies"
import CreateMovie from "./pages/CreateMovie"
import Footer from "./components/Footer"


function App() {
  

  return (
    <>
      <Router>
        <div className="main">
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/register' element={<Register />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/create' element={<CreateMovie />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
      <ToastContainer />
      
    </>
  )
}

export default App
