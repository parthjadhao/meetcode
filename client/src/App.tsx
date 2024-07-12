import { useState } from 'react'
import React from 'react'
import './App.css'
import LandingPage from './pages/LandingPage.jsx'
import Navbar from './components/Navbar.jsx'
import { Routes,Route } from 'react-router-dom'
import SignInPage from './pages/Authentication/SignInPage.jsx'
import LoginPage from './pages/Authentication/LoginPage.jsx'
import EventPage from './pages/EventPage.jsx'
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
