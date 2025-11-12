import { useState } from "react";
import Headder from "./pages/headder/Headder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signUp/Signup";
import Dashbord from "./pages/dashbord/Dashbord";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Headder />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/Dashbord" element={<Dashbord />} />
      </Routes>
    </>
  );
}

export default App;
