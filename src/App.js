import "./App.css";
import Navbar from "./components/nav/Navbar";
import AuthRouter from "./routes/AuthRouter";
import CustomRouter from "./routes/CustomRouter";

function App() {
  return (
    <div>
      <AuthRouter />
      <Navbar />
      <CustomRouter />
    </div>
  );
}

export default App;
