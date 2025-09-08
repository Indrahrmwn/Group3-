// src/components/NewsGrid.jsx
import { useState, useEffect } from "react";
import Pagination from "./Pagination";

const newsItems = [
  { src: "https://youtu.be/stxVFMfmDIo", title: "FLS2N 2024 MONOLOG TINGKAT PROVINSI JAWA BARAT BERJUDUL : LEGENDA MBAH JALUN" },
  { src: "https://youtu.be/NTeSYk1OXgc", title: "BENTALA SUKMA - GBSI XI X BEDAH BUKU UMMI KABARET - TEATER KEUDU" },
  { src: "https://youtu.be/GwqR-ZjlEIk", title: "NNK( NGABUBURIT NONTON KABARET) VOL 8 - TEATER KEUDU - ATMA KELABU" },
  { src: "https://youtu.be/2_680MZTxfA", title: "Teater Keudu - Puisi : Aku Tanah ? (Official Video)" },
  { src: "https://youtu.be/jTErGiu2hdU", title: "Teater keudu - Puisi : Aku Tanah ? (official trailer)" },
  { src: "https://youtu.be/vvZv1u0Bgyc", title: "Teater keudu - Musikali Teaterikal Puisi | Belum tidur (feat. Sal Priadi) - (transition version)" },
  { src: "https://youtu.be/haxNR15y5W0", title: "teater keudu - Musikali Teaterikal Puisi | Belum Tidur (feat. Sal Priadi)" },
  { src: "https://youtu.be/Fy7AiOJZgrQ", title: "Trailer Kabaret Hopeless" },
  { src: "https://youtu.be/LBIkQipJaVk", title: "D-Vlog Teater Keudu BTS Lomba Kabaret Piala Gubernur (PART II)" },
  { src: "https://youtu.be/r_8E89lzqmI", title: "D-VLOG Teater Keudu BTS Lomba Kabaret Piala Gubernur (PART I)" },
  { src: "https://youtu.be/_09o0dW86Lg", title: "D-VLOG Teater Keudu h-2 menuju lomba" },
  { src: "https://youtu.be/cqnLIrMi_ms", title: "Piala Gubernur Pelajar Juara 2022 - Kategori Kabaret - SMKN 2 Kota Sukabumi." },
  { src: "https://youtu.be/YxFhx_nQhWY?si=CiUzBeudXoG4iSQI", title: "Teater Keudu - Puisi : Di ujung kata-kata (Dance Contemporary)" },
  { src: "https://youtu.be/QHbnhuR2h1k?si=UfEuAP9YiHUM4qot", title: "Teater Keudu - Puisi : Di ujung kata-kata (Official Video)" },
  { src: "https://youtu.be/xXvtMeLntNk?si=dfJGEjMU3H4ARgwH", title: "Teater Keudu - Puisi : Di ujung kata-kata (official trailer)" },
  // ... sisanya sama kayak punyamu
];

// Helper function ambil ID YouTube
function getYouTubeId(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtu.be")) return urlObj.pathname.slice(1);
    if (urlObj.hostname.includes("youtube.com"))
      return urlObj.searchParams.get("v");
    return null;
  } catch {
    return null;
  }
}

export default function NewsGrid() {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [fade, setFade] = useState(true);

  // bikin animasi tiap kali halaman berubah
  useEffect(() => {
    setFade(false);
    const timer = setTimeout(() => setFade(true), 200);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = newsItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="px-6 py-10">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Semua Berita</h2>

      {/* Grid video dengan animasi Tailwind */}
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white p-6 rounded-xl shadow transform transition-all duration-700 ${
          fade ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      >
        {currentItems.map((item, idx) => {
          const videoId = getYouTubeId(item.src);
          return (
            <div
              key={idx}
              className="overflow-hidden rounded-xl shadow hover:shadow-lg transform transition duration-500 hover:scale-105 bg-white"
            >
              <a href={item.src} target="_blank" rel="noopener noreferrer">
                <img
                  src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-t-md"
                />
                <div className="p-3">
                  <p className="text-center text-gray-800 font-medium">
                    {item.title}
                  </p>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <Pagination totalPages={totalPages} onPageChange={setCurrentPage} />
    </main>
  );
}
