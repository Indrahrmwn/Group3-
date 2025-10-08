import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function InvoicePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  // Redirect jika tidak ada data
  React.useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Generate invoice number
  const generateInvoiceNumber = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15).toUpperCase();
    return `INV-${timestamp}-${random}`;
  };

  const invoiceNumber = generateInvoiceNumber();
  const currentDate = new Date();

  const handlePrint = () => {
    window.print();
  };

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-8 pt-32">
      {/* Tombol Cetak */}
      <div className="flex justify-end mb-4 no-print">
        <button
          onClick={handlePrint}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Cetak Invoice
        </button>
      </div>

      {/* Logo */}
      <div className="text-center mb-6">
        <img
          src="/src/assets/Gambar Website/tes.png"
          alt="Logo Remaja Tengah"
          className="mx-auto h-16 mb-2"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <h1 className="text-xl font-semibold tracking-widest">REMAJA TENGAH</h1>
        <p className="text-sm text-gray-600">SMKN 2 Sukabumi</p>
      </div>

      {/* Info Pembayaran */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-semibold">Tanggal Pembayaran:</span>
            <p className="text-gray-700">{formatDate(currentDate)}</p>
          </div>
          <div>
            <span className="font-semibold">Metode Pembayaran:</span>
            <p className="text-gray-700">{orderData.paymentMethod || 'QRIS / E-Wallet'}</p>
          </div>
        </div>
      </div>

      {/* Ringkasan Pembayaran */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-4 text-lg border-b pb-2">Ringkasan Pembayaran</h2>
        <ul className="mb-4 space-y-2">
          {Array.from({ length: orderData.quantity }).map((_, index) => (
            <li key={index} className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700">
                {orderData.ticketName} - Tiket #{index + 1}
                {orderData.session && <span className="text-sm text-gray-500 ml-2">({orderData.session})</span>}
              </span>
              <span className="font-semibold">{formatPrice(orderData.price)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-lg border-t-2 border-gray-400 pt-3">
          <span>Subtotal</span>
          <span className="text-red-600">{formatPrice(orderData.total)}</span>
        </div>
      </div>

      {/* Total + Status */}
      <div className="border-2 border-yellow-400 p-4 mb-6 bg-yellow-50 rounded-lg">
        <div className="flex justify-between font-bold text-xl mb-2">
          <span>Total Bayar</span>
          <span className="text-red-600">{formatPrice(orderData.total)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">Status Pembayaran</span>
          <span className={`font-semibold px-4 py-1 rounded-full ${
            orderData.paymentStatus === 'paid' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-600'
          }`}>
            {orderData.paymentStatus === 'paid' ? '✓ Sudah Dibayar' : 'Belum Dibayar'}
          </span>
        </div>
      </div>

      {/* Detail Pembeli */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <h2 className="font-semibold mb-3 text-lg">Detail Pembeli:</h2>
        <div className="space-y-1 text-gray-700">
          <p><span className="font-semibold">Nama:</span> {orderData.buyerName || 'Pembeli'}</p>
          <p><span className="font-semibold">Email:</span> {orderData.buyerEmail || '-'}</p>
          <p><span className="font-semibold">Telepon:</span> {orderData.buyerPhone || '-'}</p>
        </div>
      </div>

      <hr className="my-6 border-t-2 border-gray-300" />

      {/* Detail Event */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3 text-lg">Detail Event:</h2>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p>
            <span className="font-semibold">Nomor Invoice:</span>{' '}
            <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">{invoiceNumber}</span>
          </p>
          <p><span className="font-semibold">Nama Event:</span> {orderData.eventName || 'Remaja Tengah Show'}</p>
          <p><span className="font-semibold">Tanggal Pembelian:</span> {formatDate(currentDate)}</p>
          {orderData.sessionDate && (
            <p><span className="font-semibold">Tanggal Event:</span> {formatDate(orderData.sessionDate)}</p>
          )}
        </div>
      </div>

      {/* Detail Tiket yang Dibeli */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6">
        <h2 className="font-semibold mb-4 text-lg border-b pb-2">Detail Tiket</h2>
        <div className="space-y-3">
          {Array.from({ length: orderData.quantity }).map((_, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
              <div>
                <p className="font-semibold">{orderData.ticketName}</p>
                <p className="text-sm text-gray-600">
                  Sesi: {orderData.session} • Tiket #{index + 1}
                </p>
              </div>
              <span className="font-semibold">{formatPrice(orderData.price)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-lg border-t-2 border-gray-400 pt-3 mt-3">
          <span>Total</span>
          <span className="text-red-600">{formatPrice(orderData.total)}</span>
        </div>
      </div>

      {/* Footer Invoice */}
      <div className="text-center text-sm text-gray-600 mt-8 pt-4 border-t">
        <p>Terima kasih atas pembelian Anda!</p>
        <p>Untuk pertanyaan, hubungi: info@remajatengah.com</p>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}