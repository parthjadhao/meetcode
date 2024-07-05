import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import LoginPage from './pages/LoginPage'
import EventPage from './pages/EventPage'
import AdminSignInPage from './pages/AdminSignInPage.jsx'
import AdminLoginPage from './pages/AdminLoginPage.jsx'
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
      </Routes>
      {/* <LandingPage></LandingPage> */}
    </>
  )
}

export default App;
