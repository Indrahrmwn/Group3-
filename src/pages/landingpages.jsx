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

  // Data komentar dummy (tetap sama)
  const comments = [
    {
      name: "jamaludin",
      date: "29-maret-2024",
      comment:
        "Lokakarya ini telah membantu saya mengembangkan kreativitas. Saya merasa lebih percaya diri di atas panggung daripada sebelumnya!",
      stars: 5,
    },
    {
      name: "jamaludin",
      date: "29-maret-2024",
      comment:
        "Lokakarya ini telah membantu saya mengembangkan kreativitas. Saya merasa lebih percaya diri di atas panggung daripada sebelumnya!",
      stars: 5,
    },
    {
      name: "jamaludin",
      date: "29-maret-2024",
      comment:
        "Lokakarya ini telah membantu saya mengembangkan kreativitas. Saya merasa lebih percaya diri di atas panggung daripada sebelumnya!",
      stars: 5,
    },
  ];

  // Fungsi untuk fetch data tiket dari API
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);

      // URL API - ganti sesuai dengan port Laravel Anda
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
      <section className="bg-white px-20 md:px-16">
        <div className="bg-red-700 -mx-8 md:-mx-16 py-20 py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-white">
              Apa yang Kamu Dapat?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-200 rounded-3xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="font-bold text-lg mb-2">Skill Akting Praktis</h3>
                <p className="text-sm text-gray-700">
                  Teknik vokal, blocking, ekspresi, hingga kepercayaan diri di
                  panggung & kamera.
                </p>
              </div>

              <div className="bg-gray-200 rounded-3xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="font-bold text-lg mb-2">Jejaring Kreatif</h3>
                <p className="text-sm text-gray-700">
                  Kenalan dengan komunitas film, penulis, dan seniman lokal.
                </p>
              </div>

              <div className="bg-gray-200 rounded-3xl shadow-md p-6 hover:shadow-lg transition">
                <h3 className="font-bold text-lg mb-2">Portofolio Karya</h3>
                <p className="text-sm text-gray-700">
                  Ikut pementasan & produksi, dokumentasi rapi untuk
                  CV/Beasiswa.
                </p>
              </div>
            </div>
          </div>
        </div>

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
                      src={ticket.image_url || "/default-ticket-image.jpg"}
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
                          navigate("/ticket");
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

        {/* Komentar User */}
        <div className="bg-red-700 -mx-8 md:-mx-16 mt-20 py-12 px-6 md:px-16 py-24 md:py-32">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white text-2xl font-bold">Komentar User</h2>
            <Link
              to="/detailkomentar"
              className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Lihat Lainnya →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {comments.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.date}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">"{item.comment}"</p>

                <div className="flex text-yellow-400 text-lg">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section ajakan bergabung */}
      <section
        className="relative bg-cover bg-center py-24 md:py-32"
        style={{
          backgroundImage: `url(${BackgroundGabung})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Bergabunglah dengan Komunitas Remaja Tengah!
            </h2>
            <p className="text-gray-800 text-sm md:text-base leading-relaxed">
              Bebaskan kreativitas dan gairah teater Anda bersama kami. Jadilah
              bagian dari sesuatu yang luar biasa!
            </p>

            <div className="flex gap-4 pt-4">
              <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md transition duration-300 font-semibold">
                Mendaftar
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-md transition duration-300 font-semibold">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          <div className="hidden md:block" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E3A44] text-white py-12">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <img
              src="/src/assets/Gambar Website/tes.png"
              alt="Remaja Tengah"
              className="w-32 h-auto mb-4"
            />
          </div>

          <div>
            <h3 className="font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Our Event</li>
              <li>Get Involved</li>
              <li>Contact Us</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Connect With Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Youtube</li>
              <li>Tiktok</li>
              <li>Whatsapp</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Stay Update</h3>
            <ul className="space-y-2 text-sm">
              <li>Newsletter</li>
              <li>Event</li>
              <li>Workshop</li>
              <li>Membership</li>
              <li>Support Us</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">Subscribe</h3>
            <p className="text-sm mb-3">
              Join our newsletter to stay updated our latest event and news
            </p>
            <div className="flex gap-2 mb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 rounded bg-gray-600 text-white text-sm w-full focus:outline-none"
              />
              <button className="px-4 py-2 bg-gray-200 text-black rounded text-sm hover:bg-gray-300 transition">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-300">
              Enter your email. By subscribing, you agree to our Privacy Policy
              and receive updates.
            </p>
            <div className="flex gap-4 mt-4 text-xl">
              <span>▶️</span>
              <span>📸</span>
              <span>🎵</span>
              <span>👍</span>
              <span>💬</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-500 pt-4 text-center text-xs text-gray-300">
          © 2025 Remaja Tengah. All Right Reserved
        </div>
      </footer>
    </>
  );
}
