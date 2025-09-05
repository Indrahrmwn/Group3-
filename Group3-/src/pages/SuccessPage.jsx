import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold text-green-600">Pembayaran Berhasil 🎉</h1>
      <p className="mt-2 text-gray-600">Tiket kamu sudah aktif. Selamat menonton!</p>

      <Link
        to="/"
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
      >
        Kembali ke Homepage
      </Link>
    </div>
  );
}
