import React from 'react';

export default function DivisionsPage() {
  const divisions = [
    {
      title: "Kabaret",
      description: "Kabaret adalah bentuk seni pertunjukan atau hiburan yang menggabungkan berbagai elemen seperti musik, teater, komedi, dan teater dalam suatu pertunjukan yang saat menghantarkan seorang pembawa acara",
      image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80",
      imagePosition: "left"
    },
    {
      title: "Musikalisasi Puisi",
      description: "Musikalisasi puisi adalah penggabungan seni baca puisi dengan seni musik, di mana puisi adalah menjadi sebuah lagu atau dinyanyikan dengan gitar",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80",
      imagePosition: "right"
    },
    {
      title: "Teater Konvensional",
      description: "Teater konvensional adalah jenis teater tradisional atau sandiwara yang paling umum, yang berfokus pada penyajian cerita yang jelas dengan karakter yang terdefinisi dengan baik, plot yang sudah ditulis, dan interaksi karakter, tanpa terikat pada struktur baku seperti teater tradisional atau eksperimental lainnya.",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
      imagePosition: "left"
    },
    {
      title: "Tari Kontemporer",
      description: "Tari kontemporer adalah gaya tarian modern yang tidak terikat aturan formal (tidak baku). Menggabungkan gerakan yang bebas, spontan dan luwes (lentur), dan merupakan berbagai teknik dari balet, tari modern, jazz, hingga untuk tradisional dari tarian yang telah menyampaikan pesan, emosi, atau isu sosial masa kini",
      image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&q=80",
      imagePosition: "right"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-200 py-16">
        <h1 className="text-5xl font-bold text-center text-gray-900">Divisions</h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Divisi Kami Title */}
        <div className="relative mb-16">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-red-600"></div>
            <h2 className="px-6 text-3xl font-bold text-red-600">Divisi Kami</h2>
            <div className="flex-1 h-px bg-red-600"></div>
          </div>
        </div>

        {/* Divisions List */}
        <div className="space-y-20">
          {divisions.map((division, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                division.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
              } items-center gap-8 bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 shadow-lg border border-gray-100`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative overflow-hidden rounded-xl shadow-lg group">
                  <img
                    src={division.image}
                    alt={division.title}
                    className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold text-gray-900">{division.title}</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {division.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}