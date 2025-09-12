import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Hero() {
  const images = [
    "/berita-2.png",
    "/berita-3.png",
    "/berita-4.png",
    "/berita-5.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // auto slide tiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 detik
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="relative w-full mt-30 overflow-hidden h-[350px] bg-black flex items-center justify-center">
      {/* gambar */}
      <motion.img
        key={currentIndex} // supaya animasi tiap pindah slide
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        className="h-[350px] w-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* tombol panah kiri */}
      <button
        onClick={prevSlide}
        className="absolute left-4 bg-white/40 hover:bg-white/60 text-black p-2 rounded-full"
      >
        <FaChevronLeft />
      </button>

      {/* tombol panah kanan */}
      <button
        onClick={nextSlide}
        className="absolute right-4 bg-white/40 hover:bg-white/60 text-black p-2 rounded-full"
      >
        <FaChevronRight />
      </button>
    </section>
  );
}
