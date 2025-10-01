import { useState } from "react";

export default function TiketUser() {
  const data = [
    {
      id: 1,
      nama: "Marcelino Dwi",
      event: "Test 1 2 3 4",
      info: "Tiket Test Online",
      sesi: "02-September-2025 11:00 - 14:00",
      tanggal: "02-September-2025 11:56:04",
      status: "Sukses",
      total: "Rp10.000",
    },
    {
      id: 2,
      nama: "Aditya Rahman",
      event: "Test 1 2 3 4",
      info: "Tiket Test Online",
      sesi: "02-September-2025 11:00 - 14:00",
      tanggal: "02-September-2025 11:58:12",
      status: "Sukses",
      total: "Rp10.000",
    },
    {
      id: 3,
      nama: "Budi Santoso",
      event: "Test 1 2 3 4",
      info: "Tiket Test Online",
      sesi: "02-September-2025 11:00 - 14:00",
      tanggal: "02-September-2025 12:02:45",
      status: "Sukses",
      total: "Rp10.000",
    },
    {
      id: 4,
      nama: "Citra Ayu",
      event: "Test 1 2 3 4",
      info: "Tiket Test Online",
      sesi: "02-September-2025 11:00 - 14:00",
      tanggal: "02-September-2025 12:05:33",
      status: "Sukses",
      total: "Rp10.000",
    },
    {
      id: 5,
      nama: "Dewi Lestari",
      event: "Test 1 2 3 4",
      info: "Tiket Test Online",
      sesi: "02-September-2025 11:00 - 14:00",
      tanggal: "02-September-2025 12:10:21",
      status: "Sukses",
      total: "Rp10.000",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col mt-20">
      {/* Background merah besar */}
      <div className="bg-red-700 py-10 px-6 rounded-b-xl">
        {/* Header */}
        <h1 className="text-white text-xl font-bold mb-6">TIKET SAYA</h1>

        {/* Box putih */}
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">Event</th>
                  <th className="px-6 py-3">Info Ticket</th>
                  <th className="px-6 py-3">Sesi</th>
                  <th className="px-6 py-3">Tanggal Registrasi</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Langkah Selanjutnya</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{row.nama}</td>
                    <td className="px-6 py-4">{row.event}</td>
                    <td className="px-6 py-4">{row.info}</td>
                    <td className="px-6 py-4">{row.sesi}</td>
                    <td className="px-6 py-4">{row.tanggal}</td>
                    <td className="px-6 py-4">{row.status}</td>
                    <td className="px-6 py-4">{row.total}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded">
                        Close
                      </button>
                      <button className="px-3 py-1 text-xs bg-red-600 text-white rounded">
                        Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
