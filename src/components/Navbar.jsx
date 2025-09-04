import Gambar from "../assets/Gambar Website/remajatengah.png";

export default function Navbar() {
  return (
    <nav className="bg-[#F3F2EC] shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
      {/* Logo + Nama */}
      <div className="flex items-center gap-3">
        <img
          src={Gambar}
          alt="Remaja Tengah"
          className="w-[100px] h-auto object-contain"
        />
        <span className="font-semibold text-lg text-black">Remaja Tengah</span>
      </div>

      {/* Menu + Button + Icon */}
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-6 text-sm">
          <a
            href="#"
            className="text-black relative group transition duration-300"
          >
            Homepage
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#"
            className="text-black relative group transition duration-300"
          >
            News
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#"
            className="text-black relative group transition duration-300"
          >
            About
            <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition duration-300">
          Buy Ticket
        </button>

        <div className="w-8 h-8 rounded-full border flex items-center justify-center bg-black text-white cursor-pointer hover:bg-red-500 transition duration-300">
          👤
        </div>
      </div>
      </div>
      </div>
</nav>
  );
}
