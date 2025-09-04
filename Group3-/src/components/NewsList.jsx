export default function NewsGrid() {
  const news = [
    { id: 1, title: "Berita 1", image: "/berita1.png" },
    { id: 2, title: "Berita 2", image: "/berita2.png" },
    { id: 3, title: "Berita 3", image: "/berita3.png" },
    { id: 4, title: "Berita 4", image: "/berita4.png" },
    { id: 5, title: "Berita 5", image: "/berita5.png" },
    { id: 6, title: "Berita 6", image: "/berita6.png" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-lg font-semibold mb-4">Semua Berita</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <div key={item.id} className="shadow-md rounded-lg overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-2">
              <h3 className="text-sm font-medium">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
