const InputComponent = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  prefix,
  disabled,
  min,
  max,
}) => {
  return (
    <div className="relative">
      <p className="absolute pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-gray-100">
        {label}
      </p>
      <div className="flex items-center border placeholder-gray-400 focus-within:border-[#a6b5b3] w-full text-base bg-gray-100 border-gray-300 rounded-md">
        {prefix && (
          <span className="pl-4 text-gray-600 font-semibold">{prefix}</span>
        )}
        <input
          placeholder={placeholder}
          type={type || "text"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          min={min}
          max={max}
          className={`w-full p-2 focus:outline-none bg-transparent autofill-input`}
        />
      </div>
    </div>
  );
};

export default InputComponent;
