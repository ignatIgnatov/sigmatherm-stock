import "./App.css";
import AuthRouter from "./routes/AuthRouter";
import CustomRouter from "./routes/CustomRouter";

function App() {
  return (
    <div>
      <AuthRouter />
      <CustomRouter />
    </div>
  );
}

export default App;
