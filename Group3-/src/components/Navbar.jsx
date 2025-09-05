import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-8 py-3 shadow border-b bg-white">
      {/* Logo + Nama */}
      <div className="flex items-center gap-3">
        <img
          src="/remaja-tengah.png"
          alt="Remaja Tengah"
          className="w-[80px] h-auto object-contain"
        />
        <span className="font-semibold text-lg text-black">Remaja Tengah</span>
      </div>

      {/* Menu + Button + Icon */}
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-6 text-sm">
          <Link to="/" className="text-black hover:text-red-500">
            Homepage
          </Link>
          <Link to="/news" className="text-black hover:text-red-500">
            News
          </Link>
          <Link to="/about" className="text-black hover:text-red-500">
            About
          </Link>
        </nav>

        {/* Tombol Buy Ticket */}
        <Link
          to="/ticket"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Buy Ticket
        </Link>

        {/* Icon User */}
        <div className="w-8 h-8 rounded-full border flex items-center justify-center bg-black text-white">
          👤
        </div>
      </div>
    </header>
  );
}
