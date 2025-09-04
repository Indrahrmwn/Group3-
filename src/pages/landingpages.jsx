import GambarLanding from "../assets/Gambar Website/gambar-landing.jpg";
import Gambar2 from "../assets/Gambar Website/hoki.jpg";

export default function LandingPage() {
  return (
    <>
      <section className="pt-28 px-8 md:px-16 py-12 bg-white">
        {/* Bagian Atas */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Kiri: Teks */}
          <div className="flex flex-col gap-4">
            <div className="inline-block bg-gray-200 text-gray-700 text-sm px-4 py-1 rounded-full">
              Komunitas Teater • Terbuka untuk Remaja
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-snug">
              Temukan Panggungmu <br /> bersama Remaja Tengah
            </h1>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Kami adalah komunitas teater yang mewadahi remaja untuk belajar
              akting, menulis naskah, dan mementaskan karya. Tanpa syarat
              pengalaman — cukup bawa rasa ingin tahu dan keberanian.
            </p>
            <button
              className=" bg-gray-200 text-gray-800 px-6 py-2 rounded-md w-fit mt-4
              transition-all duration-300 ease-out
              font-bold
              hover:scale-105 hover:shadow-lg hover:bg-gray-300
              focus:outline-none active:scale-95"
            >
              Bergabung Sekarang
            </button>
          </div>

          {/* Kanan: Gambar */}
          <div className="flex justify-center">
            <img
              src={GambarLanding}
              alt="Remaja Tengah"
              className="rounded-2xl w-full max-w-md object-cover"
            />
          </div>
        </div>

        {/* Bagian Bawah: Apa yang Kamu Dapat */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Apa yang Kamu Dapat?</h2>
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
                Ikut pementasan & produksi, dokumentasi rapi untuk CV/Beasiswa.
              </p>
            </div>
          </div>
        </div>

        {/* Bagian Beli Tiket */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Beli Tiket</h2>
          <div
            className="max-w-xs bg-gray-200 rounded-md shadow-md 
            transform transition-all duration-300 ease-out 
            hover:scale-105 hover:shadow-xl hover:bg-gray-300"
          >
            <img
              src={Gambar2}
              alt="Tiket Teater"
              className="w-full h-40 object-cover rounded-t-md"
            />
            <div className="p-4">
              <p className="font-bold text-gray-800 mb-1">Tiket Teater</p>
              <p className="text-right font-semibold text-gray-900">Rp.40.000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-4 gap-8">
          {/* Kolom 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Remaja Tengah</h3>
            <ul className="space-y-2 text-sm">
              <li>Tentang Remaja Tengah</li>
              <li>Berita</li>
            </ul>
          </div>

          {/* Kolom 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">METODE PEMBAYARAN</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-white text-black text-center p-2 rounded">Mandiri</div>
              <div className="bg-white text-black text-center p-2 rounded">BCA</div>
              <div className="bg-white text-black text-center p-2 rounded">BNI</div>
              <div className="bg-white text-black text-center p-2 rounded">BRI</div>
              <div className="bg-white text-black text-center p-2 rounded">Visa</div>
              <div className="bg-white text-black text-center p-2 rounded">OVO</div>
            </div>
          </div>

          {/* Kolom 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4">BANTUAN & PANDUAN</h3>
            <ul className="space-y-2 text-sm">
              <li>Pusat Bantuan Remaja Tengah</li>
              <li>Syarat & Ketentuan</li>
              <li>Kebijakan Privasi</li>
            </ul>
          </div>

          {/* Kolom 4 */}
          <div>
            <h3 className="font-bold text-lg mb-4">FOLLOW US</h3>
            <div className="flex gap-4 mb-4">
              <span>🌐</span>
              <span>🐦</span>
              <span>📸</span>
            </div>
            <h3 className="font-bold text-lg mb-4">UNDUH APLIKASI KAMI</h3>
            <div className="flex gap-2">
              <div className="bg-black text-white px-3 py-2 rounded text-xs">
                App Store
              </div>
              <div className="bg-black text-white px-3 py-2 rounded text-xs">
                Google Play
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 text-center py-4 text-sm">
          ©2025 Auto360 | All Rights Reserved
        </div>
      </footer>
    </>
  );
}