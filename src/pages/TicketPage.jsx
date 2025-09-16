import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import TicketStep from "../components/TicketStep";

export default function TicketPage() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-6 p-6 mt-30 max-w-6xl mx-auto">
      {/* Step pilih tiket */}
      <div className="flex-1">
        <TicketStep onNext={(data) => console.log("Data tiket:", data)} />
      </div>

      {/* Ringkasan order */}
      <div className="w-80 border p-4 rounded-xl shadow bg-gray-100">
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
        <div className="mb-4 text-sm">
          <p className="text-gray-500">Weekend Ticket</p>
          <p className="font-bold text-black">Teater Sukabumi Gokil</p>
        </div>

        <div className="flex justify-between text-sm font-medium mb-4 border-b pb-2">
          <span>Total Pembayaran</span>
          <span className="font-bold text-black">Rp.40.000</span>
        </div>

        {/* Tombol */}
        <button
          onClick={() => navigate("/payment")}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 text-sm font-semibold"
        >
          Pilih Metode Pembayaran
        </button>
      </div>
    </div>
  );
}
