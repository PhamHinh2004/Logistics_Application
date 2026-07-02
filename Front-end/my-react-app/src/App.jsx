import RegisterPage from './authentication/RegisterPage'
import LoginPage from './authentication/LoginPage'
import OAuth2RedirectHandler from './authentication/OAuth2RedirectHandler'
import LandingPage from './components/LandingPage'
import ContactPage from './components/ContactPage'
import AboutUsPage from './components/AboutUsPage'
import CustomerInformation from './customer/CustomerinformationPage'
import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { Canvas } from '@react-three/fiber'
import Container from './Container'
function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<RegisterPage />} />
    //     <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/contact" element={<ContactPage />} />
    //     <Route path="/about" element={<AboutUsPage />} />
    //     <Route path="/onboarding" element={<CustomerInformation onFinish={(data) => console.log(data)} />} />
    //   </Routes>
    // </BrowserRouter>
    <Canvas camera={{ position: [8, 4, 8], fov: 40 }}>

      <ambientLight intensity={1} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <Container />

    </Canvas>
  )
}

export default App

