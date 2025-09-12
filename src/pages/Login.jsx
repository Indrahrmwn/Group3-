import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
  };

  const handleRegister = () => {
    console.log("Navigate to registration");
  };

  return (
    <div className="bg-white grid justify-items-center items-start w-screen h-screen">
      <div className="bg-white overflow-hidden w-full max-w-[1459px] h-full relative">
        <div className="absolute w-[889px] h-[940px] top-[-63px] -left-14">
          <div className="absolute w-[413px] h-[45px] top-[722px] left-[474px] bg-[#c53030] rounded-[50px] rotate-[44.50deg]" />

          <div className="absolute w-[681px] h-[50px] top-[308px] left-52 bg-white rounded-2xl" />

          <div className="absolute w-[559px] h-full top-[63px] left-14 bg-[#c53030]" />

          <form onSubmit={handleSubmit} className="contents">
            <label className="absolute w-[247px] top-[285px] left-[165px] font-semibold text-white text-base">
              Masukan Email atau Username
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="absolute w-[342px] h-[47px] top-[313px] left-[165px] bg-white rounded-xl px-3 text-black focus:outline-none focus:ring-2 focus:ring-white"
              required
            />

            <label className="absolute w-[247px] top-[382px] left-[165px] font-semibold text-white text-base">
              Masukan Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="absolute w-[342px] h-[47px] top-[410px] left-[165px] bg-white rounded-xl px-3 text-black focus:outline-none focus:ring-2 focus:ring-white"
              required
            />

            <button
              type="submit"
              className="absolute w-[116px] h-[47px] top-[551px] left-[201px] bg-white rounded-[30px] hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Masuk
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="absolute w-[116px] h-[47px] top-[551px] left-[348px] bg-white rounded-[30px] hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Batal
            </button>
          </form>

          <div className="absolute w-[168px] top-[484px] left-[183px] font-semibold text-white text-base">
            Belum Punya Akun ?
          </div>

          <button
            type="button"
            onClick={handleRegister}
            className="absolute top-[484px] left-[351px] font-semibold text-white text-base hover:underline cursor-pointer"
          >
            Daftar Sekarang
          </button>
        </div>

        <div className="absolute w-[721px] h-[742px] top-[-148px] left-[855px]">
          <div className="absolute w-[442px] h-[443px] top-0 left-[279px]">
            <div className="absolute w-[295px] h-[296px] top-0 left-0 bg-[#c53030] rounded-full" />
            <div className="absolute w-[295px] h-[296px] top-[147px] left-[147px] bg-[#c53030] rounded-full" />
          </div>

          <img
            src="/undraw.png" // ganti dengan gambar kamu
            className="absolute w-[317px] h-[446px] top-[296px] left-0 object-cover"
            alt="Undraw nice to meet"
          />
        </div>
      </div>
    </div>
  );
}
