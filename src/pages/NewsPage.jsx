// src/pages/NewsPage.jsx
import Hero from "../components/Hero";
import NewsGrid from "../components/NewsGrid";

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero di atas */}
      <Hero />

      {/* NewsGrid di bawah */}
      <NewsGrid />

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
