
import './App.css'
import { useEffect } from 'react'
import {Studentprofile,UserSignin,UserSignup,Courses,PreAssessmentTest,DashboardScreen,SubContent,PractiseTest,LeaderBoard,ModuleLearningdata,ModelTest} from "./Pages/PageIndex"
import {TopNavBar , WelcomePage, LandingPage,Footer,FloatingChatLauncher} from "./Components/CompIndex"
import {Routes,Route,BrowserRouter} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import WeeklyTest from './Pages/WeeklyTest';


import {Sidebar,InstructorHome,InstructorNavbar,InstructorSignIn,InstructorSignUp,CreateQpaper,UploadVideo} from "./Instructor/InstructorIndex"



import useInstructorAuthStore from "./Store/InstructorAuthStore";



function App() {
  useEffect(() => {
    console.log("🔁 Loading from localStorage");
    useInstructorAuthStore.getState().loadFromLocalStorage();
  }, []);
  
  

  return (
    <>
    <BrowserRouter>
   
    
    <Routes>
      
      <Route path='*' element={<Navigate  to="/"/>}/>
      <Route path='/' element={<><WelcomePage/></>}  />
      <Route path='/homepage'element ={<><TopNavBar/> <LandingPage/><Courses/><FloatingChatLauncher/> <Footer/></>}/>
      
      <Route path='/user-signup' element={<><UserSignup/></>}/>
      <Route path='/user-signin' element={<><UserSignin/></>}/>
      <Route path='/preassessmenttest' element={<><TopNavBar/><PreAssessmentTest/><Footer/></>}/>
      <Route path='/student-profile' element={<><TopNavBar/><Studentprofile/><Footer/></>}></Route>
      <Route path="/dashboard" element={<><TopNavBar/><DashboardScreen /><Footer/></>} />
      <Route path="/subcontent" element={<><TopNavBar/><SubContent /><Footer/></>} />
      <Route path='/module-learning-data'  element={<><TopNavBar/><ModuleLearningdata/><Footer/></>} />
      <Route path="/practisetest" element={<><TopNavBar/><PractiseTest /></>} />
      <Route path='/weeklytest' element={<><TopNavBar/><WeeklyTest/></>}/>
      <Route path='/modeltest' element={<><TopNavBar/><ModelTest/></>}/>
      
      <Route path='/leaderboard' element={<><TopNavBar/><LeaderBoard/><Footer/></>}/>

      <Route path='/instruct-homepage' element={<><InstructorNavbar/><Sidebar/><InstructorHome/></>} />

      <Route path='/instruct-signin' element={<><InstructorSignIn/></>} />
      <Route path='/instruct-signup' element={<><InstructorSignUp/></>} />
      <Route path='/instructor-qpaper' element={<><CreateQpaper/></>}/>
      <Route path='/upload-video' element={<><UploadVideo/></>} />



      
    
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
   
    </BrowserRouter>
      
    </>
  )
}

export default App;
