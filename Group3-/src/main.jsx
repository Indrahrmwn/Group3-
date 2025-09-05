import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import TicketPage from "./pages/TicketPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx"; 
import InvoicePage from "./pages/InvoicePage.jsx"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
