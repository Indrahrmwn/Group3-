export default function InvoiceStep({ payment }) {
  if (!payment) return null;

  return (
    <div className="space-y-6">
      {/* Box utama */}
      <div className="border rounded-lg shadow bg-white overflow-hidden">
        
        {/* Header */}
        <div>
          {/* Garis merah tebal */}
          <div className="h-3 bg-red-700"></div>

          {/* Background abu + isi */}
          <div className="bg-gray-300 px-4 py-2 flex items-center gap-2">
            <span className="text-sm">🛒</span>
            <h2 className="font-bold text-sm tracking-wide">ORDER SUMMARY</h2>
          </div>
        </div>

        {/* Isi detail */}
        <div className="p-4 space-y-2 text-sm">
          <p>
            Invoice ID:{" "}
            <span className="font-medium">34567JKL/BVC34567BDFG</span>
          </p>
          <p>
            Sales:{" "}
            <span className="font-medium">34567JKL/BVC34567BDFG</span>
          </p>
          <p>
            Pay before:{" "}
            <span className="font-medium">
              September 6, 2025 at 11:21 AM
            </span>
          </p>
          <p className="font-bold">Total Rp 40.000</p>
        </div>

        {/* Virtual Account */}
        <div className="border-t p-4 space-y-3">
          <p className="text-sm font-medium">Virtual account number</p>
          <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
            <span className="font-mono">8071237912395123869</span>
            <button
              className="text-xs text-red-500 hover:underline"
              onClick={() =>
                navigator.clipboard.writeText("8071237912395123869")
              }
            >
              Copy
            </button>
          </div>

          <p className="text-sm font-medium">Virtual account name</p>
          <div className="flex items-center gap-3">
            <img src={payment.logo} alt={payment.name} className="w-12 h-12" />
            <div>
              <p className="font-semibold">Remaja Tengah Corp’s</p>
              <p className="fleex items-center font-bold">Rp 40.000</p>
            </div>
          </div>
        </div>

        {/* Catatan */}
        <div className="border-t px-4 py-3 text-xs text-gray-500 leading-relaxed">
          Lakukan pembayaran sesuai nominal yang tertera, sebelum batas waktu.
          Jika sudah membayar, tiket otomatis aktif. Simpan bukti pembayaran
          untuk berjaga-jaga.
        </div>
      </div>
    </div>
  );
}
