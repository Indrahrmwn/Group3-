// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import LogoPutih from "../assets/Gambar Website/tes.png"; // logo putih
import LogoHitam from "../assets/Gambar Website/remajatengah.png"; // logo hitam
import { Link } from "react-router-dom";

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // navbar transparan hanya kalau di landing page & belum scroll
  const showTransparent = transparent && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 transition-all duration-500 ${
        showTransparent
          ? "bg-transparent text-white"
          : "bg-white shadow-md text-black"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src={showTransparent ? LogoPutih : LogoHitam}
          alt="Remaja Tengah"
          className="w-[100px] h-auto object-contain transition-all duration-300"
        />
        <span
          className={`font-semibold text-lg ${
            showTransparent ? "text-white" : "text-black"
          }`}
        >
          Remaja Tengah
        </span>
      </div>

      {/* Menu */}
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-6 text-sm">
          <Link
            to="/"
            className={`relative group transition duration-300 ${
              showTransparent ? "text-white" : "text-black"
            }`}
          >
            Homepage
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300" />
          </Link>

          <Link
            to="/news"
            className={`relative group transition duration-300 ${
              showTransparent ? "text-white" : "text-black"
            }`}
          >
            News
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300" />
          </Link>

          <Link
            to="/about"
            className={`relative group transition duration-300 ${
              showTransparent ? "text-white" : "text-black"
            }`}
          >
            About
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>

        <Link
          to="/ticket"
          className={`px-4 py-2 rounded-md text-sm transition duration-300 ${
            showTransparent
              ? "bg-white/20 hover:bg-red-500 text-white backdrop-blur"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          Buy Ticket
        </Link>

        <Link to="/profile"
          className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition duration-300 ${
            showTransparent
              ? "bg-white/20 text-white border-white hover:bg-red-500"
              : "bg-black text-white hover:bg-red-500"
          }`}
        >
          👤
        </Link>
      </div>
    </header>
  );
}
