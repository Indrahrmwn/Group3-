import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function TicketStep({ onNext }) {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [session, setSession] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const preSelectedTicketId = searchParams.get("ticketId");

  // Fetch tickets dari API
  useEffect(() => {
      console.log("🎫 Props preSelectedTicketId:", preSelectedTicketId);
    }, [preSelectedTicketId]);
  useEffect(() => {
    fetchTickets();
  }, []);

    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/tickets');
        const data = await response.json();
        console.log("📦 All tickets:", data.data);
        setTickets(data.data || []);
        
        if (data.data && data.data.length > 0) {
          if (preSelectedTicketId) {
            console.log("🔍 Looking for ticket with ID:", preSelectedTicketId);
            const preSelected = data.data.find(t => t.id === parseInt(preSelectedTicketId));
            console.log("✅ Found ticket:", preSelected);
            setSelectedTicket(preSelected || data.data[0]);
          } else {
            console.log("⚠️ No preSelectedTicketId, using first ticket");
            setSelectedTicket(data.data[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };
  

  useEffect(() => {
  if (selectedTicket && session && quantity > 0) {
    onNext?.({
      ticketId: selectedTicket.id,
      ticketName: selectedTicket.ticket_name,
      price: selectedTicket.price,
      session,
      quantity,
      total: selectedTicket.price * quantity
    });
  }
}, [selectedTicket, session, quantity, onNext]); // ❌ onNext berubah setiap render!

  if (loading) {
    return (
      <div className="bg-red-700 p-6 md:p-10 rounded-3xl max-w-3xl mx-auto">
        <p className="text-white text-center">Memuat data tiket...</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-red-700 p-6 md:p-10 rounded-3xl max-w-3xl mx-auto">
        <p className="text-white text-center">Tidak ada tiket tersedia</p>
      </div>
    );
  }

  return (
    <div className="bg-red-700 p-6 md:p-10 rounded-3xl max-w-3xl mx-auto space-y-6">
      {/* Search/Select Ticket */}
      <select
        value={selectedTicket?.id || ""}
        onChange={(e) => {
          const ticket = tickets.find(t => t.id === parseInt(e.target.value));
          setSelectedTicket(ticket);
          setQuantity(0);
          setSession("");
        }}
        className="w-full rounded-full px-4 py-2 text-sm bg-white text-gray-700"
      >
        <option value="">Pilih Tiket</option>
        {tickets.map(ticket => (
          <option key={ticket.id} value={ticket.id}>
            {ticket.ticket_name} - Rp {ticket.price.toLocaleString('id-ID')}
          </option>
        ))}
      </select>

      {selectedTicket && (
        <>
          {/* Card Tiket */}
          <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-md">
            {/* Gambar */}
            <div className="relative">
              <img
                src={selectedTicket.photo ? `http://localhost:8000/storage/${selectedTicket.photo}` : 'https://placehold.co/200x200?text=No+Image'}
                alt={selectedTicket.ticket_name}
                className="w-48 h-48 object-cover rounded-md"
              />
              <span className="absolute bottom-2 left-2 bg-gray-200 px-2 py-1 text-xs rounded-md font-medium">
                {selectedTicket.ticket_name}
              </span>
            </div>

            {/* Info tiket */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{selectedTicket.ticket_name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(selectedTicket.event_date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-gray-600 mt-1">{selectedTicket.location}</p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  Tersedia: {selectedTicket.quantity_available - selectedTicket.quantity_sold} tiket
                </p>
                <p className="text-lg font-bold text-red-600 mt-2">
                  Rp {selectedTicket.price.toLocaleString('id-ID')}
                </p>
              </div>

              {/* Deskripsi */}
              {selectedTicket.description && (
                <p className="text-xs text-gray-600">{selectedTicket.description}</p>
              )}

              

              {/* Input sesi */}
              <div className="relative w-full">
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm appearance-none pr-8"
                >
                  <option value="">Pilih Sesi</option>
                  {/* <option value="Pagi-Siang">Pagi-Siang</option>
                  <option value="Siang-Sore">Siang-Sore</option>
                  <option value="Malam">Malam</option> */}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  ▼
                </span>
              </div>

              {/* Counter tiket */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  -
                </button>
                <span className="font-semibold">{quantity}</span>
                <button
                  onClick={() => {
                    const maxAvailable = selectedTicket.quantity_available - selectedTicket.quantity_sold;
                    if (quantity < maxAvailable) {
                      setQuantity(quantity + 1);
                    }
                  }}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  disabled={quantity >= (selectedTicket.quantity_available - selectedTicket.quantity_sold)}
                >
                  +
                </button>
                <span className="text-xs text-gray-600 ml-2">
                  (Max: {selectedTicket.quantity_available - selectedTicket.quantity_sold})
                </span>
              </div>

              {/* Total harga */}
              {quantity > 0 && (
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm text-gray-600">Total Harga:</p>
                  <p className="text-xl font-bold text-red-600">
                    Rp {(selectedTicket.price * quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Ketentuan tiket */}
          <div className="bg-white/10 text-white text-xs leading-relaxed p-4 rounded-md">
            <p className="mb-2">
              Untuk melanjutkan proses pembelian e-Tiket, Anda menyetujui
              persyaratan sebagai berikut:
            </p>
            <ol className="list-decimal list-inside space-y-1 mb-3">
              <li>
                Pihak penyelenggara berhak untuk tidak memberikan izin masuk ke area
                pameran apabila e-Tiket sudah digunakan atau pengunjung tidak
                memenuhi persyaratan dan ketentuan yang berlaku.
              </li>
              <li>
                Terdapat sanksi hukum bagi pihak yang terbukti melakukan penggandaan
                dan penjualan kembali e-Tiket atau gelang.
              </li>
              <li>
                Pemegang e-Tiket atau gelang tidak berhak mengambil tindakan hukum
                dan menuntut pihak penyelenggara, dalam hal pembatalan pameran
                karena alasan apapun.
              </li>
            </ol>
            <h4 className="font-semibold mb-1">KETENTUAN TIKET</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Email yang sudah didaftarkan tidak dapat diubah.</li>
              <li>
                E-Tiket dan gelang hanya berlaku untuk 1 (satu) orang, untuk 1
                (satu) kali kunjungan.
              </li>
              <li>
                Gelang hanya berlaku untuk kunjungan di hari yang sama dengan
                penukaran gelang.
              </li>
              <li>
                E-Tiket hanya berlaku pada hari/tanggal yang telah dipilih saat
                pembelian.
              </li>
              <li>
                Pengunjung dengan usia di bawah 6 tahun dan di atas 65 tahun gratis
                masuk pameran.
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}