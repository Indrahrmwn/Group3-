import React from "react";
import Gambar from "/berita-1.png"

export default function About() {
  return (
    <section className="w-full mt-25">
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

      {/* Bagian bawah: konten */}
      <div className="container mx-auto px-4 py-12">
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
    </section>
  );
}