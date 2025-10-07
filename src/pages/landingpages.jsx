import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GambarLanding from "../assets/Gambar Website/orang.jpg";
import BackgroundGabung from "../assets/Gambar Website/bergabung.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  // State untuk menyimpan data tiket
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counters, setCounters] = useState({
    members: 0,
    events: 0,
    awards: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

   const getImageUrl = (imagePath) => {
    if (!imagePath) return "/default-ticket-image.jpg";
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/tickets';
    
    if (imagePath.startsWith('storage/')) {
      return `${baseUrl}/${imagePath}`;
    }
    
    return `${baseUrl}/${imagePath}`;
  };

  // Fungsi untuk fetch data tiket dari API
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = "http://localhost:8000/api/tickets";
      console.log("Fetching from:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest", // Penting untuk Laravel
        },
      });

      console.log("Response status:", response.status);
      console.log("Response URL:", response.url);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // Debug: lihat response text sebelum parsing JSON
      const responseText = await response.text();
      console.log(
        "Response text (first 200 chars):",
        responseText.substring(0, 200)
      );

      // Cek apakah response adalah HTML (error page)
      if (
        responseText.trim().startsWith("<!DOCTYPE") ||
        responseText.trim().startsWith("<!doctype") ||
        responseText.trim().startsWith("<html")
      ) {
        throw new Error(`Server mengembalikan HTML bukan JSON. Status: ${response.status}. Kemungkinan:
          1. Laravel server tidak berjalan (jalankan: php artisan serve)
          2. Route tidak ditemukan
          3. CORS issue
          4. URL salah (cek apakah http://localhost:8000 benar)`);
      }

      // Cek apakah response kosong
      if (!responseText.trim()) {
        throw new Error("Server mengembalikan response kosong");
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        throw new Error(`Invalid JSON response: ${parseError.message}`);
      }

      console.log("Parsed data:", data);

      // Cek struktur response Laravel
      if (data.status === "success") {
        setTickets(data.data || []);
        console.log("Tickets loaded:", data.data?.length || 0);
      } else {
        throw new Error(data.message || "API returned error status");
      }
    } catch (err) {
      const errorMsg = err.message || "Unknown error occurred";
      setError(errorMsg);
      console.error("Complete error details:", {
        error: err,
        message: errorMsg,
        stack: err.stack,
      });
    } finally {
      setLoading(false);
    }
  };

  // useEffect untuk memanggil API saat komponen dimount
  useEffect(() => {
    fetchTickets();
  }, []);

  // Fungsi untuk format harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email && email.includes("@")) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/remaja.tengah",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: "hover:bg-pink-600",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@remajatengah",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      color: "hover:bg-red-600",
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@remajatengah",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      color: "hover:bg-black",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/628123456789",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      color: "hover:bg-green-600",
    },
  ];

  useEffect(() => {
    if (isVisible) {
      const targets = { members: 150, events: 45, awards: 12 };
      const duration = 2000;
      const steps = 60;
      const increment = {
        members: targets.members / steps,
        events: targets.events / steps,
        awards: targets.awards / steps,
      };

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setCounters({
          members: Math.min(
            Math.floor(increment.members * currentStep),
            targets.members
          ),
          events: Math.min(
            Math.floor(increment.events * currentStep),
            targets.events
          ),
          awards: Math.min(
            Math.floor(increment.awards * currentStep),
            targets.awards
          ),
        });

        if (currentStep >= steps) clearInterval(timer);
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Skill Akting Praktis",
      description:
        "Teknik vokal, blocking, ekspresi, hingga kepercayaan diri di panggung & kamera",
      gradient: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      hoverColor: "hover:shadow-purple-200",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Jejaring Kreatif",
      description: "Kenalan dengan komunitas film, penulis, dan seniman lokal",
      gradient: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      hoverColor: "hover:shadow-blue-200",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Portofolio Karya",
      description:
        "Ikut pementasan & produksi, dokumentasi rapi untuk CV/Beasiswa",
      gradient: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      hoverColor: "hover:shadow-green-200",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${GambarLanding})` }}
      >
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="flex flex-col gap-4 items-start text-left">
            <div className="inline-block bg-red-700 text-white text-sm px-4 py-1 rounded-full">
              Komunitas Teater • Terbuka untuk Remaja
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-snug text-white">
              Temukan Panggungmu <br /> bersama Remaja Tengah
            </h1>
            <p className="text-white text-sm md:text-base max-w-xl leading-relaxed">
              Kami adalah komunitas teater yang mewadahi remaja untuk belajar
              akting, menulis naskah, dan mementaskan karya. Tanpa syarat
              pengalaman — cukup bawa rasa ingin tahu dan keberanian.
            </p>
           <button
          onClick={() => {
          const target = document.getElementById("daftar-section");
          if (target) {
          target.scrollIntoView({ behavior: "smooth" });
       }
    }}
        className=" bg-red-700 text-white px-6 py-2 rounded-md w-fit mt-4
        transition-all duration-300 ease-out
        font-bold
        hover:scale-105 hover:shadow-lg hover:bg-red-400
        focus:outline-none active:scale-95"
   >
       Bergabung Sekarang
       </button>
          </div>
        </div>
      </section>

      {/* Bagian bawah */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-24 relative overflow-hidden w-full min-h-screen">
      <section className="">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🎭 Benefits
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Apa yang Kamu Dapat?
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Bergabung bersama kami dan rasakan transformasi kreativitas Anda
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105 ${benefit.hoverColor} hover:shadow-2xl group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 text-white group-hover:rotate-12 transition-transform duration-300`}
                >
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative line */}
                <div
                  className={`mt-6 h-1 w-16 bg-gradient-to-r ${benefit.gradient} rounded-full group-hover:w-full transition-all duration-300`}
                ></div>
              </div>
            ))}
          </div>

          {/* Statistics Counter */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  {counters.members}+
                </div>
                <div className="text-white/80 font-medium">Anggota Aktif</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  {counters.events}+
                </div>
                <div className="text-white/80 font-medium">Event Tahunan</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  {counters.awards}+
                </div>
                <div className="text-white/80 font-medium">Penghargaan</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

        <section className="bg-white py-24 px-8 md:px-16">
        {/* Beli tiket - Dengan data dari database */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Beli Tiket</h2>

          {/* Loading state - Design yang diperbaharui */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                {/* Outer rotating ring */}
                <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-spin">
                  <div className="absolute top-0 left-0 w-4 h-4 bg-red-600 rounded-full transform -translate-x-2 -translate-y-2"></div>
                </div>

                {/* Inner pulsing dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>

                {/* Multiple ticket icons floating */}
                <div
                  className="absolute -top-2 -left-2 w-6 h-6 text-red-400 animate-bounce"
                  style={{ animationDelay: "0s" }}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div
                  className="absolute -top-2 -right-2 w-5 h-5 text-red-300 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div
                  className="absolute -bottom-2 -left-2 w-4 h-4 text-red-500 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div
                  className="absolute -bottom-2 -right-2 w-5 h-5 text-red-400 animate-bounce"
                  style={{ animationDelay: "0.6s" }}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Loading text with typing animation */}
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Memuat Tiket
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-gray-500">
                    Sedang mencari tiket terbaik untuk Anda
                  </span>
                  <div className="flex gap-1 ml-2">
                    <div
                      className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 w-64 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-pulse"></div>
              </div>

              {/* Loading skeleton cards preview */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl opacity-30">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
                  >
                    <div className="h-32 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-3 w-2/3"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <div className="font-bold mb-2">Error Details:</div>
              <div className="text-sm whitespace-pre-line">{error}</div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={fetchTickets}
                  className="bg-red-700 text-white px-4 py-2 rounded text-sm hover:bg-red-800"
                >
                  Coba Lagi
                </button>
                <button
                  onClick={() => {
                    window.open("http://localhost:8000/api/tickets", "_blank");
                  }}
                  className="bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-800"
                >
                  Test API di Browser
                </button>
              </div>
            </div>
          )}

          {/* Tampilan tiket dari database - Design yang diperbaharui */}
          {!loading && !error && tickets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-102 border border-gray-100"
                >
                  {/* Header dengan gambar */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageUrl(ticket.image_url)}
                      alt={ticket.ticket_name || ticket.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.src = "/default-ticket-image.jpg";
                      }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Price badge */}
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {formatPrice(ticket.price)}
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                      {ticket.ticket_name || ticket.title}
                    </h3>

                    {/* Description */}
                    {ticket.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {ticket.description}
                      </p>
                    )}

                    {/* Event info */}
                    <div className="space-y-2 mb-4">
                      {ticket.event_date && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {new Date(ticket.event_date).toLocaleDateString(
                            "id-ID"
                          )}
                        </div>
                      )}

                      {/* Stock info */}
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {(ticket.quantity_available || ticket.stock) > 0 ? (
                          <span>
                            Tersedia {ticket.quantity_available || ticket.stock}{" "}
                            tiket
                          </span>
                        ) : (
                          <span className="text-red-500 font-medium">
                            Sold Out
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action button */}
                    <button
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        (ticket.quantity_available || ticket.stock) > 0
                          ? "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg active:scale-95"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={
                        (ticket.quantity_available || ticket.stock) === 0
                      }
                      onClick={() => {
                        if ((ticket.quantity_available || ticket.stock) > 0) {
                          // PENTING: Kirim ticket ID lewat URL parameter
                          navigate(`/ticket?ticketId=${ticket.id}`);
                          console.log("🚀 Navigating to ticket ID:", ticket.id);
                        }
                      }}
                    >
                      {(ticket.quantity_available || ticket.stock) > 0
                        ? "Beli Sekarang"
                        : "Habis Terjual"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Jika tidak ada tiket - Design yang diperbaharui */}
          {!loading && !error && tickets.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                {/* Icon */}
                <div className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Belum Ada Tiket Tersedia
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Saat ini belum ada tiket yang tersedia untuk dijual. Pantau
                  terus halaman ini untuk mendapatkan update tiket terbaru dari
                  Remaja Tengah!
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Refresh Halaman
                  </button>
                  <button
                    onClick={() => {
                      /* Navigate to newsletter signup */
                    }}
                    className="border border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Beritahu Saat Ada Tiket
                  </button>
                </div>

                {/* Additional info */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">
                    Ingin tahu lebih dulu saat ada tiket baru? Ikuti media
                    sosial kami atau subscribe newsletter untuk mendapat
                    notifikasi pertama!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

     {/* Section ajakan bergabung */}
     <section id="daftar-section" className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/src/assets/Gambar Website/bergabung.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-block bg-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
                🎬 Daftar Sekarang • Gratis
              </div>

              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Bergabunglah dengan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  Komunitas Remaja Tengah!
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Bebaskan kreativitas dan gairah teater Anda bersama kami.
                Jadilah bagian dari sesuatu yang luar biasa!
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  "Workshop gratis setiap minggu",
                  "Mentoring dari profesional",
                  "Kesempatan tampil di berbagai event",
                  "Sertifikat & portofolio karya",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group">
                  Daftar Sekarang
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>

                <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95">
                  Pelajari Lebih Lanjut
                </button>
              </div>

              {/* Social Proof */}
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://ui-avatars.com/api/?name=Member+${i}&background=random&size=40`}
                      alt={`Member ${i}`}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">150+ Anggota Aktif</div>
                  <div className="text-gray-400">Bergabung bulan ini</div>
                </div>
              </div>
            </div>

            {/* Right Content - Registration Preview Card */}
            <div className="hidden md:block">
              <div className="bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Daftar Cepat
                </h3>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="No. WhatsApp"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                  />
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors">
                    <option>Pilih Divisi</option>
                    <option>Akting</option>
                    <option>Artistik</option>
                    <option>Musik & Sound</option>
                    <option>Produksi</option>
                  </select>

                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg active:scale-95">
                    Kirim Pendaftaran
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Dengan mendaftar, Anda menyetujui{" "}
                  <a href="#" className="text-red-600 hover:underline">
                    Syarat & Ketentuan
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-red-500/20 rounded-full filter blur-xl animate-pulse"></div>
        <div
          className="absolute top-20 right-20 w-32 h-32 bg-orange-500/20 rounded-full filter blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white py-16 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <img
                src="/src/assets/Gambar Website/tes.png"
                alt="Remaja Tengah"
                className="w-32 h-auto mb-4 hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm text-gray-400 leading-relaxed">
                Komunitas teater remaja yang dinamis di SMKN 2 Sukabumi
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-red-400 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Our Event",
                  "Get Involved",
                  "Contact Us",
                  "FAQs",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-300 hover:text-red-400 transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        →
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect With Us */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-red-400 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
                </svg>
                Connect With Us
              </h3>
              <ul className="space-y-3">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-red-400 transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="mr-2 text-base group-hover:scale-125 transition-transform inline-block">
                        {social.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {social.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stay Updated */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-red-400 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
                Stay Updated
              </h3>
              <ul className="space-y-3">
                {[
                  "Newsletter",
                  "Event",
                  "Workshop",
                  "Membership",
                  "Support Us",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-300 hover:text-red-400 transition-all duration-300 text-sm flex items-center group"
                    >
                      <span className="mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        →
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-red-400 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Subscribe
              </h3>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Join our newsletter to stay updated on our latest events and
                news
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-500"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={subscribed}
                  className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all active:scale-95 ${
                    subscribed
                      ? "bg-green-600 text-white"
                      : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:shadow-lg hover:shadow-red-500/50"
                  }`}
                >
                  {subscribed ? "✓ Subscribed!" : "Subscribe Now"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                By subscribing, you agree to our Privacy Policy
              </p>

              {/* Social Icons */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-gray-800 ${social.color} flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2025 Remaja Tengah SMKN 2 Sukabumi. All Rights Reserved
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a
                  href="#privacy"
                  className="hover:text-red-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#terms"
                  className="hover:text-red-400 transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#cookies"
                  className="hover:text-red-400 transition-colors"
                >
                  Cookies
                </a>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                Made with{" "}
                <svg
                  className="w-3 h-3 text-red-500 inline-block hover:scale-125 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>{" "}
                by Remaja Tengah Team
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
