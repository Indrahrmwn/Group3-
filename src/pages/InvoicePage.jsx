import React from "react";

export default function InvoicePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black p-8 mt-25">
      {/* Tombol Cetak */}
      <div className="flex justify-end mb-4 no-print">
        <button
          onClick={handlePrint}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Cetak
        </button>
      </div>

      {/* Logo */}
      <div className="text-center mb-6">
        <img
          src="/logo.png"
          alt="Logo"
          className="mx-auto h-16 mb-2"
        />
        <h1 className="text-xl font-semibold tracking-widest">REMAJA TENGAH</h1>
      </div>

      {/* Info Pembayaran */}
      <div className="mb-6">
        <p>Tanggal Pembayaran : 13 September 2025 11:21:35</p>
        <p>Pembayaran : Virtual Account</p>
      </div>

      {/* Ringkasan Pembayaran */}
      <div className="border p-4 mb-6">
        <h2 className="font-semibold mb-2">Ringkasan Pembayaran</h2>
        <ul className="mb-2">
          <li className="flex justify-between">
            <span>Test Belanja 1234 - Ticket Test Online</span>
            <span>Rp 10.000</span>
          </li>
          <li className="flex justify-between">
            <span>Test Belanja 1234 - Ticket Test Online</span>
            <span>Rp 10.000</span>
          </li>
        </ul>
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Subtotal</span>
          <span>Rp 20.000</span>
        </div>
      </div>

      {/* Total + Status */}
      <div className="border p-4 mb-6 bg-yellow-50">
        <div className="flex justify-between font-bold">
          <span>Total Bayar</span>
          <span>Rp 20.000</span>
        </div>
        <div className="flex justify-between text-red-600 font-semibold">
          <span>Status Pembayaran</span>
          <span>Belum Dibayar</span>
        </div>
      </div>

      {/* Detail Pembeli */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Detail Pembeli :</h2>
        <p>Marcellino Dwi Steven</p>
        <p>MarcellHart87@gmail.com</p>
      </div>

      <hr className="my-6" />

      {/* Detail Event */}
      <div className="mb-6">
        <img src="/logo.png" alt="Logo" className="h-10 mb-2" />
        <p>
          Nomor Invoice : <b>18292892874HLWEUOGSKJWJE</b>
        </p>
        <p>Nama Event : Remaja Tengah Show</p>
        <p>Tanggal : 13 September 2025 11:21:58</p>
      </div>

      {/* Nama Tiket */}
      <div className="border p-4 mb-6">
        <h2 className="font-semibold mb-2">Nama Tiket</h2>
        <div className="flex justify-between">
          <span>Remaja Tengah Show - Marcellino Dwi Steven</span>
          <span>Rp 10.000</span>
        </div>
        <div className="flex justify-between">
          <span>Remaja Tengah Show - Marcellino Dwi Steven</span>
          <span>Rp 10.000</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Subtotal</span>
          <span>Rp 20.000</span>
        </div>
      </div>

      {/* Total + Status (Bawah) */}
      <div className="border p-4 mb-6 bg-yellow-50">
        <div className="flex justify-between font-bold">
          <span>Total Bayar</span>
          <span>Rp 20.000</span>
        </div>
        <div className="flex justify-between text-red-600 font-semibold">
          <span>Status Pembayaran</span>
          <span>Belum Dibayar</span>
        </div>
      </div>
    </div>
  );
}
