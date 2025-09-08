import { useState, useEffect } from "react";
import berita1 from "../assets/tiket/berita-1.png"; // ✅ import bener

export default function TicketStep({ onNext }) {
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(1);

  // kalau date sudah dipilih, otomatis panggil onNext
  useEffect(() => {
    if (date) {
      onNext?.({ date, quantity });
    }
  }, [date, quantity, onNext]);

  return (
    <div className="space-y-6">
      {/* Search bar atas */}
      <input
        type="text"
        placeholder="Tiket"
        className="w-full border rounded-md px-3 py-2 text-sm"
        disabled
      />

      {/* Card Tiket */}
      <div className="bg-white border rounded-xl p-4 flex gap-4 shadow-sm">
        {/* Gambar */}
        <img
          src={berita1} // ⬅️ pake import
          alt="Teater Sukabumi Ookii"
          className="w-40 h-40 object-cover rounded-md"
        />

        {/* Info tiket */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Sabtu-Minggu</h3>
          <p className="text-sm text-gray-500 mb-3">Weekend Ticket</p>

          {/* Input tanggal */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm mb-3"
          />

          {/* Counter tiket */}
          <div className="flex items-center gap-3">
            <span className="text-sm">Seri</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 border rounded-md"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1 border rounded-md"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ketentuan tiket */}
      <div className="text-xs leading-relaxed space-y-2 bg-gray-50 p-4 rounded-md border">
        <p>
          Untuk melanjutkan proses pembelian e-Tiket, Anda menyetujui pernyataan
          sebagai berikut:
        </p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Pihak penyelenggara berhak untuk membatalkan/melarang masuk ke area
            pameran apabila e-Tiket Anda yang sudah digunakan atau jika
            pengunjung tidak memenuhi persyaratan dan ketentuan sebagaimana
            disebutkan.
          </li>
          <li>
            Terdapat sanksi hukum bagi pihak yang terbukti melakukan
            penggandaan dan penjualan kembali e-Tiket atau e-Voucher.
          </li>
          <li>
            Pemegang e-Tiket atau e-Voucher tidak berhak menuntut tindakan hukum
            dan menuntut pihak penyelenggara, dalam hal pembatalan pameran
            karena alasan apapun.
          </li>
        </ol>
        <h4 className="font-semibold mt-3">KETENTUAN TIKET</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>E-Tiket yang sudah dibeli tidak dapat diubah/dikembalikan.</li>
          <li>
            E-Tiket akan berlaku hanya untuk 1 (satu) orang, untuk 1 (satu) kali
            kunjungan.
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
