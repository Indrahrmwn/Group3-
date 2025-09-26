// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import LogoPutih from "../assets/Gambar Website/tes.png";
import LogoHitam from "../assets/Gambar Website/remajatengah.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ transparent = false }) {
  const { user } = useAuth(); // ambil user dari context
  const [scrolled, setScrolled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [photoTimestamp, setPhotoTimestamp] = useState(Date.now());
  const [tempPhoto, setTempPhoto] = useState(null); // preview sementara

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleUploadStart = () => setIsUploading(true);
    const handleUploadEnd = () => {
      setIsUploading(false);
      setTempPhoto(null); // hapus preview, biar balik ke foto server
      setPhotoTimestamp(Date.now() + Math.random()); // refresh cache busting
    };
    const handlePreview = (e) => {
      setTempPhoto(e.detail); // terima preview URL dari Profile.jsx
    };

    window.addEventListener("profileUploadStart", handleUploadStart);
    window.addEventListener("profileUploadEnd", handleUploadEnd);
    window.addEventListener("profilePhotoPreview", handlePreview);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("profileUploadStart", handleUploadStart);
      window.removeEventListener("profileUploadEnd", handleUploadEnd);
      window.removeEventListener("profilePhotoPreview", handlePreview);
    };
  }, []);

  const buildImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;

    const base = import.meta.env.VITE_API_URL || "";
    return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
  };

  // pilih foto: kalau ada preview dari Profile → pakai preview dulu
  const photoUrl = tempPhoto
    ? tempPhoto
    : user?.profile_photo
    ? `${buildImageUrl(user.profile_photo)}?t=${photoTimestamp}`
    : "/src/assets/Gambar Website/default-avatar.jpg";

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

        {/* Profile avatar */}
        <Link
          to="/profile"
          className="flex items-center justify-center cursor-pointer transition duration-300 mr-2 relative"
          title={user?.name || "Profile"}
        >
          <div
            className={`w-10 h-10 rounded-full p-[2px] flex items-center justify-center transition-transform transform hover:scale-105 relative ${
              showTransparent
                ? "bg-white/20 border border-white"
                : "bg-gradient-to-r from-blue-500 to-purple-600"
            }`}
          >
            <img
              src={photoUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.target.src = "/src/assets/Gambar Website/default-avatar.jpg";
              }}
            />

            {/* Loading overlay saat upload */}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          {/* Loading indicator badge */}
          {isUploading && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping"></div>
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}
