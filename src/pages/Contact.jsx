import React, { useState } from "react";
import Gambar from "../assets/Gambar Website/DSC_0835 1.jpg";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const [openFAQ, setOpenFAQ] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const faqData = [
    {
      question: "Bagaimana cara bergabung dengan komunitas?",
      answer:
        "Anda dapat bergabung dengan komunitas Remaja Tengah dengan mengisi formulir pendaftaran di website kami atau datang langsung ke sekretariat kami di SMKN 2 Sukabumi. Proses pendaftaran mudah dan terbuka untuk semua siswa yang tertarik dengan seni teater.",
    },
    {
      question: "Apakah ada biaya untuk bergabung?",
      answer:
        "Tidak ada biaya pendaftaran untuk menjadi anggota Remaja Tengah. Kami adalah komunitas teater yang terbuka dan gratis untuk semua siswa SMKN 2 Sukabumi yang memiliki passion di bidang seni pertunjukan.",
    },
    {
      question: "Kapan jadwal latihan rutin diadakan?",
      answer:
        "Latihan rutin kami diadakan setiap hari Selasa dan Kamis pukul 15.30-17.30 WIB di Aula SMKN 2 Sukabumi. Untuk persiapan pertunjukan khusus, jadwal latihan dapat disesuaikan.",
    },
    {
      question: "Apa saja divisi yang tersedia di Remaja Tengah?",
      answer:
        "Remaja Tengah memiliki 4 divisi utama: Akting, Artistik (dekorasi & kostum), Musik & Sound, dan Produksi (lighting & multimedia). Setiap anggota bisa memilih divisi sesuai minat dan bakatnya.",
    },
    {
      question: "Bagaimana cara membeli tiket pertunjukan?",
      answer:
        "Tiket pertunjukan dapat dibeli secara online melalui website kami dengan klik tombol 'Buy Ticket' di halaman utama, atau bisa langsung di lokasi pertunjukan pada hari H. Kami juga menyediakan pre-sale dengan harga khusus.",
    },
  ];

  const categories = [
    "Pertanyaan Umum",
    "Keanggotaan",
    "Pertunjukan",
    "Kerjasama",
    "Lainnya",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", category: "", message: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="w-full">
        <img
          src="https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200"
          alt="Remaja Tengah"
          className="w-full h-[400px] md:h-[500px] object-cover object-center"
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 mt-25">
        {/* Title Section */}
        <div className="text-center mb-12 mt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hubungi Kami
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            "Mari terhubung! Jika ada ide, saran, atau pertanyaan seputar
            komunitas kami, silakan hubungi lewat kontak di bawah ini."
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 md:p-12 shadow-2xl mb-16 mt-25">
          <div className="bg-white rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Kirim Pesan
            </h2>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Pesan Terkirim!
                </h3>
                <p className="text-gray-600">
                  Terima kasih, kami akan segera merespons pesan Anda.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Masukan Email Anda
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pilih Kategori Pesan
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                  >
                    <option value="">Pilih kategori...</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Masukan Pesan Anda
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 active:scale-95"
                >
                  Kirim Pesan
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact Cards */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Kontak Kami</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <p className="text-sm text-white/90">
                Hubungi kami melalui WhatsApp
              </p>
            </a>

            <a
              href="https://instagram.com/remaja.tengah"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-pink-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">@remaja.tengah</h3>
              <p className="text-sm text-white/90">
                Lihat lebih banyak video hanya di Instagram kami
              </p>
            </a>

            <a
              href="https://youtube.com/@remajatengah"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Remaja Tengah</h3>
              <p className="text-sm text-white/90">
                Lihat lebih banyak video hanya di kanal kami
              </p>
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Pertanyaan Umum atau FAQ
          </h2>

          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-left font-semibold text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-5 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
    </div>
  );
}
