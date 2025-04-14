import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";
import Items from "../components/items/Items";
import Syncs from "../components/syncs/Syncs";

const CustomRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/syncs" element={<Syncs />} />
    </Routes>
  );
};

export default CustomRouter;
