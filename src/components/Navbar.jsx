// src/components/Navbar.jsx
import Gambar from "../assets/Gambar Website/remajatengah.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 shadow border-b bg-white">
      <div className="flex items-center gap-3">
        <img
          src={Gambar}
          alt="Remaja Tengah"
          className="w-[100px] h-auto object-contain"
        />
        <span className="font-semibold text-lg text-black">Remaja Tengah</span>
      </div>

      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-6 text-sm">
          <Link
            to="/"
            className="text-black relative group transition duration-300"
          >
            Homepage
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300" />
          </Link>

          <Link
            to="/news"
            className="text-black relative group transition duration-300"
          >
            News
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300" />
          </Link>

          <Link
            to="/about"
            className="text-black relative group transition duration-300"
          >
            About
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>

        <Link
          to="/ticket"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition duration-300"
        >
          Buy Ticket
        </Link>

        <div className="w-8 h-8 rounded-full border flex items-center justify-center bg-black text-white cursor-pointer hover:bg-red-500 transition duration-300">
          👤
        </div>
      </div>
    </header>
  );
}
