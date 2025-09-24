// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import GambarLanding from "../assets/Gambar Website/orang.jpg";
import Gambar2 from "../assets/Gambar Website/hoki.jpg";
import BackgroundGabung from "../assets/Gambar Website/bergabung.jpg";

export default function LandingPage() {
  // data komentar dummy
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
        <div className="bg-red-700 -mx-8 md:-mx-16 py-20  py-24 md:py-32">
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

        {/* Beli tiket */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Beli Tiket</h2>

          <div className="flex justify-start mt-10">
            <div className="min-w-60 rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              {/* gambar */}
              <img
                src={Gambar2}
                alt="Tiket Teater"
                className="w-full h-48 object-cover"
              />

              <div className="bg-red-600 p-4 h-32 flex flex-col justify-between">
                {/* Judul di kiri atas */}
                <p className="font-bold text-white">Tiket Teater</p>

                {/* Harga di kanan bawah */}
                <p className="text-right font-semibold text-white">
                  Rp.40.000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Komentar User */}
        <div className="bg-red-700 -mx-8 md:-mx-16 mt-20 py-12 px-6 md:px-16  py-24 md:py-32">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white text-2xl font-bold">Komentar User</h2>
            {/* pake Link ke halaman detail */}
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

                <p className="text-sm text-gray-700 mb-4">“{item.comment}”</p>

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
          {/* Kiri: teks */}
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

          {/* Kanan: bisa kosong atau gambar */}
          <div className="hidden md:block" />
        </div>
      </section>

      {/* Footer (sama persis) */}
      <footer className="bg-[#2E3A44] text-white py-12">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="md:col-span-1">
            <img
              src="/src/assets/Gambar Website/tes.png"
              alt="Remaja Tengah"
              className="w-32 h-auto mb-4"
            />
          </div>

          {/* Quick Links */}
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

          {/* Connect With Us */}
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

          {/* Stay Update */}
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

          {/* Subscribe */}
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