import React, { useEffect, useState } from "react";
import LogoPutih from "../assets/Gambar Website/tes.png";
import LogoHitam from "../assets/Gambar Website/remajatengah.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ transparent = false }) {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [photoTimestamp, setPhotoTimestamp] = useState(Date.now());
  const [tempPhoto, setTempPhoto] = useState(null);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleUploadStart = () => setIsUploading(true);
    const handleUploadEnd = () => {
      setIsUploading(false);
      setTempPhoto(null);
      setPhotoTimestamp(Date.now() + Math.random());
    };
    const handlePreview = (e) => {
      setTempPhoto(e.detail);
    };

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

  const photoUrl = tempPhoto
    ? tempPhoto
    : user?.profile_photo
    ? `${buildImageUrl(user.profile_photo)}?t=${photoTimestamp}`
    : "/src/assets/Gambar Website/default-avatar.jpg";

  const showTransparent = transparent && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-700 ease-out ${
        showTransparent
          ? "bg-black/20 text-white border-b border-white/10"
          : "bg-white/95 shadow-xl text-black border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-4 group">
            <div className="relative overflow-hidden rounded-xl p-1">
              <img
                src={showTransparent ? LogoPutih : LogoHitam}
                alt="Remaja Tengah"
                className="w-12 h-12 object-contain transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="hidden md:block">
              <h1 className={`font-bold text-xl tracking-tight transition-all duration-500 ${
                showTransparent ? "text-white" : "text-gray-900"
              }`}>
                Remaja Tengah
              </h1>
              <p className={`text-xs font-medium tracking-wide ${
                showTransparent ? "text-white/70" : "text-gray-500"
              }`}>
                Theater Community
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={`relative px-4 py-2 font-medium text-sm tracking-wide rounded-lg transition-all duration-300 group ${
                  showTransparent 
                    ? "text-white hover:bg-white/10" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Homepage
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-8 transition-all duration-300 rounded-full"></div>
              </Link>

              <Link
                to="/news"
                className={`relative px-4 py-2 font-medium text-sm tracking-wide rounded-lg transition-all duration-300 group ${
                  showTransparent 
                    ? "text-white hover:bg-white/10" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                News
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-8 transition-all duration-300 rounded-full"></div>
              </Link>

              {/* About with Enhanced Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => {
                    setAboutDropdownOpen(!aboutDropdownOpen);
                    setProfileDropdownOpen(false);
                  }}
                  className={`relative px-4 py-2 font-medium text-sm tracking-wide rounded-lg transition-all duration-300 group flex items-center gap-2 ${
                    showTransparent 
                      ? "text-white hover:bg-white/10" 
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  } ${aboutDropdownOpen ? 'bg-red-50 text-red-600' : ''}`}
                >
                  About
                  <svg
                    className={`w-4 h-4 transition-all duration-300 ${
                      aboutDropdownOpen ? 'rotate-180 scale-110' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-8 transition-all duration-300 rounded-full"></div>
                </button>

                {/* Enhanced About Dropdown */}
                <div className={`absolute top-full mt-3 left-0 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50 transform transition-all duration-300 ${
                  aboutDropdownOpen 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
                }`}>
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Learn More</p>
                  </div>
                  
                  {/* About Menu Item */}
                  <Link
                    to="/about"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 group"
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">About Us</p>
                      <p className="text-xs text-gray-500">Learn about our community</p>
                    </div>
                  </Link>

                  <Link
                    to="/contact"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 group"
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-200">
                      <svg className="w-4 h-4 text-blue-600 group-hover:text-red-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Contact Us</p>
                      <p className="text-xs text-gray-500">Get in touch with our team</p>
                    </div>
                  </Link>
                  
                  <Link
                    to="/divisi"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 group"
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-200">
                      <svg className="w-4 h-4 text-purple-600 group-hover:text-red-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Our Divisions</p>
                      <p className="text-xs text-gray-500">Explore our departments</p>
                    </div>
                  </Link>
                </div>
              </div>
            </nav>

            {/* CTA Button */}
            <Link
              to="/detail-ticket"
              className={`relative px-6 py-2.5 font-bold text-sm rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105 active:scale-95 ${
                showTransparent
                  ? "bg-white/20 hover:bg-red-600 text-white backdrop-blur-sm border border-white/30 hover:border-red-600"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/25"
              }`}
            >
              <span className="relative z-10">Buy Ticket</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Enhanced Profile Avatar with Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setAboutDropdownOpen(false);
                }}
                className="relative group"
                title={user?.name || "Profile Menu"}
              >
                <div className={`relative w-10 h-10 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                  showTransparent
                    ? "ring-2 ring-white/30 group-hover:ring-white/50"
                    : "ring-2 ring-gray-200 group-hover:ring-red-300"
                }`}>
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/src/assets/Gambar Website/default-avatar.jpg";
                    }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>

                  {/* Loading overlay */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-b-transparent"></div>
                    </div>
                  )}
                </div>

                {/* Status indicator */}
                {user && localStorage.getItem("token") && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}

                {/* Upload indicator */}
                {isUploading && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-bounce">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping"></div>
                  </div>
                )}
              </button>

              {/* Enhanced Profile Dropdown */}
              <div className={`absolute top-full mt-3 right-0 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50 transform transition-all duration-300 ${
                profileDropdownOpen 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
              }`}>
                {user && localStorage.getItem("token") ? (
                  <>
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-gray-200">
                          <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="mt-2 px-2 py-1 bg-green-100 rounded-lg inline-flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-medium text-green-700">Online</span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-200 group"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">My Profile</p>
                        <p className="text-xs text-gray-500">Manage your account</p>
                      </div>
                    </Link>
                    
                    <hr className="my-2 border-gray-100" />
                    
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.dispatchEvent(new Event("userUpdated"));
                        setProfileDropdownOpen(false);
                        window.location.href = "/login";
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Sign Out</p>
                        <p className="text-xs text-red-400">Logout from your account</p>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Guest Header */}
                    <div className="px-4 py-3 border-b border-gray-100 text-center">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-2">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-gray-900">Welcome!</p>
                      <p className="text-xs text-gray-500">Please sign in to continue</p>
                    </div>

                    <Link
                      to="/register"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700 transition-all duration-200 group"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Create Account</p>
                        <p className="text-xs text-gray-500">Join our community</p>
                      </div>
                    </Link>
                    
                    <Link
                      to="/login"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200 group"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Sign In</p>
                        <p className="text-xs text-blue-400">Access your account</p>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}