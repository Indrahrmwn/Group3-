import { useState, useEffect } from "react";

export default function TiketUser() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      const response = await fetch(`${apiUrl}/api/my-tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }

      const data = await response.json();
      setTickets(data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError(err.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return tickets.reduce((sum, ticket) => sum + (ticket.total || 0), 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100">
      <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
            <span>Home</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-semibold">My Tickets</span>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">My Tickets</h1>
              <p className="text-white/80 text-lg">Manage and view all your event tickets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Total Tickets</p>
                  <p className="text-3xl font-bold text-white">{tickets.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Events Attended</p>
                  <p className="text-3xl font-bold text-white">{new Set(tickets.map(t => t.event_name)).size}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(calculateTotal())}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 pb-12 relative z-20">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {tickets.length > 0 ? (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">{ticket.ticket_name || 'Regular Ticket'}</p>
                        <p className="text-lg font-bold text-gray-900">{ticket.user_name || ticket.nama || 'Anonymous'}</p>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                          <p className="text-xs text-gray-500 font-semibold uppercase">Event</p>
                        </div>
                        <p className="font-semibold text-gray-900">{ticket.event_name || ticket.event || 'No Event Name'}</p>
                        <p className="text-sm text-gray-600">{ticket.info || ticket.ticket_type || 'Online Ticket'}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-gray-500 font-semibold uppercase">Session</p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {ticket.session_time || ticket.sesi || formatDate(ticket.event_date)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Purchased: {formatDate(ticket.created_at || ticket.tanggal)}
                        </p>
                      </div>
                    </div>

                    <div className="flex lg:flex-col items-center lg:items-end gap-4">
                      <div className="flex flex-col items-center lg:items-end gap-2">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 ${
                          ticket.status?.toLowerCase() === 'sukses' || ticket.status?.toLowerCase() === 'success' || ticket.payment_status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : ticket.status?.toLowerCase() === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          <div className={`w-2 h-2 rounded-full animate-pulse ${
                            ticket.status?.toLowerCase() === 'sukses' || ticket.status?.toLowerCase() === 'success' || ticket.payment_status === 'paid'
                              ? 'bg-green-500'
                              : ticket.status?.toLowerCase() === 'pending'
                              ? 'bg-yellow-500'
                              : 'bg-gray-500'
                          }`}></div>
                          {ticket.status || ticket.payment_status || 'Pending'}
                        </span>
                        <p className="text-2xl font-bold text-red-600">
                          {formatCurrency(ticket.total || ticket.price || 0)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                    <button className="flex-1 min-w-[140px] px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Invoice
                    </button>
                    
                    <button className="flex-1 min-w-[140px] px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Ticket
                    </button>
                  </div>
                </div>

                <div className="h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Tickets Yet</h3>
            <p className="text-gray-600 mb-8">You haven't purchased any tickets. Start exploring events!</p>
            <a 
              href="/detail-ticket"
              className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300"
            >
              Browse Events
            </a>
          </div>
        )}
      </div>
    </div>
  );
}