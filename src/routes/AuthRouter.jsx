import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AuthRouter;
