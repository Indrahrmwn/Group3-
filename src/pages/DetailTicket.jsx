import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DetailTicket() {
   // Fetch tickets dari API
  const fetchTickets = async () => {
    try {
      setTicketsLoading(true);
      setTicketsError(null);
      
      const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/tickets`;
      console.log('Fetching tickets from:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseText = await response.text();
      
      if (!responseText.trim()) {
        throw new Error('Server mengembalikan response kosong');
      }
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Invalid JSON response: ${parseError.message}`);
      }
      
      if (data.status === 'success') {
        setTickets(data.data || []);
        console.log('Tickets loaded:', data.data?.length || 0);
      } else {
        throw new Error(data.message || 'API returned error status');
      }
      
    } catch (err) {
      setTicketsError(err.message);
      console.error('Error fetching tickets:', err);
    } finally {
      setTicketsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // State untuk tickets dari API
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [ticketsError, setTicketsError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data untuk demo (nanti bisa diganti dengan API)
  const mockTicket = {
    id: id,
    ticket_name: "Gebyar",
    title: "Drama Musikal Cinta di Ujung Senja", 
    description: "Pertunjukan drama musikal yang mengisahkan tentang cinta yang tumbuh di masa-masa sulit. Sebuah karya yang memadukan akting, musik, dan tari dalam satu pertunjukan yang memukau.",
    price: 15000,
    event_date: "2025-10-05",
    event_time: "19:00 - 21:00 WIB", 
    location: "SMKN 2 SUKABUMI",
    address: "Jl. Raya Sukabumi No.123, Sukabumi, Jawa Barat",
    category: "Drama Musikal",
    quantity_available: 15,
    image_url: "storage/tickets/gebyar.jpg" // Sesuaikan dengan path dari backend
  };

  // Helper function untuk build image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    if (imagePath.startsWith('storage/')) {
      return `${baseUrl}/${imagePath}`;
    }
    
    return `${baseUrl}/${imagePath}`;
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
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
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

            {/* Action Buttons - DIHAPUS */}
            
          </div>
        </div>

        {/* Ticket Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-yellow-500 pl-3">
                Pilih Tiket
              </h3>
              
              {/* Loading state untuk tickets */}
              {ticketsLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700"></div>
                  <span className="ml-3 text-gray-600">Memuat pilihan tiket...</span>
                </div>
              )}

              {/* Error state untuk tickets */}
              {ticketsError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p className="text-sm">{ticketsError}</p>
                  <button 
                    onClick={fetchTickets}
                    className="mt-2 bg-red-700 text-white px-3 py-1 rounded text-sm hover:bg-red-800"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}
              
              {/* Tampilan tickets dari database */}
              {!ticketsLoading && !ticketsError && tickets.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tickets.map((ticket) => (
                    <div 
                      key={ticket.id}
                      className="bg-gradient-to-b from-red-400 to-red-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102"
                    >
                      <div className="p-4 text-white relative">
                        {/* Decorative elements */}
                        <div className="absolute top-2 left-2">
                          <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                        </div>
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
                        </div>
                        
                        {/* Ticket image if available */}
                        {ticket.image_url && (
                          <div className="mb-3">
                            <img
                              src={getImageUrl(ticket.image_url)}
                              alt={ticket.ticket_name || ticket.title}
                              className="w-full h-20 object-cover rounded opacity-80"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="text-center mb-3">
                          <div className="text-xs font-semibold bg-black bg-opacity-30 rounded-full px-2 py-1 mb-2">
                            {ticket.category?.toUpperCase() || 'EVENT TICKET'}
                          </div>
                          <div className="text-lg font-bold mb-1">
                            {(ticket.ticket_name || ticket.title || '').split(' ')[0]?.toUpperCase()}
                          </div>
                          <div className="text-lg font-bold mb-1">
                            {(ticket.ticket_name || ticket.title || '').split(' ')[1]?.toUpperCase()}
                          </div>
                          <div className="text-lg font-bold">
                            {(ticket.ticket_name || ticket.title || '').split(' ').slice(2).join(' ').toUpperCase()}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">{formatPrice(ticket.price)}</div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4">
                        <div className="text-center">
                          <div className="font-semibold text-gray-800 mb-2">
                            {ticket.ticket_name || ticket.title}
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            {ticket.event_date ? 
                              new Date(ticket.event_date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long'
                              }) : 
                              'Tanggal akan diumumkan'
                            }
                          </div>
                          <div className="text-xs text-gray-500 mb-3">
                            Sisa: {ticket.quantity_available || ticket.stock || 0} tiket
                          </div>
                          <button 
                            className={`w-full font-semibold py-2 px-4 rounded transition-colors ${
                              (ticket.quantity_available || ticket.stock) > 0
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={(ticket.quantity_available || ticket.stock) === 0}
                            onClick={() => {
                              if ((ticket.quantity_available || ticket.stock) > 0) {
                                console.log(`Tiket ${ticket.id} dipilih`);
                                // Navigate to checkout atau buka modal pembayaran
                              }
                            }}
                          >
                            {(ticket.quantity_available || ticket.stock) > 0 ? 'Pilih Tiket' : 'Habis'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Jika tidak ada tiket */}
              {!ticketsLoading && !ticketsError && tickets.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg mb-2">Belum Ada Tiket Tersedia</p>
                  <p className="text-gray-400 text-sm">Pilihan tiket akan segera tersedia</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}