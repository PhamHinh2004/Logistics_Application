import RegisterPage from './authentication/RegisterPage'
import LoginPage from './authentication/LoginPage'
<<<<<<< Updated upstream
=======
import OAuth2RedirectHandler from './authentication/OAuth2RedirectHandler'
import LandingPage from './components/LandingPage'
import ContactPage from './components/ContactPage'
import AboutUsPage from './components/AboutUsPage'
import React from 'react'
>>>>>>> Stashed changes
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
<<<<<<< Updated upstream
=======
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  )
}

export default App

