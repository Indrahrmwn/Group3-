import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GambarLanding from "../assets/Gambar Website/orang.jpg";
import BackgroundGabung from "../assets/Gambar Website/bergabung.jpg";

export default function LandingPage() {
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
      const apiUrl = 'http://localhost:8000/api/tickets';
      console.log('Fetching from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // Penting untuk Laravel
        }
      });
      
      console.log('Response status:', response.status);
      console.log('Response URL:', response.url);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Debug: lihat response text sebelum parsing JSON
      const responseText = await response.text();
      console.log('Response text (first 200 chars):', responseText.substring(0, 200));
      
      // Cek apakah response adalah HTML (error page)
      if (responseText.trim().startsWith('<!DOCTYPE') || 
          responseText.trim().startsWith('<!doctype') || 
          responseText.trim().startsWith('<html')) {
        throw new Error(`Server mengembalikan HTML bukan JSON. Status: ${response.status}. Kemungkinan:
          1. Laravel server tidak berjalan (jalankan: php artisan serve)
          2. Route tidak ditemukan
          3. CORS issue
          4. URL salah (cek apakah http://localhost:8000 benar)`);
      }
      
      // Cek apakah response kosong
      if (!responseText.trim()) {
        throw new Error('Server mengembalikan response kosong');
      }
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error(`Invalid JSON response: ${parseError.message}`);
      }
      
      console.log('Parsed data:', data);
      
      // Cek struktur response Laravel
      if (data.status === 'success') {
        setTickets(data.data || []);
        console.log('Tickets loaded:', data.data?.length || 0);
      } else {
        throw new Error(data.message || 'API returned error status');
      }
      
    } catch (err) {
      const errorMsg = err.message || 'Unknown error occurred';
      setError(errorMsg);
      console.error('Complete error details:', {
        error: err,
        message: errorMsg,
        stack: err.stack
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
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
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

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
              <span className="ml-3 text-gray-600">Memuat tiket...</span>
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
                    // Test direct API call
                    window.open('http://localhost:8000/api/tickets', '_blank');
                  }}
                  className="bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-800"
                >
                  Test API di Browser
                </button>
              </div>
            </div>
          )}

          {/* Tampilan tiket dari database */}
          {!loading && !error && tickets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="min-w-60 rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {/* Gambar */}
                  <img
                    src={ticket.image_url || '/default-ticket-image.jpg'}
                    alt={ticket.ticket_name || ticket.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="bg-red-600 p-4 h-auto flex flex-col justify-between">
                    {/* Judul dan deskripsi */}
                    <div className="mb-3">
                      <p className="font-bold text-white text-lg mb-1">
                        {ticket.ticket_name || ticket.title}
                      </p>
                      {ticket.description && (
                        <p className="text-white text-sm opacity-90">
                          {ticket.description}
                        </p>
                      )}
                      {ticket.event_date && (
                        <p className="text-white text-xs mt-2">
                          📅 {new Date(ticket.event_date).toLocaleDateString('id-ID')}
                        </p>
                      )}
                    </div>

                    {/* Harga dan status */}
                    <div className="flex justify-between items-end">
                      <div>
                        {(ticket.quantity_available || ticket.stock) > 0 ? (
                          <p className="text-white text-xs">
                            Sisa: {ticket.quantity_available || ticket.stock} tiket
                          </p>
                        ) : (
                          <p className="text-red-200 text-xs font-semibold">
                            Sold Out
                          </p>
                        )}
                      </div>
                      <p className="text-right font-semibold text-white text-lg">
                        {formatPrice(ticket.price)}
                      </p>
                    </div>

                    {/* Tombol beli */}
                    <button
                      className={`mt-3 w-full py-2 rounded text-sm font-semibold transition ${
                        (ticket.quantity_available || ticket.stock) > 0
                          ? 'bg-white text-red-600 hover:bg-gray-100'
                          : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      }`}
                      disabled={(ticket.quantity_available || ticket.stock) === 0}
                      onClick={() => {
                        // Handle pembelian tiket
                        if ((ticket.quantity_available || ticket.stock) > 0) {
                          console.log('Beli tiket:', ticket.id);
                          // Redirect ke halaman checkout atau buka modal
                        }
                      }}
                    >
                      {(ticket.quantity_available || ticket.stock) > 0 ? 'Beli Sekarang' : 'Habis'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Jika tidak ada tiket */}
          {!loading && !error && tickets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Belum ada tiket tersedia</p>
              <p className="text-gray-400 text-sm mt-2">
                Pantau terus untuk update tiket terbaru!
              </p>
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