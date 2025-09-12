// src/pages/NewsPage.jsx
import Hero from "../components/Hero";
import NewsGrid from "../components/NewsGrid";

export default function NewsPage() {
  return (
    <div>
      {/* Hero di atas */}
      <Hero />

      {/* NewsGrid di bawah */}
      <NewsGrid />
    </div>
  );
}
