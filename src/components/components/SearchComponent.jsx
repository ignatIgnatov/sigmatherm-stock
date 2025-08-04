import React, { useState, useEffect } from "react";

const SearchComponent = ({ value = "", onSearchChange, minLength = 1 }) => {
  const [searchQuery, setSearchQuery] = useState(value);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.length >= minLength) {
        onSearchChange && onSearchChange(searchQuery);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, minLength, onSearchChange]);

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Търсене..."
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 text-sm shadow-sm
                   focus:outline-none"
        aria-label="Търсене"
      />
      <svg
        className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-300 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default React.memo(SearchComponent);
