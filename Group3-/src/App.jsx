import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewsGrid from "./components/NewsGrid";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <NewsGrid />
    </div>
  );
}
