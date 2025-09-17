import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Gambar from "../assets/Gambar Website/undraw_people_ka7y.png";
import { motion } from "framer-motion";
import AuthController from "../controllers/AuthController";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const IMAGE_URL = import.meta.env.VITE_API_URL_IMAGE;

  const AuthController = {
    login: async (email, password) => {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login gagal");
      return await res.json();
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await AuthController.login(email, password);

      // contoh simpan token
      localStorage.setItem("token", data.token);

      // pindah halaman setelah login
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login gagal!");
    }
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="bg-white grid grid-cols-2 w-screen h-screen">
      {/* Panel merah kiri (form) */}
      <motion.div
        key="loginForm"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="bg-[#c53030] flex flex-col justify-center px-20 relative"
      >
        <h1 className="text-white text-3xl font-bold mb-6">Login Akun</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-white text-base mb-1">
              Masukan Email atau Username
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[47px] bg-white rounded-xl px-3 text-black focus:outline-none focus:ring-4 focus:ring-[#f87171] shadow-md transition-all"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-white text-base mb-1">
              Masukan Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[47px] bg-white rounded-xl px-3 text-black focus:outline-none focus:ring-4 focus:ring-[#f87171] shadow-md transition-all"
              required
            />
          </div>

          <div className="flex items-center text-white font-semibold space-x-2 text-base">
            <span>Belum Punya Akun?</span>
            <button
              type="button"
              onClick={handleRegister}
              className="hover:underline hover:text-gray-200 transition-colors"
            >
              Daftar Sekarang
            </button>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="px-8 py-2 bg-white text-[#c53030] font-semibold rounded-[30px] hover:bg-gray-100 hover:scale-105 transition-transform shadow"
            >
              Masuk
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-2 bg-white text-[#c53030] font-semibold rounded-[30px] hover:bg-gray-100 hover:scale-105 transition-transform shadow"
            >
              Batal
            </button>
          </div>
        </form>
      </motion.div>

      {/* Panel gambar kanan (tanpa animasi) */}
      <div className="flex items-center justify-center relative">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#c53030] rounded-bl-full" />
        <img
          src={Gambar}
          className="w-[300px] h-auto object-contain"
          alt="Ilustrasi"
        />
      </div>
    </div>
  );
}
