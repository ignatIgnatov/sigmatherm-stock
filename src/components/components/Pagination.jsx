import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Или замени с SVG ако не използваш икони

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const getPageNumbers = () => {
    const pages = new Set();

    pages.add(0); // Винаги показваме първата страница
    pages.add(totalPages - 1); // Винаги последната

    if (currentPage > 1) pages.add(currentPage - 1);
    pages.add(currentPage);
    if (currentPage < totalPages - 2) pages.add(currentPage + 1);

    if (totalPages > 6) {
      pages.add(1);
      pages.add(totalPages - 2);
    }

    return [...pages].sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  const renderEllipsis = (index) => {
    const prev = pageNumbers[index - 1];
    const curr = pageNumbers[index];
    return curr - prev > 1 ? (
      <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
        ...
      </span>
    ) : null;
  };

  if (totalPages <= 1) return null;

  return (
    <div
      className={`flex items-center justify-center gap-1 text-sm select-none ${className}`}
    >
      {/* Предишна страница */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-2 py-2 rounded-md flex items-center justify-center border ${
          currentPage === 0
            ? "opacity-50 cursor-not-allowed text-gray-400 border-gray-200"
            : "hover:bg-gray-100 text-gray-700 border-gray-300"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Страници с пропуски */}
      {pageNumbers.map((page, i) => (
        <React.Fragment key={page}>
          {i > 0 && renderEllipsis(i)}
          <button
            onClick={() => onPageChange(page)}
            className={`min-w-[36px] h-9 px-3 py-1 rounded-lg border ${
              page === currentPage
                ? "bg-gray-600 text-white font-medium border-gray-600"
                : "hover:bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {page + 1}
          </button>
        </React.Fragment>
      ))}

      {/* Следваща страница */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className={`px-2 py-2 rounded-md flex items-center justify-center border ${
          currentPage >= totalPages - 1
            ? "opacity-50 cursor-not-allowed text-gray-400 border-gray-200"
            : "hover:bg-gray-100 text-gray-700 border-gray-300"
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
