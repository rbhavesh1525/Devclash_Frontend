
import './App.css'
<<<<<<< HEAD
import {Studentprofile,UserSignin,UserSignup,Courses,PreAssessmentTest,DashboardScreen,SubContent,PractiseTest,LeaderBoard} from "./Pages/PageIndex"
=======
<<<<<<< HEAD
import {Studentprofile,UserSignin,UserSignup,Courses,PreAssessmentTest,DashboardScreen,SubContent,ModuleLearningdata} from "./Pages/PageIndex"
import {TopNavBar , WelcomePage, LandingPage,Footer} from "./Components/CompIndex"
=======
import {Studentprofile,UserSignin,UserSignup,Courses,PreAssessmentTest,DashboardScreen,SubContent,PractiseTest} from "./Pages/PageIndex"
>>>>>>> 368ade4a906cb41d6a3de8c7f971c5a04fd5a253
import {TopNavBar} from "./Components/CompIndex"
>>>>>>> 7657a4b70f9479b5427a47b6b7f26de275cce588
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
      <Route path='/preassessmenttest' element={<><TopNavBar/><PreAssessmentTest/></>}/>
      <Route path='/student-profile' element={<><TopNavBar/><Studentprofile/></>}></Route>
      <Route path="/dashboard" element={<><TopNavBar/><DashboardScreen /></>} />
      <Route path="/subcontent" element={<><TopNavBar/><SubContent /></>} />
<<<<<<< HEAD
=======
<<<<<<< HEAD
      <Route path='/module-learning-data'  element={<><TopNavBar/><ModuleLearningdata/></>} />
=======
<<<<<<< HEAD
>>>>>>> 368ade4a906cb41d6a3de8c7f971c5a04fd5a253
      <Route path="/practisetest" element={<><TopNavBar/><PractiseTest /></>} />
      <Route path='/weeklytest' element={<><TopNavBar/><WeeklyTest/></>}/>
<<<<<<< HEAD
      <Route path='/leaderboard' element={<><TopNavBar/><LeaderBoard/></>}/>
=======
>>>>>>> 6b53a60de6e01266fe8eaa4c6681e58956839c34
>>>>>>> 7657a4b70f9479b5427a47b6b7f26de275cce588
>>>>>>> 368ade4a906cb41d6a3de8c7f971c5a04fd5a253
      
    
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
   
    </BrowserRouter>
      
    </>
  )
}

export default App;
