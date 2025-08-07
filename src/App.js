import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Items from "./components/items/Items";
import Brands from "./components/brands/Brands";
import Syncs from "./components/syncs/Syncs";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Защитени маршрути */}
      <Route element={<PrivateRoute />}>
        <Route path="/items" element={<Items />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/syncs" element={<Syncs />} />

        {/* Пренасочване по подразбиране за защитените маршрути */}
        <Route index element={<Navigate to="/items" replace />} />
      </Route>

      {/* Пренасочвания */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
