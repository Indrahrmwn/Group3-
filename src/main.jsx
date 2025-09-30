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
import DetailKomentar from './pages/DetailKomentar';
import Profile from './pages/profile.jsx';
import AuthCallback from './pages/AuthCallback';
import { AuthProvider } from './context/AuthContext';
import DetailTicket from './pages/DetailTicket.jsx';
import ContactPage from './pages/Contact.jsx';
import { AnimatePresence, motion } from "framer-motion";

function AppRoutes() {
  const location = useLocation();
  const hideNavbarOn = ['/login', '/register'];
  const isLanding = location.pathname === "/";
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {/* tampilkan Navbar kecuali login/register */}
      {!hideNavbarOn.includes(location.pathname) && (
        <Navbar transparent={isLanding} />
      )}

      {isAuthPage ? (
        // kalau login / register → pakai animasi
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
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
              <Route path="/detailkomentar" element={<DetailKomentar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/detail-ticket" element={<DetailTicket />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      ) : (
        // halaman biasa → tanpa animasi
        <Routes location={location}>
          <Route path="/" element={<App />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detailkomentar" element={<DetailKomentar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/detail-ticket" element={<DetailTicket />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);