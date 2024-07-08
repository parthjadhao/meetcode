import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import SignInPage from './pages/Authentication/SignInPage'
import LoginPage from './pages/Authentication/LoginPage'
import EventPage from './pages/EventPage'
import AdminSignInPage from './pages/Authentication/AdminSignInPage.jsx'
import AdminLoginPage from './pages/Authentication/AdminLoginPage.jsx'
import ShowProblemPage from './pages/ShowProblemPage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/Events" element={<EventPage/>} />
        <Route path="/SignIn" element={<SignInPage/>} />
        <Route path="/Login" element={<LoginPage/>} />
        <Route path='/AdminLogin' element={<AdminLoginPage/>}/>
        <Route path='/AdminSignIn' element={<AdminSignInPage/>}/>
        <Route path='/ProblemList' element={<ShowProblemPage/>}/>
      </Routes>
      {/* <LandingPage></LandingPage> */}
    </>
  )
}

export default App;
