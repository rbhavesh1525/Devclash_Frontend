
import './App.css'

import {Studentprofile,UserSignin,UserSignup,Courses,PreAssessmentTest,DashboardScreen,SubContent,PractiseTest,LeaderBoard,ModuleLearningdata} from "./Pages/PageIndex"
import {TopNavBar , WelcomePage, LandingPage,Footer} from "./Components/CompIndex"
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
      <Route path='/' element={<><WelcomePage/></>}  />
      <Route path='/homepage'element ={<><TopNavBar/> <LandingPage/><Courses/> <Footer/></>}/>
      
      <Route path='/user-signup' element={<><UserSignup/></>}/>
      <Route path='/user-signin' element={<><UserSignin/></>}/>
      <Route path='/preassessmenttest' element={<><TopNavBar/><PreAssessmentTest/><Footer/></>}/>
      <Route path='/student-profile' element={<><TopNavBar/><Studentprofile/><Footer/></>}></Route>
      <Route path="/dashboard" element={<><TopNavBar/><DashboardScreen /><Footer/></>} />
      <Route path="/subcontent" element={<><TopNavBar/><SubContent /><Footer/></>} />
      <Route path='/module-learning-data'  element={<><TopNavBar/><ModuleLearningdata/><Footer/></>} />
      <Route path="/practisetest" element={<><TopNavBar/><PractiseTest /></>} />
      <Route path='/weeklytest' element={<><TopNavBar/><WeeklyTest/></>}/>
      <Route path='/leaderboard' element={<><TopNavBar/><LeaderBoard/><Footer/></>}/>

      
    
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
   
    </BrowserRouter>
      
    </>
  )
}

export default App;
