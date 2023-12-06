import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import UserDetail from "./Components/userdetail/UserDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="user-details" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
