
import './App.css'
import {Homepage} from "./Pages/PageIndex"
import {Navbar} from "./Components/CompIndex"
import {Routes,Route,BrowserRouter} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";

function App() {
  
  

  return (
    <>
    <BrowserRouter>

    <Routes>
      <Route path='*' element={<Navigate  to="/"/>}/>
      <Route path='/'element ={<><Navbar/><Homepage/></>}/>
      
    
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
      
    </>
  )
}

export default App
