import React, { useState } from "react";

export default function About() {
  const [likes, setLikes] = useState({
    post1: 250,
    post2: 180,
    post3: 320,
  });

  const [isLiked, setIsLiked] = useState({
    post1: false,
    post2: false,
    post3: false,
  });

  const handleLike = (postId) => {
    setIsLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    setLikes((prev) => ({
      ...prev,
      [postId]: prev[postId] + (isLiked[postId] ? -1 : 1),
    }));
  };

  const instagramPosts = [
    {
      id: "post1",
      type: "video",
      media: "/src/assets/Gambar Website/bahala iblis.png",
      caption: "🎭 Penampilan Bahala Iblis yang memukau! Terima kasih atas dukungannya.",
      postUrl: "https://www.instagram.com/reel/DOirnW0CWIC/?utm_source=ig_web_copy_link&igsh=ZDE5cHEzMm9udzlj",
      likes: likes.post1,
      comments: 45,
    },
    {
      id: "post2",
      type: "video",
      media: "/src/assets/Gambar Website/prestasi1.jpg",
      caption: "🏆 Juara 1 Festival Teater Jawa Barat 2024! #ProudMoment",
      postUrl: "https://www.instagram.com/reel/DOgP_KNAT_u/?utm_source=ig_web_copy_link&igsh=aGQyOThvcnN5YzZy",
      likes: likes.post2,
      comments: 32,
    },
    {
      id: "post3",
      type: "video",
      media: "/src/assets/Gambar Website/prestasi2.jpg",
      caption: "✨ Behind the scenes dari latihan kami. Dedikasi tanpa batas!",
      postUrl: "https://www.instagram.com/reel/DN4uXa3j2Gv/?utm_source=ig_web_copy_link&igsh=ejQ2ZnRxdGo4MnF3",
      likes: likes.post3,
      comments: 28,
    },
  ];

  return (
    <section className="w-full mt-25 flex flex-col min-h-screen">
      {/* Banner atas */}
      <div
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url("/berita-1.png")`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative text-white text-3xl md:text-5xl font-bold drop-shadow-2xl">
          Tentang Remaja Tengah
        </h1>
      </div>

      {/* Bagian: Remaja Tengah */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Kolom kiri */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Apa sih Remaja Tengah itu?
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Remaja Tengah adalah komunitas teater remaja yang dinamis dan
              berdedikasi untuk mengembangkan bakat-bakat muda. Misi kami adalah
              menyediakan ruang kreatif bagi para remaja untuk mengekspresikan
              diri melalui seni pertunjukan.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Kami bertujuan untuk menumbuhkan rasa percaya diri, kreativitas, dan 
              kolaborasi di antara para anggota kami, menciptakan lingkungan yang 
              mendukung perkembangan artistik setiap individu.
            </p>
          </div>

          {/* Kolom kanan */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-red-100 to-red-200 w-full h-80 rounded-2xl flex items-center justify-center overflow-hidden shadow-xl">
              <img
                src="/src/assets/Gambar Website/about-image.jpg"
                alt="Remaja Tengah"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="text-gray-500 text-lg">Foto Komunitas</span>';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bagian: Sekilas tentang kami */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-20">
        <div className="container mx-auto px-4 text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Sekilas Tentang Kami
          </h2>
          <p className="text-white leading-relaxed text-lg mb-12 max-w-4xl mx-auto">
            SMKN 2 Sukabumi adalah lembaga pendidikan kejuruan yang menyediakan
            program-program unggulan dalam bidang Akuntansi dan Keuangan
            Lembaga, Manajemen Perkantoran dan Layanan Bisnis, Pemasaran,
            Pengembangan Perangkat Lunak dan Gim, serta Teknik Jaringan Komputer
            dan Telekomunikasi. Kami bertujuan untuk melatih siswa menjadi ahli
            di bidangnya dengan menggabungkan kurikulum terkini dengan praktik
            langsung. Dengan fasilitas modern dan tenaga pengajar yang
            berkualitas, kami mempersiapkan siswa untuk sukses dalam karir
            mereka dan berkontribusi pada perkembangan industri di Indonesia.
          </p>

          {/* Statistik */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-5xl font-bold text-yellow-300 mb-2">9.999+</h3>
              <p className="text-white text-lg font-medium">Anggota</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-5xl font-bold text-yellow-300 mb-2">3.999+</h3>
              <p className="text-white text-lg font-medium">Anggota Aktif</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-5xl font-bold text-yellow-300 mb-2">4</h3>
              <p className="text-white text-lg font-medium">Jenis Bidang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
              <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Follow Our Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Prestasi Kami dalam Aksi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Saksikan momen-momen terbaik kami di panggung dan raih inspirasi dari perjalanan seni kami
            </p>
          </div>

          {/* Instagram Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instagramPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Header IG Style */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="/src/assets/Gambar Website/remajatengah.png"
                        alt="Remaja Tengah"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-500 ring-offset-2"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">remaja.tengah</p>
                      <p className="text-xs text-gray-500">Sukabumi, Indonesia</p>
                    </div>
                  </div>
                  <a
                    href="https://www.instagram.com/remaja.tengah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Media Content */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
                  {post.type === "video" ? (
                    <video
                      src={post.media}
                      controls
                      className="w-full h-full object-cover"
                      poster="/src/assets/Gambar Website/video-thumbnail.jpg"
                    />
                  ) : (
                    <img
                      src={post.media}
                      alt="Instagram post"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Remaja+Tengah";
                      }}
                    />
                  )}
                  {post.type === "video" && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        Reel
                      </span>
                    </div>
                  )}
                </div>

                {/* Interaction Section */}
                <div className="px-4 py-3">
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="group transition-transform hover:scale-110 active:scale-95"
                      >
                        <svg
                          className={`w-6 h-6 transition-colors ${
                            isLiked[post.id]
                              ? "fill-red-500 text-red-500"
                              : "fill-none text-gray-700 group-hover:text-red-500"
                          }`}
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                      <button className="group transition-transform hover:scale-110 active:scale-95">
                        <svg className="w-6 h-6 text-gray-700 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                      <button className="group transition-transform hover:scale-110 active:scale-95">
                        <svg className="w-6 h-6 text-gray-700 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                    <button className="group transition-transform hover:scale-110 active:scale-95">
                      <svg className="w-6 h-6 text-gray-700 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>

                  {/* Likes Count */}
                  <p className="text-sm font-bold text-gray-900 mb-2">
                    {post.likes.toLocaleString()} likes
                  </p>

                  {/* Caption */}
                  <div className="mb-2">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">remaja.tengah</span> {post.caption}
                    </p>
                  </div>

                  {/* Comments Link */}
                  <button className="text-sm text-gray-500 hover:text-gray-700 mb-3">
                    View all {post.comments} comments
                  </button>

                  {/* View on Instagram Link */}
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group"
                  >
                    <span>View on Instagram</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Follow CTA */}
          <div className="mt-12 text-center">
            <a
              href="https://www.instagram.com/remaja.tengah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Follow @remaja.tengah on Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2E3A44] text-white py-12 mt-auto">
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
              Enter your email. By subscribing, you agree to our Privacy Policy and receive updates.
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