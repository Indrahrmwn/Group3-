// src/components/Pagination.jsx
import { useState, useEffect } from "react";

export default function Pagination({ totalPages = 5, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  // setiap kali currentPage berubah, kasih tau parent (NewsGrid)
  useEffect(() => {
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const getPageNumbers = () => {
    let pages = [];
    if (totalPages <= 7) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, "...", totalPages - 1, totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  };

  return (
    <div className="flex gap-2 mt-6 justify-center">
      {/* Tombol Previous */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        {"<"}
      </button>

      {/* Nomor Halaman */}
      {getPageNumbers().map((page, idx) => (
        <button
          key={idx}
          onClick={() => page !== "..." && setCurrentPage(page)}
          disabled={page === "..."}
          className={`px-3 py-1 border rounded ${
            currentPage === page ? "bg-red-500 text-white" : "bg-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Tombol Next */}
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
}
