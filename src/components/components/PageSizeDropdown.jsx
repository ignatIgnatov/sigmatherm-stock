import React, { useState, useRef, useEffect } from "react";

const PageSizeDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = [10, 20, 50, 100, 500];

  // Затваряне при клик извън менюто
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-28" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm text-gray-700 shadow-sm flex justify-between items-center transition focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-gray-800 dark:text-gray-200"
      >
        {value}
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <ul className="absolute mt-2 w-full rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg z-50 overflow-hidden">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange({ target: { value: option } });
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-100 ${
                option === value
                  ? "bg-blue-50 font-medium dark:bg-gray-600"
                  : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PageSizeDropdown;
