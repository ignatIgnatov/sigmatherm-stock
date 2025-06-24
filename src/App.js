import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import PrivateRoute from "./routes/PrivateRoute";
import Items from "./components/items/Items";
import Brands from "./components/brands/Brands";
import Syncs from "./components/syncs/Syncs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/items" element={<Items />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/syncs" element={<Syncs />} />
      </Route>
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
