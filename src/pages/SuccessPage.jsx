// SuccessPage.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchTransactionStatus();
    }
  }, [orderId]);

  const fetchTransactionStatus = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    console.log("🔍 Fetching transaction:", orderId);

    const response = await fetch(
      `http://localhost:8000/api/transactions/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseText = await response.text();
    console.log("📥 Transaction response:", responseText);
    console.log("📊 Response status:", response.status);

    if (response.status === 500) {
      console.error("❌ Server error 500");
      // Tetap tampilkan success page meskipun error
      return;
    }

    if (response.status === 404) {
      console.error("❌ Transaction not found");
      return;
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log("✅ Transaction data:", data);
    } catch (e) {
      console.error("❌ JSON Parse Error:", e);
      console.error("Response:", responseText.substring(0, 500));
      return;
    }

    // Update state dengan data transaksi jika ada
    if (data.data) {
      setTransactionData(data.data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h1>
        <p className="text-gray-600 mb-6">Tiket Anda sudah aktif dan siap digunakan</p>
        
        {transactionData && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-bold text-gray-900 mb-2">{transactionData.order_id}</p>
            <p className="text-sm text-gray-600">Jumlah Tiket</p>
            <p className="font-bold text-gray-900">{transactionData.quantity} tiket</p>
          </div>
        )}
        
        <Link
          to="/ticket-user"
          className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-xl transition-all mb-3"
        >
          Lihat Tiket Saya
        </Link>
        
        <Link
          to="/"
          className="block w-full border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
        >
          Kembali ke Homepage
        </Link>
      </div>
    </div>
  );
}