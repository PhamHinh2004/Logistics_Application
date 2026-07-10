import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './authentication/RegisterPage'
import LoginPage from './authentication/LoginPage'
import OAuth2RedirectHandler from './authentication/OAuth2RedirectHandler'
import LandingPage from './pages/LandingPage'
import ContactPage from './pages/ContactPage'
import AboutUsPage from './pages/AboutUsPage'
import CustomerInformation from './customer/CustomerinformationPage'
import ContainerConfigurator from './pages/ContainerConfigurator'
import ContainerListPage from './pages/ContainerListPage'
import QuotationWizard from './pages/quotation/QuotationWizard'
import {QuotationProvider} from './context/QuotationContext'
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/onboarding" element={<CustomerInformation onFinish={(data) => console.log(data)} />} />
        <Route path="/services" element={<ContainerListPage />} />
        <Route path="/demo" element={<ContainerConfigurator />} />
        <Route path="/quotation" element={
          <QuotationProvider>
            <QuotationWizard />
          </QuotationProvider>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

