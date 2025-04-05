
import './App.css'
import {Studentprofile,UserSignin,UserSignup,Courses,PreAssessmentTest,DashboardScreen,SubContent,PractiseTest} from "./Pages/PageIndex"
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
      <Route path='/preassessmenttest' element={<><TopNavBar/><PreAssessmentTest/></>}/>
      <Route path='/student-profile' element={<><TopNavBar/><Studentprofile/></>}></Route>
      <Route path="/dashboard" element={<><TopNavBar/><DashboardScreen /></>} />
      <Route path="/subcontent" element={<><TopNavBar/><SubContent /></>} />
<<<<<<< HEAD
      <Route path="/practisetest" element={<><TopNavBar/><PractiseTest /></>} />
=======
      <Route path='/weeklytest' element={<><TopNavBar/><WeeklyTest/></>}/>
>>>>>>> 6b53a60de6e01266fe8eaa4c6681e58956839c34
      
    
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
      
    </>
  )
}

export default App;
