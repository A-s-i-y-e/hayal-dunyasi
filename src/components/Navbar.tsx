import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-80 transition-opacity"
            >
              Hayal Dünyası
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Çıkış Yap
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
