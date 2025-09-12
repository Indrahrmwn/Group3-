// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App'
import Navbar from './components/navbar'
import NewsPage from './pages/NewsPage'
import TicketPage from "./pages/TicketPage"
import PaymentPage from "./pages/PaymentPage"
import About from './pages/About'
import Login from './pages/Login'

// Komponen wrapper untuk handle Navbar
function AppRoutes() {
  const location = useLocation();
  // daftar path yang navbar-nya disembunyikan
  const hideNavbarOn = ['/login'];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)
