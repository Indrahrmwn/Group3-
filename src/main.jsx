// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import Navbar from './components/navbar';
import NewsPage from './pages/NewsPage';
import TicketPage from "./pages/TicketPage";
import PaymentPage from "./pages/PaymentPage";
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import DetailKomentar from './pages/DetailKomentar'; // ✅ ini yang ditambah
import { AnimatePresence, motion } from "framer-motion";

function AppRoutes() {
  const location = useLocation();
  const hideNavbarOn = ['/login', '/register'];

  // cek apakah sekarang di LandingPage
  const isLanding = location.pathname === "/";

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && (
        <Navbar transparent={isLanding} />  
      )}

      {/* ini yang di-animate hanya konten route */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={location.pathname}
          initial={{ opacity: 0, x: 80 }}      // konten route masuk dari kanan
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}       // keluar ke kiri
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<App />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/ticket" element={<TicketPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detailkomentar" element={<DetailKomentar />} /> {/* ✅ route ke DetailKomentar */}
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
