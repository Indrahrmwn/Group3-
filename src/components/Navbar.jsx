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
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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

    // Close dropdowns when clicking outside
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setAboutDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    window.addEventListener("profileUploadStart", handleUploadStart);
    window.addEventListener("profileUploadEnd", handleUploadEnd);
    window.addEventListener("profilePhotoPreview", handlePreview);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("profileUploadStart", handleUploadStart);
      window.removeEventListener("profileUploadEnd", handleUploadEnd);
      window.removeEventListener("profilePhotoPreview", handlePreview);
      window.removeEventListener("click", handleClickOutside);
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

          {/* About with Dropdown */}
          <div className="relative dropdown-container">
            <button
              onClick={() => {
                setAboutDropdownOpen(!aboutDropdownOpen);
                setProfileDropdownOpen(false);
              }}
              className={`relative group transition duration-300 flex items-center gap-1 ${
                showTransparent ? "text-white" : "text-black"
              }`}
            >
              About
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  aboutDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300" />
            </button>

            {/* About Dropdown Menu */}
            {aboutDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setAboutDropdownOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/divisi"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setAboutDropdownOpen(false)}
                >
                  Divisi
                </Link>
              </div>
            )}
          </div>
        </nav>

        <Link
          to="/detail-ticket"
          className={`px-4 py-2 rounded-md text-sm transition duration-300 ${
            showTransparent
              ? "bg-white/20 hover:bg-red-500 text-white backdrop-blur"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          Buy Ticket
        </Link>

        {/* Profile avatar with dropdown */}
        <div className="relative dropdown-container">
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setAboutDropdownOpen(false);
            }}
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
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={() => {
                      // Handle logout
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.dispatchEvent(new Event("userUpdated"));
                      setProfileDropdownOpen(false);
                      window.location.href = "/login";
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Daftar
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}