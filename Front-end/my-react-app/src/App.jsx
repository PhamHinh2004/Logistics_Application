import RegisterPage from './authentication/RegisterPage'
import LoginPage from './authentication/LoginPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App