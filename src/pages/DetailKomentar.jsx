export default function DetailKomentar() {
  const comments = [
    {
      stars: 5,
      date: "5 hari yang lalu",
      email: "jamal5@gmail.com",
      comment:
        "Lokakarya ini benar-benar luar biasa! Saya jadi lebih percaya diri tampil di atas panggung.",
    },
    {
      stars: 4,
      date: "4 hari yang lalu",
      email: "jamal4@gmail.com",
      comment:
        "Sangat bermanfaat, meskipun ada beberapa bagian yang bisa ditingkatkan.",
    },
    {
      stars: 3,
      date: "3 hari yang lalu",
      email: "jamal3@gmail.com",
      comment:
        "Cukup membantu, tapi saya merasa masih ada materi yang kurang mendalam.",
    },
    {
      stars: 2,
      date: "2 hari yang lalu",
      email: "jamal2@gmail.com",
      comment:
        "Kurang sesuai dengan ekspektasi saya, walaupun tetap ada hal baru yang saya pelajari.",
    },
    {
      stars: 1,
      date: "1 hari yang lalu",
      email: "jamal1@gmail.com",
      comment: "Kurang puas, mungkin bisa lebih interaktif lagi ke depannya.",
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Filter kategori */}
      <div className="sticky top-[80px] z-20 bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-5 flex gap-6">
          <select className="border border-gray-400 px-8 py-5 rounded-xl text-lg font-semibold bg-white shadow-md">
            <option>All Kategori</option>
          </select>
          <select className="border border-gray-400 px-8 py-5 rounded-xl text-lg font-semibold bg-white shadow-md">
            <option>All Kategori</option>
          </select>
        </div>
      </div>

      {/* Komentar */}
      <div className="max-w-5xl mx-auto px-4 pb-16 space-y-6 mt-20">
        {comments.map((item, idx) => {
          const isHighlighted = item.stars === 5 || item.stars === 4; // merah hanya untuk 5 & 4
          return (
            <div
              key={idx}
              className={`rounded-2xl shadow-md p-6 flex gap-6 items-start ${
                isHighlighted
                  ? "bg-red-700 text-white"
                  : "bg-white border border-gray-300"
              }`}
            >
              {/* Avatar */}
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black text-white text-4xl flex-shrink-0">
                👤
              </div>

              {/* Isi */}
              <div className="flex-1">
                {/* Bintang */}
                <div className="flex text-yellow-400 mb-2 text-xl">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < item.stars ? "★" : "☆"}</span>
                  ))}
                </div>

                <p className="text-base mb-1">{item.date}</p>
                <p
                  className={`text-base mb-2 ${
                    isHighlighted ? "text-gray-200" : "text-gray-500"
                  }`}
                >
                  {item.email}
                </p>
                <p className="text-lg italic leading-relaxed">“{item.comment}”</p>
              </div>
            </div>
          );
        })}
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
    </div>
  );
}
