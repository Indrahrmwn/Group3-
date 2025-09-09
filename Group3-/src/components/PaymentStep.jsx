import { useState } from "react";

import { ChevronDown, Search, Wallet, Building, QrCode, ShoppingBag } from "lucide-react";

// Import logo
import bcaLogo from "../assets/payment/bca.png";
import mandiriLogo from "../assets/payment/mandiri.png";
import gopayLogo from "../assets/payment/gopay.png";
import danaLogo from "../assets/payment/dana.png";
import ovoLogo from "../assets/payment/ovo.png";
import qrisLogo from "../assets/payment/qris-bri-mobile.png";
import qrisDana from "../assets/payment/qris-dana.png";
import qrisLinkaja from "../assets/payment/qris-linkaja.png";
import qrisShopee from "../assets/payment/qris-shopeepay.png";
import qrisOvo from "../assets/payment/qris-ovo.png";
import qrisGopay from "../assets/payment/qris-gopay.png";
import ConvenienceAlfamart from "../assets/payment/alfamart.png";
import ConvenienceIndomaret from "../assets/payment/Indomaret.png";
import cimbLogo from "../assets/payment/cimb.png";
import briLogo from "../assets/payment/bri.png";
import bniLogo from "../assets/payment/bni.png";
import qrsallLogo from "../assets/payment/qrs all.png";

export default function PaymentStep({ setSelected }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [search, setSearch] = useState("");

  const paymentOptions = {
    "Virtual Account": [
      { id: "bca", name: "BCA", logo: bcaLogo },
      { id: "mandiri", name: "Mandiri", logo: mandiriLogo },
      { id: "cimb", name: "CIMB", logo: cimbLogo },
      { id: "bri", name: "BRI", logo: briLogo },
      { id: "bni", name: "BNI", logo: bniLogo },
    ],
    "E-Wallet": [
      { id: "gopay", name: "GoPay", logo: gopayLogo },
      { id: "dana", name: "Dana", logo: danaLogo },
      { id: "ovo", name: "OVO", logo: ovoLogo },
    ],
    "QRIS (All Payment)": [
      { id: "qrsall", name: "QRIS All Payment", logo: qrsallLogo },
    ],
    QRIS: [
      { id: "bri-mobile", name: "BRI Mobile", logo: qrisLogo },
      { id: "dana", name: "Dana", logo: qrisDana },
      { id: "linkaja", name: "LinkAja", logo: qrisLinkaja },
      { id: "shopee", name: "ShopeePay", logo: qrisShopee },
      { id: "ovo", name: "OVO", logo: qrisOvo },
      { id: "gopay", name: "GoPay", logo: qrisGopay },
    ],
    "Convenience (Convenience Store)": [
      { id: "alfamart", name: "Alfamart", logo: ConvenienceAlfamart },
      { id: "indomaret", name: "Indomaret", logo: ConvenienceIndomaret },
    ],
  };

  const categoryIcons = {
    "Virtual Account": <Building size={16} />,
    "E-Wallet": <Wallet size={16} />,
    "QRIS (All Payment)": <QrCode size={16} />,
    QRIS: <QrCode size={16} />,
    "Convenience (Convenience Store)": <ShoppingBag size={16} />,
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
          const filtered = methods.filter((m) =>
            m.name.toLowerCase().includes(search.toLowerCase())
          );
          if (filtered.length === 0) return null;

          const isOpen = openCategory === category;

          return (
            <div
              key={category}
              className="border rounded bg-white overflow-hidden"
            >
              {/* Header */}
              <button
                className="flex justify-between items-center w-full px-4 py-2 text-sm font-semibold"
                onClick={() =>
                  setOpenCategory(isOpen ? null : category)
                }
              >
                <div className="flex items-center gap-2">
                  {categoryIcons[category]}
                  <span>{category.toUpperCase()}</span>
                </div>

                {/* Panah dengan animasi Tailwind */}
                <div
                  className={`transform transition-transform duration-200 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDown size={16} />
                </div>
              </button>

              {/* Isi dengan animasi Tailwind */}
              <div
                className={`border-t px-4 overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
                }`}
              >
                {category === "QRIS (All Payment)" ? (
                  <button
                    key={filtered[0].id}
                    onClick={() => setSelected(filtered[0])}
                    className="w-full p-2 hover:bg-gray-100 rounded flex justify-center"
                  >
                    <img
                      src={filtered[0].logo}
                      alt={filtered[0].name}
                      className="w-full h-auto object-contain max-h-40"
                    />
                  </button>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filtered.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelected(m)}
                        className="flex items-center justify-center w-full h-24 border rounded-lg hover:shadow-md hover:bg-gray-50 transition"
                      >
                        <img
                          src={m.logo}
                          alt={m.name}
                          className="max-h-10 object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}