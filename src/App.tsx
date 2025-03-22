import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#0B0B3B] via-[#1A1A5A] to-[#2E2E8A]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
