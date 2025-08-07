import React, { useState, useEffect } from "react";
import { loginFormControl } from "../../utils/utils";
import InputComponent from "../form-components/InputComponent";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authSlice";
import Loader from "../components/Loader";

// SVG икони за показване/скриване на парола
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
      clipRule="evenodd"
    />
    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
  </svg>
);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Пренасочване ако потребителят вече е логнат
  useEffect(() => {
    if (token) {
      const from = location.state?.from?.pathname || "/items";
      navigate(from, { replace: true });
    }
  }, [token, navigate, location]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const result = await dispatch(login(formData));

      if (login.fulfilled.match(result)) {
        // Пренасочването се обработва от useEffect
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // Обработка на натискане на Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div
        className="p-6 sm:p-8 rounded-xl shadow-md flex flex-col justify-center items-center gap-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-100"
        onKeyDown={handleKeyPress}
      >
        <h1 className="font-semibold text-2xl text-center">LOGIN</h1>

        {isLoading && <Loader />}

        {error && (
          <div className="w-full p-3 bg-red-50 text-red-700 rounded-lg text-center">
            {error.message || "Login error. Please try again."}
          </div>
        )}

        <div className="flex flex-col justify-center items-center gap-6 w-full">
          {loginFormControl.map((item) => {
            if (item.id === "password") {
              return (
                <div key={item.id} className="w-full">
                  <InputComponent
                    key="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (formErrors.password) {
                        setFormErrors({ ...formErrors, password: "" });
                      }
                    }}
                    error={formErrors.password}
                    showPasswordToggle={true}
                  />
                </div>
              );
            }

            return (
              <div key={item.id} className="w-full">
                <InputComponent
                  type={item.type}
                  placeholder={item.placeholder}
                  label={item.label}
                  value={formData[item.id]}
                  error={formErrors[item.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [item.id]: event.target.value,
                    });
                    if (formErrors[item.id]) {
                      setFormErrors({ ...formErrors, [item.id]: "" });
                    }
                  }}
                />
              </div>
            );
          })}

          <div className="w-full sm:w-2/3">
            <button
              className="mt-6 inline-flex w-full items-center shadow-md justify-center rounded-lg bg-[#87afad] px-4 py-2 text-lg text-white font-medium transition-transform duration-500 transform hover:scale-105 hover:shadow-sm disabled:opacity-75 disabled:transform-none"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
