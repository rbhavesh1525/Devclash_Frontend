
import './App.css'
import {Homepage} from "./Pages/PageIndex"
import {Navbar,TopNavBar} from "./Components/CompIndex"
import {Routes,Route,BrowserRouter} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import DashboardScreen from './Pages/Dashboardscreen';




function App() {
  
  

  return (
    <>
    <BrowserRouter>
   

    <Routes>
      
      <Route path='*' element={<Navigate  to="/"/>}/>
      <Route path='/'element ={<> <TopNavBar/><Homepage/></>}/>
      <Route path="/dashboard" element={<DashboardScreen />} />
      
    
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
      
    </>
  )
}

export default App;
