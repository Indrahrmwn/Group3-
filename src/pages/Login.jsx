import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BackgroundImage from "../assets/Gambar Website/Rectangle 256.jpg";
import GambarIlustrasi from "../assets/Gambar Website/ilustrasilogin.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const WEB_URL = import.meta.env.VITE_WEB_URL;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const loginRequest = async (email, password) => {
    const res = await axios.post(
      `${API_URL}/api/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Sedang login...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const data = await loginRequest(email, password);

      if (data.token && data.user) {
        login(data.user, data.token);
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil login",
        text: `Selamat datang ${data.user?.name || ""}`,
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      Swal.fire({
        icon: "error",
        title: "Login gagal",
        text: "Periksa kembali email dan password kamu",
      });
    }
  };

  const handleRegister = () => navigate("/register");

  const handleGoogleLogin = () => {
    if (!WEB_URL) {
      alert("WEB_URL tidak terdefinisi di .env");
      return;
    }
    window.location.href = `${WEB_URL}/auth/google`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl lg:h-[550px] grid grid-cols-1 lg:grid-cols-2">
        {/* Panel Kiri - Form */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 md:p-8 flex flex-col justify-center relative">
          {/* Tombol kembali */}
          <div className="absolute top-4 left-4">
            <Link to="/" className="flex items-center text-white text-sm hover:underline">
              <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
            </Link>
          </div>

          <div className="text-center mb-6 mt-6">
            <div className="flex flex-col items-center justify-center mb-3">
              <div className="text-white">
                <h2 className="text-lg font-bold">REMAJA TENGAH</h2>
                <p className="text-xs text-red-100">Selamat Datang Kembali</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-white text-xs font-semibold mb-1">
                Masukan Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 bg-white rounded-lg px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 shadow"
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
                className="w-full h-10 bg-white rounded-lg px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 shadow"
                placeholder="Masukan Password Anda"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-white text-xs hover:underline">
                Lupa Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="w-full h-10 bg-white text-red-600 font-bold text-sm rounded-full hover:bg-gray-50 shadow"
            >
              Masuk
            </button>

            {/* Divider */}
            <div className="flex items-center my-2">
              <div className="flex-1 border-t border-white/30"></div>
              <span className="px-2 text-white text-xs">Atau</span>
              <div className="flex-1 border-t border-white/30"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full h-10 gap-2 bg-white text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-50 shadow"
            >
              <FcGoogle className="text-lg" />
              <span>Masuk Dengan Google</span>
            </button>

            {/* Register Link */}
            <div className="text-center mt-2">
              <span className="text-white text-xs">Belum Punya Akun? </span>
              <button
                type="button"
                onClick={handleRegister}
                className="text-white font-bold text-xs hover:underline"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Panel Kanan - Background + Ilustrasi */}
        <div className="relative flex items-center justify-center bg-gray-50 p-6">
          <img
            src={BackgroundImage}
            alt="Background Login"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <img
              src={GambarIlustrasi}
              alt="Ilustrasi Login"
              className="max-h-full w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
