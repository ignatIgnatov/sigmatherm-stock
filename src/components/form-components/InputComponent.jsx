import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

const InputComponent = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  prefix,
  suffix,
  disabled,
  min,
  max,
  error,
  showPasswordToggle,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (showPasswordToggle && type === "password") {
      return showPassword ? "text" : "password";
    }
    return type || "text";
  };

  return (
    <div className="relative">
      <p className="absolute pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-gray-100">
        {label}
      </p>
      <div
        className={` border placeholder-gray-400 focus-within:border-[#a6b5b3] w-full text-base bg-gray-100 border-gray-300 rounded-md ${
          error ? "border-red-500" : ""
        }`}
      >
        {prefix && (
          <span className="pl-4 text-gray-600 font-semibold">{prefix}</span>
        )}
        <input
          placeholder={placeholder}
          type={getInputType()}
          value={value}
          onChange={onChange}
          disabled={disabled}
          min={min}
          max={max}
          className={`w-full p-2 focus:outline-none bg-transparent autofill-input ${
            prefix ? "pl-1" : ""
          } ${suffix || showPasswordToggle ? "pr-10" : ""}`}
        />

        {showPasswordToggle && (
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        )}

        {suffix && (
          <span className="pr-4 text-gray-600 font-semibold">{suffix}</span>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputComponent;
