import { SearchIcon } from "lucide-react";
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
      <SearchIcon
        className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-300 pointer-events-none"
        size={20}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Търсене..."
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 text-sm shadow-sm
                   focus:outline-none"
        aria-label="Търсене"
      />
    </div>
  );
};

export default React.memo(SearchComponent);
