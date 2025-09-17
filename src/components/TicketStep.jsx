import { useState, useEffect } from "react";
import berita1 from "../assets/tiket/berita-1.png";

export default function TicketStep({ onNext }) {
  const [date, setDate] = useState("");
  const [session, setSession] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (date) {
      onNext?.({ date, session, quantity });
    }
  }, [date, session, quantity, onNext]);

  return (
    <div className="bg-red-700 p-6 md:p-10 rounded-3xl max-w-3xl mx-auto space-y-6">
      {/* Search bar atas */}
      <input
        type="text"
        placeholder="Tiket"
        className="w-full rounded-full px-4 py-2 text-sm bg-white text-gray-700"
        disabled
      />

      {/* Card Tiket */}
      <div className="bg-white rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-md">
        {/* Gambar */}
        <div className="relative">
          <img
            src={berita1}
            alt="Teater Sukabumi Gokil"
            className="w-48 h-48 object-cover rounded-md"
          />
          <span className="absolute bottom-2 left-2 bg-gray-200 px-2 py-1 text-xs rounded-md font-medium">
            Teater Sukabumi Gokil
          </span>
        </div>

        {/* Info tiket */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-lg">Sabtu-Minggu</h3>
            <p className="text-sm text-gray-500">Weekend Ticket</p>
          </div>

          {/* Input tanggal */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
            placeholder="Tanggal"
          />

          {/* Input sesi */}
          <div className="relative w-full mb-3">
            <select
              value={session}
              onChange={(e) => setSession(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm appearance-none pr-8" // pr-8 kasih ruang
            >
              <option value="">Pilih Sesi</option>
              <option value="09-12">09:00 - 12:00</option>
              <option value="13-15">13:00 - 15:00</option>
            </select>
            {/* Icon panah custom */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </span>
          </div>

          {/* Counter tiket */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(0, quantity - 1))}
              className="px-3 py-1 bg-red-500 text-white rounded-md"
            >
              -
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 bg-green-500 text-white rounded-md"
            >
              +
            </button>
          </div>
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
    </div>
  );
}
