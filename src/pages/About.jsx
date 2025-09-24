import React from "react";
import Gambar from "/berita-1.png";

export default function About() {
  return (
    <section className="w-full mt-25 flex flex-col min-h-screen">
      {/* Banner atas */}
      <div
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url("/berita-1.png")`,
        }}
      >
        <h1 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
          Tentang Remaja Tengah
        </h1>
      </div>

      {/* Bagian: Remaja Tengah */}
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Kolom kiri */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Apa sih Remaja Tengah itu ?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Remaja Tengah adalah komunitas teater remaja yang dinamis dan
              berdedikasi untuk mengembangkan bakat-bakat muda. Misi kami adalah
              menyediakan ruang kreatif bagi para remaja untuk mengekspresikan
              diri melalui seni pertunjukan. Kami bertujuan untuk menumbuhkan
              rasa percaya diri, kreativitas, dan kolaborasi di antara para
              anggota kami.
            </p>
          </div>

          {/* Kolom kanan */}
          <div className="bg-gray-300 w-full h-64 md:h-72 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Gambar di sini</span>
          </div>
        </div>
      </div>

      {/* Bagian: Sekilas tentang kami */}
      <div className="bg-red-700 py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Sekilas Tentang Kami
          </h2>
          <p className="text-white leading-relaxed text-lg mb-10">
            SMKN 2 Sukabumi adalah lembaga pendidikan kejuruan yang menyediakan
            program-program unggulan dalam bidang Akuntansi dan Keuangan Lembaga,
            Manajemen Perkantoran dan Layanan Bisnis, Pemasaran, Pengembangan
            Perangkat Lunak dan Gim, serta Teknik Jaringan Komputer dan
            Telekomunikasi. Kami bertujuan untuk melatih siswa menjadi ahli di
            bidangnya dengan menggabungkan kurikulum terkini dengan praktik
            langsung. Dengan fasilitas modern dan tenaga pengajar yang
            berkualitas, kami mempersiapkan siswa untuk sukses dalam karir mereka
            dan berkontribusi pada perkembangan industri di Indonesia.
          </p>

          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">9.999+</h3>
              <p className="text-white mt-2">Anggota</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">3.999+</h3>
              <p className="text-white mt-2">Anggota Aktif</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">4</h3>
              <p className="text-white mt-2">Jenis Bidang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian: Prestasi Kejuaraan (versi IG style) */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Prestasi Kami dalam Aksi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card Prestasi dengan Video */}
          <div className="border rounded-lg shadow-md overflow-hidden bg-white">
            {/* Header IG */}
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-400 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">Remaja Tengah</p>
                  <p className="text-xs text-gray-500">Sukabumi</p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/remaja.tengah?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm font-semibold hover:underline"
              >
                View Profile
              </a>
            </div>

            {/* Video Post */}
            <div className="h-64 bg-black flex items-center justify-center">
              <video
                src="/src/assets/Gambar Website/bahala iblis.png"
                controls
                className="w-full h-full object-cover"
              />
            </div>

            {/* Footer IG */}
            <div className="px-4 py-3 border-t">
              <a
                href="https://www.instagram.com/reel/DOirnW0CWIC/?utm_source=ig_web_copy_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm font-medium hover:underline"
              >
                View more on Instagram
              </a>

              <p className="text-sm mt-2">+250 Likes</p>

              <div className="flex gap-4 text-lg mt-2">
                <span>❤️</span>
                <span>💬</span>
                <span>📤</span>
              </div>

              <input
                type="text"
                placeholder="Add a comment..."
                className="mt-2 w-full border rounded px-2 py-1 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Card Prestasi Foto */}
          {[1, 2].map((item) => (
            <div
              key={item}
              className="border rounded-lg shadow-md overflow-hidden bg-white"
            >
          {/* Header IG */}
          <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="flex items-center gap-2">
          {/* FOTO PROFIL */}
         <img
         src="/src/assets/Gambar Website/" // ganti path sesuai foto kamu
         alt="Remaja Tengah"
         className="w-8 h-8 rounded-full object-cover"
         />
        <div>
        < p className="text-sm font-semibold">Remaja Tengah</p>
        <p className="text-xs text-gray-500">Sukabumi</p>
        </div>
        </div>
        <a
        href="https://www.instagram.com/remaja.tengah?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-sm font-semibold hover:underline"
        >
        View Profile
       </a>
</div>
              {/* Gambar Post */}
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Foto Prestasi</span>
              </div>

              {/* Footer IG */}
              <div className="px-4 py-3 border-t">
                <a
                  // Contoh: bisa diganti ke postingan IG yang sesuai
                  href="https://www.instagram.com/reel/DOirnW0CWIC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  View more on Instagram
                </a>

                <p className="text-sm mt-2">+100 Likes</p>

                <div className="flex gap-4 text-lg mt-2">
                  <span>❤️</span>
                  <span>💬</span>
                  <span>📤</span>
                </div>

                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="mt-2 w-full border rounded px-2 py-1 text-sm focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer sama persis kaya LandingPage */}
      <footer className="bg-[#2E3A44] text-white py-12 mt-auto">
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
    </section>
  );
}
