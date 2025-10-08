import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadMidtransScript } from "../utils/Midtrans";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketOrder = location.state?.ticketOrder;

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (ticketOrder) {
      // ✅ Validasi data lengkap
      if (!ticketOrder.session) {
        console.error("❌ Missing session in ticketOrder:", ticketOrder);
        alert("Data pesanan tidak lengkap. Silakan pesan ulang.");
        navigate("/ticket");
        return;
      }
      setOrderData(ticketOrder);
    } else {
      navigate("/ticket");
    }
  }, [ticketOrder, navigate]);

  useEffect(() => {
    loadMidtransScript().catch((err) => {
      console.error("Failed to load Midtrans:", err);
    });
  }, []);

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert("Mohon lengkapi semua data pembeli");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login terlebih dahulu");
      navigate("/login");
      return;
    }

    setLoading(true);

    setLoading(true);

    try {
      console.log("📤 Sending payment data:", {
        ticket_id: orderData.ticketId,
        quantity: orderData.quantity,
        total_price: orderData.total,
        session: orderData.session,
        buyer_name: customerInfo.name,
        buyer_email: customerInfo.email,
        buyer_phone: customerInfo.phone,
      });

      const response = await fetch("http://localhost:8000/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ticket_id: orderData.ticketId,
          quantity: orderData.quantity,
          total_price: orderData.total,
          session: orderData.session,
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
        }),
      });

      // Log response mentah
      const responseText = await response.text();
      console.log("📥 Raw response:", responseText);
      console.log("📊 Response status:", response.status);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("❌ JSON Parse Error:", e);
        console.error("Response was:", responseText.substring(0, 500));
        throw new Error(
          "Server returned HTML instead of JSON. Check Laravel logs."
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }

      if (data.status === "success") {
        window.snap.pay(data.data.snap_token, {
          onSuccess: function (result) {
            navigate("/SuccessPage", {
              state: {
                orderId: data.data.order_id,
                result,
              },
            });
          },

          onPending: function (result) {
            navigate("/payment/pending", {
              state: {
                orderId: data.data.order_id,
                result,
              },
            });
          },
          onError: function (result) {
            navigate("/payment/failed", {
              state: {
                orderId: data.data.order_id,
                result,
              },
            });
          },
          onClose: function () {
            setLoading(false);
          },
        });
      } else {
        alert(data.message || "Terjadi kesalahan");
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Terjadi kesalahan saat memproses pembayaran");
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
            <h1 className="text-2xl font-bold text-white">Pembayaran Tiket</h1>
            <p className="text-red-100 text-sm mt-1">
              Lengkapi data dan lakukan pembayaran
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
              <h3 className="font-bold text-lg mb-4 text-gray-900">
                Detail Pesanan
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tiket</span>
                  <span className="font-semibold">{orderData.ticketName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sesi</span>
                  <span className="font-semibold">{orderData.session}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumlah</span>
                  <span className="font-semibold">
                    {orderData.quantity} tiket
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Harga per tiket</span>
                  <span className="font-semibold">
                    {formatPrice(orderData.price)}
                  </span>
                </div>
                <div className="border-t border-red-300 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-red-600 text-xl">
                    {formatPrice(orderData.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information Form */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">
                Data Pembeli
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-blue-900 text-sm mb-1">
                    Metode Pembayaran
                  </p>
                  <p className="text-xs text-blue-700">
                    Anda akan diarahkan ke halaman pembayaran Midtrans untuk
                    memilih metode pembayaran (QRIS, GoPay, OVO, DANA, Bank
                    Transfer, dll)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Kembali
              </button>
              <button
                onClick={handlePayment}
                disabled={
                  loading ||
                  !customerInfo.name ||
                  !customerInfo.email ||
                  !customerInfo.phone
                }
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  loading ||
                  !customerInfo.name ||
                  !customerInfo.email ||
                  !customerInfo.phone
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 hover:shadow-lg"
                }`}
              >
                {loading ? "Memproses..." : "Bayar Sekarang"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
