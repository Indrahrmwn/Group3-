import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Gambar from "../assets/Gambar Website/undraw_people_ka7y.png";
import { motion } from "framer-motion";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register attempt:", { username, email, password, confirmPassword });
  };

  const handleCancel = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-white grid grid-cols-2 w-screen h-screen">
      {/* Panel gambar kiri (tanpa animasi) */}
      <div className="flex items-center justify-center relative">
        <div className="absolute top-0 left-0 w-[150px] h-[150px] bg-[#c53030] rounded-br-full" />
        <img src={Gambar} className="w-[300px] h-auto object-contain" alt="Ilustrasi" />
      </div>

      {/* Panel merah kanan (form) */}
      <motion.div
        key="registerForm"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="bg-[#c53030] flex flex-col justify-center px-20 relative"
      >
        <h1 className="text-white text-3xl font-bold mb-6">Daftar Akun</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-white text-base mb-1">
              Masukan Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-[47px] bg-white rounded-xl px-3 text-black focus:outline-none focus:ring-4 focus:ring-[#f87171] shadow-md transition-all"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-white text-base mb-1">
              Masukan Email
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

          <div>
            <label className="block font-semibold text-white text-base mb-1">
              Verifikasi Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[47px] bg-white rounded-xl px-3 text-black focus:outline-none focus:ring-4 focus:ring-[#f87171] shadow-md transition-all"
              required
            />
          </div>

          <div className="flex items-center text-white font-semibold space-x-2 text-base">
            <span>Sudah Punya Akun?</span>
            <button
              type="button"
              onClick={handleLogin}
              className="hover:underline hover:text-gray-200 transition-colors"
            >
              Login Sekarang
            </button>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-2 bg-white text-[#c53030] font-semibold rounded-[30px] hover:bg-gray-100 hover:scale-105 transition-transform shadow"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-8 py-2 bg-white text-[#c53030] font-semibold rounded-[30px] hover:bg-gray-100 hover:scale-105 transition-transform shadow"
            >
              Daftar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
