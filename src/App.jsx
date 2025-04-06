
import './App.css'
import { useEffect } from 'react'
import {Studentprofile,UserSignin,UserSignup,Courses,PreAssessmentTest,DashboardScreen,SubContent,ModuleLearningdata,CommunicationPractise,UpcomingTestCountdown, Upcomingtest} from "./Pages/PageIndex"
import {TopNavBar , WelcomePage, LandingPage,Footer} from "./Components/CompIndex"
import {PractiseTest} from "./Pages/PageIndex"

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
      <Route path='/homepage'element ={<><TopNavBar/> <LandingPage/><Courses/> <Footer/></>}/>
      
      <Route path='/user-signup' element={<><UserSignup/></>}/>
      <Route path='/user-signin' element={<><UserSignin/></>}/>
      <Route path='/preassessmenttest' element={<><TopNavBar/><PreAssessmentTest/></>}/>
      <Route path='/student-profile' element={<><TopNavBar/><Studentprofile/></>}></Route>
      <Route path="/dashboard" element={<><TopNavBar/><DashboardScreen /></>} />
      <Route path="/subcontent" element={<><TopNavBar/><SubContent /></>} />
      <Route path='/module-learning-data'  element={<><TopNavBar/><ModuleLearningdata/></>} />
      <Route path="/practisetest" element={<><TopNavBar/><PractiseTest /></>} />
      <Route path='/weeklytest' element={<><TopNavBar/><WeeklyTest/></>}/>

    <Route  path="/communication-practise" element={<> <TopNavBar/><CommunicationPractise/></>} />



    <Route   path='/instructor-homepage' element={<><Sidebar/><InstructorNavbar/><InstructorHome/></>} />
    <Route   path='/instructor-signup' element={<><InstructorSignUp/></>}/>
    <Route path='/instructor-signin' element={<><InstructorSignIn/></>}/>

    <Route  path='/instructor-qpaper' element={<><CreateQpaper/></>}/>

    <Route  path="/upcoming-test-countdown" element ={<><TopNavBar/><UpcomingTestCountdown/></>} />
    
    <Route  path='/upcoming-test' element={<><TopNavBar/><Upcomingtest/></>}/>

    <Route  path='/upload-video' element={<><UploadVideo/></>} />
    
      
    
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
   
    </BrowserRouter>
      
    </>
  )
}

export default App;
