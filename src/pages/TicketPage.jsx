import { useState, useCallback } from "react"; // Tambah useCallback
import { useNavigate, useSearchParams } from "react-router-dom";
import { Menu } from "lucide-react";
import TicketStep from "../components/TicketStep";

export default function TicketPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  
  const preSelectedTicketId = searchParams.get('ticketId');

  // ✅ Wrap dengan useCallback agar function tidak berubah setiap render
  const handleTicketDataChange = useCallback((data) => {
    console.log("Data tiket:", data);
    setOrderData(data);
  }, []); // Dependency array kosong karena tidak depend pada state/props lain

  const handleProceedToPayment = () => {
    if (!orderData || !orderData.session || orderData.quantity === 0) {
      alert("Mohon lengkapi semua data tiket (sesi dan jumlah tiket)!");
      return;
    }

    localStorage.setItem('ticketOrder', JSON.stringify(orderData));
    navigate("/payment");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex gap-6 p-6 mt-30 max-w-6xl mx-auto">
      {/* Step pilih tiket */}
      <div className="flex-1">
        <TicketStep 
          onNext={handleTicketDataChange} 
          preSelectedTicketId={preSelectedTicketId}
        />
      </div>

      {/* Ringkasan order */}
      <div className="w-80 border p-4 rounded-xl shadow bg-gray-100 h-fit sticky top-6">
        {/* Header ringkasan */}
        <div className="flex items-center gap-2 mb-4">
          <Menu size={20} className="text-black" />
          <h2 className="font-bold">Ringkasan</h2>
        </div>

        {/* Step indicator */}
        <div className="flex justify-between text-sm mb-2">
          <span className="font-bold text-black">checkout</span>
          <span className="text-gray-400">pilih pembayaran</span>
          <span className="text-gray-400">pembayaran</span>
        </div>
        <div className="w-full h-[2px] bg-gray-300 mb-4">
          <div className="h-[2px] bg-black w-1/3"></div>
        </div>

        {/* Detail order */}
        {orderData ? (
          <>
            <div className="mb-4 space-y-3 text-sm">
              {/* Nama Ticket */}
              <div>
                <p className="text-gray-500 text-xs mb-1">Nama Tiket</p>
                <p className="font-bold text-black">{orderData.ticketName}</p>
              </div>

              {/* Sesi */}
              <div>
                <p className="text-gray-500 text-xs mb-1">Sesi</p>
                <p className="font-semibold text-black">{orderData.session || '-'}</p>
              </div>

              {/* Jumlah Tiket */}
              <div>
                <p className="text-gray-500 text-xs mb-1">Jumlah Tiket</p>
                <p className="font-semibold text-black">{orderData.quantity} tiket</p>
              </div>

              {/* Harga per Tiket */}
              <div>
                <p className="text-gray-500 text-xs mb-1">Harga per Tiket</p>
                <p className="font-semibold text-black">
                  {formatPrice(orderData.price)}
                </p>
              </div>
            </div>

            {/* Total Pembayaran */}
            <div className="flex justify-between items-center text-sm font-medium mb-4 border-t border-b py-3">
              <span className="font-bold">Total Pembayaran</span>
              <span className="font-bold text-red-600 text-lg">
                {formatPrice(orderData.total)}
              </span>
            </div>
          </>
        ) : (
          <div className="mb-4 text-sm text-center py-8">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <p className="text-gray-400 text-xs">Pilih tiket, sesi,<br/>dan jumlah untuk melihat ringkasan</p>
          </div>
        )}

        {/* Tombol */}
        <button
          onClick={handleProceedToPayment}
          disabled={!orderData || !orderData.session || orderData.quantity === 0}
          className={`w-full py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
            orderData && orderData.session && orderData.quantity > 0
              ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg active:scale-95'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Pilih Metode Pembayaran
        </button>

        {/* Warning message */}
        {orderData && (!orderData.session || orderData.quantity === 0) && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-xs text-yellow-700 text-center">
              ⚠️ Lengkapi data di sebelah kiri untuk melanjutkan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}