import { motion } from "framer-motion";

const MotionImg = motion.img; // bikin motion versi <img>

export default function Hero() {
  const images = [
    "/remaja-tengah.png",
    "/berita-2.png",
    "/berita-3.png",
    "/berita-4.png",
    "/berita-5.png",
  ];

  return (
    <section className="w-full mt-6 overflow-hidden h-[350px] bg-black flex items-center">
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 40, // makin lama makin santai
          delay: 1,
          repeat: Infinity,
        }}
      >
        {images.concat(images).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`hero-${i}`}
            className="h-[350px] w-auto object-cover flex-shrink-0 mx-2 rounded-lg shadow-lg"
          />
        ))}
      </motion.div>
    </section>
  );
}