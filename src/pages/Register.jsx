import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
import BackgroundImage from "../assets/Gambar Website/Rectangle 256.jpg";
import GambarIlustrasi from "../assets/Gambar Website/ilustrasilogin.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Kamu harus menyetujui syarat & ketentuan terlebih dahulu!",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Password dan konfirmasi password tidak sama!",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Membuat akun...",
        html: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mendaftar");
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Akun berhasil dibuat!",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message || "Gagal mendaftar, periksa kembali data Anda",
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl lg:h-[550px] grid grid-cols-1 lg:grid-cols-2">
        {/* Panel Kiri - Background + Ilustrasi */}
        <div className="relative flex items-center justify-center bg-gray-50 p-6">
          <img
            src={BackgroundImage}
            alt="Background Register"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <img
              src={GambarIlustrasi}
              alt="Ilustrasi Register"
              className="max-h-full w-auto object-contain"
            />
          </div>
        </div>

        {/* Panel Kanan - Form */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 md:p-8 flex flex-col justify-center relative">
          {/* Tombol kembali */}
          <div className="absolute top-4 left-4">
            <Link to="/" className="flex items-center text-white text-sm hover:underline">
              <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
            </Link>
          </div>

          <div className="text-center mb-6 mt-6">
            <h1 className="text-white text-xl font-bold">DAFTAR AKUN</h1>
            <p className="text-xs text-red-100">Buat akun barumu sekarang</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-white text-xs font-semibold mb-1">
                Masukan Username
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 bg-white rounded-lg px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 shadow"
                placeholder="Masukan Username Anda"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-xs font-semibold mb-1">
                Masukan Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 bg-white rounded-lg px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 shadow"
                placeholder="Masukan Email Anda"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white text-xs font-semibold mb-1">
                Masukan Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 bg-white rounded-lg px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 shadow"
                placeholder="Masukan Password Anda"
                required
              />
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-white text-xs font-semibold mb-1">
                Verifikasi Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-10 bg-white rounded-lg px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 shadow"
                placeholder="Verifikasi Password Anda"
                required
              />
            </div>

            {/* Checkbox Persetujuan */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1"
                required
              />
              <span className="text-white text-xs">
                Saya Setuju dengan{" "}
                <a href="#" className="underline">
                  Syarat & Ketentuan
                </a>{" "}
                dan{" "}
                <a href="#" className="underline">
                  Kebijakan Privasi
                </a>
              </span>
            </div>

            {/* Link ke login */}
            <div className="text-center mt-2">
              <span className="text-white text-xs">Sudah punya akun? </span>
              <button
                type="button"
                onClick={handleLogin}
                className="text-white font-bold text-xs hover:underline"
              >
                Login Sekarang
              </button>
            </div>

            {/* Tombol */}
            <button
              type="submit"
              className="w-full h-10 bg-white text-red-600 text-sm font-bold rounded-full hover:bg-gray-50 shadow"
            >
              Daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
