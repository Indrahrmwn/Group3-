import { useState } from "react";
import { Menu } from "lucide-react";

export default function OrderSummary() {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-gray-50 p-4 rounded-xl border w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Menu size={20} />
        <h2 className="font-bold text-lg">Ringkasan</h2>
      </div>

      {/* Stepper */}
      <div className="flex justify-between text-sm font-semibold text-gray-500">
        <span className={step === 1 ? "text-black" : ""}>checkout</span>
        <span className={step === 2 ? "text-black" : ""}>pilih pembayaran</span>
        <span className={step === 3 ? "text-black" : ""}>pembayaran</span>
      </div>
      <div className="h-1 bg-gray-300 rounded-full my-2">
        <div
          className="h-1 bg-black rounded-full transition-[width] duration-500 ease-in-out"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      {/* Konten */}
      <div className="text-sm mb-4">
        {step === 1 && (
          <div className="space-y-3 max-w-[300px] mx-auto">
            <div>
              <p className="text-gray-500">Tanggal</p>
              <p className="font-medium">Teater Sukabumi Gokil</p>
            </div>
            <div className="border-t border-b py-2">
              <div className="flex justify-between">
                <span className="font-semibold">Total Pembayaran</span>
                <span className="text-black font-bold">Rp.40.000</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-[300px] mx-auto text-gray-600">
            Silakan pilih metode pembayaran.
          </div>
        )}

        {step === 3 && (
          <div className="max-w-[300px] mx-auto text-green-600 font-semibold">
            ✅ Pembayaran berhasil!
          </div>
        )}
      </div>

      {/* Tombol dinamis */}
      {step < 3 && (
        <button
          onClick={() => setStep(step + 1)}
          className="w-full bg-red-600 text-white py-2 rounded-md font-semibold"
        >
          {step === 1 ? "Pilih Metode Pembayaran" : "Bayar Sekarang"}
        </button>
      )}
    </div>
  );
}
