import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jwt = "jwt";
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const getButtonClasses = (path) => {
    const isActive = location.pathname === path;
    return `w-full sm:w-auto shadow-sm rounded-lg px-4 py-1 text-lg font-medium transition-transform duration-300 transform hover:scale-105 ${
      isActive
        ? "bg-gray-100 text-gray-800"
        : "bg-gray-300 text-gray-600 hover:bg-blue-200"
    }`;
  };

  return (
    <div className="m-4 mt-2 px-4 py-2 pt-4 sm:pt-2 flex flex-col sm:flex-row justify-center sm:justify-between items-center bg-gray-400 rounded-lg relative">
      <div className="font-semibold text-gray-600 text-xl mb-2 sm:mb-0">
        SIGMATHERM STOCK
      </div>

      <div className="absolute right-4 top-4 sm:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`flex-col sm:flex sm:flex-row gap-4 items-center sm:static absolute z-50 bg-gray-400 sm:bg-transparent top-16 left-0 w-full sm:w-auto px-4 py-4 sm:py-0 sm:px-0 transition-all duration-300 ease-in-out ${
          menuOpen ? "flex" : "hidden"
        }`}
      >
        <button
          className={getButtonClasses("/items")}
          onClick={() => navigate("/items")}
        >
          Продукти
        </button>

        <button
          className={getButtonClasses("/syncs")}
          onClick={() => navigate("/syncs")}
        >
          Синхронизации
        </button>

        {jwt && (
          <button
            className={getButtonClasses("/")}
            onClick={() => navigate("/")}
          >
            Изход
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
