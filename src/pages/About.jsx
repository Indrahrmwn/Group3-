import React from "react";
import Gambar from "/berita-1.png"

export default function About() {
  return (
    <section className="w-full mt-25">
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
    </section>
  );
}