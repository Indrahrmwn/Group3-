import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DetailTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data untuk demo (nanti bisa diganti dengan API)
  const mockTicket = {
    id: id,
    ticket_name: "Indonesia Motorcycle Show 2025",
    title: "Indonesia Motorcycle Show 2025",
    description: "The premier motorcycle exhibition in Indonesia, showcasing the latest innovations, technologies, and products from leading motorcycle brands and industry players. Visitors can explore a wide range of motorcycles, accessories, riding gear, and supporting industries, while enjoying interactive programs, test rides, and special promotions.",
    price: 150000,
    event_date: "2025-09-24",
    event_time: "09:00 - 18:00 WIB",
    location: "ICE - BSD City",
    address: "Jl. BSD Grand Boulevard Raya No.1, BSD City, Tangerang, 15339",
    category: "Exhibition",
    quantity_available: 500,
    image_url: null
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 mt-7">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
      </div>

      {/* Event Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          
          {/* Header Image */}
          <div className="relative h-64 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 text-white">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            
            <div className="absolute top-4 right-4 text-white">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 13.5L8.5 16l3.5-2.5 3.5 2.5-3.5-2.5z"/>
              </svg>
            </div>

            {/* Main Title */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-1xl md:text-3xl font-bold text-white mb-2 transform -skew-y-1 bg-black bg-opacity-50 px-6 py-2 rounded">
                  INDONESIA
                </h1>
                <h2 className="text-1xl md:text-3xl font-bold text-white mb-2 transform -skew-y-1 bg-black bg-opacity-50 px-6 py-2 rounded">
                  MOTORCYCLE
                </h2>
                <h3 className="text-1xl md:text-3xl font-bold text-white transform -skew-y-1 bg-black bg-opacity-50 px-6 py-2 rounded">
                  SHOW
                </h3>
              </div>
            </div>

            {/* Date Badge */}
            <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 rounded-lg p-4 text-center min-w-32">
              <div className="text-3xl font-bold text-red-600">24-28</div>
              <div className="text-lg font-bold text-red-600">SEPT <span className="text-orange-500">2025</span></div>
              <div className="text-sm font-semibold text-gray-600 mt-1">ICE-BSD CITY</div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-4 left-4 text-yellow-400">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{mockTicket.title}</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Description */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-yellow-500 pl-3">
                  Deskripsi
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {mockTicket.description}
                </p>

                {/* Additional Info */}
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-2">Informasi Tambahan</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Event ini cocok untuk semua kalangan pecinta otomotif</li>
                    <li>• Tersedia area parkir yang luas</li>
                    <li>• Food court dan area istirahat tersedia</li>
                    <li>• Tiket sudah termasuk akses ke semua area pameran</li>
                  </ul>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 text-gray-500 mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{mockTicket.location}</div>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 text-gray-500 mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">24 - 28 September 2025</div>
                    <div className="text-sm text-gray-600">{mockTicket.event_time}</div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 text-gray-500 mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">{mockTicket.address}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 text-gray-500 mt-0.5">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 7.41L14 10l-2 2 2 2-0.59 0.59L12 13.17l-1.41 1.42L10 14l2-2-2-2 0.59-0.59L12 10.83l1.41-1.42z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-lg">{formatPrice(mockTicket.price)}</div>
                    <div className="text-sm text-gray-600">Sisa {mockTicket.quantity_available} tiket</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-3 justify-center md:justify-start">
              <button 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                onClick={() => {
                  console.log('Proceed to checkout for ticket:', mockTicket.id);
                  // Nanti bisa navigate ke halaman checkout
                }}
              >
                Beli Tiket Sekarang
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}