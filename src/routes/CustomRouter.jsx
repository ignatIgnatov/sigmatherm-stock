import React from "react";
import { Route, Routes } from "react-router-dom";
import Items from "../components/items/Items";
import Syncs from "../components/syncs/Syncs";
import Navbar from "../components/nav/Navbar";

const CustomRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/syncs" element={<Syncs />} />
      </Routes>
    </>
  );
};

export default CustomRouter;
