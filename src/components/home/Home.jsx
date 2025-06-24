import React, { useState } from "react";
import { loginFormControl } from "../../utils/utils";
import InputComponent from "../form-components/InputComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth/authSlice";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const result = await dispatch(login(formData));

      if (login.fulfilled.match(result)) {
        navigate("/items");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <div className="p-6 sm:p-8 rounded-xl shadow-md flex flex-col justify-center items-center gap-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-100">
        <h1 className="font-semibold text-2xl text-center">LOGIN</h1>

        {isLoading && <Loader />}

        <div className="flex flex-col justify-center items-center gap-6 w-full">
          {loginFormControl.map((item) => (
            <div key={item.id} className="w-full">
              <InputComponent
                type={item.type}
                placeholder={item.placeholder}
                label={item.label}
                value={formData[item.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [item.id]: event.target.value,
                  });
                }}
              />
            </div>
          ))}
        </div>

        <div className="w-full sm:w-2/3">
          <button
            className="mt-6 inline-flex w-full items-center shadow-md justify-center rounded-lg bg-[#87afad] px-4 py-2 text-lg text-white font-medium transition-transform duration-500 transform hover:scale-105 hover:shadow-sm"
            onClick={() => {
              handleSubmit();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
