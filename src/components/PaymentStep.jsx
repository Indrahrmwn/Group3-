import { useState } from "react";
import { ChevronDown, ChevronUp, Search, CreditCard, Wallet, Building } from "lucide-react";

// import logo
import bcaLogo from "../assets/payment/bca.png";
import mandiriLogo from "../assets/payment/mandiri.png";
import gopayLogo from "../assets/payment/gopay.png";
import danaLogo from "../assets/payment/dana.png";
import ovoLogo from "../assets/payment/ovo.png";

export default function PaymentStep({ setSelected }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [search, setSearch] = useState("");

const paymentOptions = {
  "Tiket Virtual": [
    { id: "bca", name: "BCA Virtual Account", logo: bcaLogo },
    { id: "mandiri", name: "Mandiri Virtual Account", logo: mandiriLogo },
  ],
  "Credit Card": [
    { id: "bca", name: "Visa", logo: bcaLogo },
    { id: "mandiri", name: "MasterCard", logo: mandiriLogo },
  ],
  "E-Wallet": [   // ✅ pakai "E-Wallet" biar konsisten
    { id: "gopay", name: "GoPay", logo: gopayLogo },
    { id: "dana", name: "Dana", logo: danaLogo },
    { id: "ovo", name: "OVO", logo: ovoLogo },
  ],
};

// icon kategori
const categoryIcons = {
  "Tiket Virtual": <Building size={16} />,
  "Credit Card": <CreditCard size={16} />,
  "E-Wallet": <Wallet size={16} />,   // ✅ samain disini
};


  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Metode Pembayaran"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded px-3 py-2 pl-10 text-sm"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
      </div>

      {/* Accordion */}
      <div className="space-y-2">
        {Object.entries(paymentOptions).map(([category, methods]) => {
          // filter berdasarkan search
          const filtered = methods.filter((m) =>
            m.name.toLowerCase().includes(search.toLowerCase())
          );
          if (filtered.length === 0) return null;

          return (
            <div key={category} className="border rounded bg-white">
              {/* Header kategori */}
              <button
                className="flex justify-between items-center w-full px-4 py-2 text-sm font-semibold"
                onClick={() =>
                  setOpenCategory(openCategory === category ? null : category)
                }
              >
                <div className="flex items-center gap-2">
                  {categoryIcons[category]}
                  <span>{category.toUpperCase()}</span>
                </div>
                {openCategory === category ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {/* Isi metode */}
              {openCategory === category && (
                <div className="border-t px-4 py-2 space-y-2">
                  {filtered.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelected(m)}
                      className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-100 rounded"
                    >
                      <img src={m.logo} alt={m.name} className="w-8 h-8" />
                      <span className="text-sm">{m.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
