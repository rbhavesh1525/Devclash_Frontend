
import './App.css'
import {Studentprofile,UserSignin,UserSignup,Courses,PreAssessmentTest,DashboardScreen,SubContent} from "./Pages/PageIndex"
import {TopNavBar} from "./Components/CompIndex"
import {Routes,Route,BrowserRouter} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import WeeklyTest from './Pages/WeeklyTest';





function App() {
  
  

  return (
    <>
    <BrowserRouter>
   
    
    <Routes>
      
      <Route path='*' element={<Navigate  to="/"/>}/>
      <Route path='/'element ={<><TopNavBar/><Courses/></>}/>
      <Route path='/user-signup' element={<><UserSignup/></>}/>
      <Route path='/user-signin' element={<><UserSignin/></>}/>
      <Route path='/preassessmenttest' element={<><PreAssessmentTest/></>}/>
      <Route path='/student-profile' element={<><TopNavBar/><Studentprofile/></>}></Route>
      <Route path="/dashboard" element={<><TopNavBar/><DashboardScreen /></>} />
      <Route path="/subcontent" element={<><TopNavBar/><SubContent /></>} />
      <Route path='/weeklytest' element={<><TopNavBar/><WeeklyTest/></>}/>
      
    
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
      
    </>
  )
}

export default App;
