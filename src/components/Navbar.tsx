import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOutUser } from "../services/firebase";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error("Çıkış yapılırken hata:", error);
    }
  };

  // Eğer login veya register sayfalarındaysak navbar'ı gösterme
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#1a1a2e]/80 backdrop-blur-lg shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => navigate("/")}
              className="text-white text-2xl font-bold hover:text-purple-400 transition-colors duration-300 flex items-center space-x-2"
            >
              <span>✨</span>
              <span>Hayal Dünyası</span>
            </button>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate("/draw")}
                className="text-white hover:text-purple-400 transition-colors duration-300 flex items-center space-x-1"
              >
                <span>🎨</span>
                <span>Çizim</span>
              </button>
              <button
                onClick={() => navigate("/stories")}
                className="text-white hover:text-purple-400 transition-colors duration-300 flex items-center space-x-1"
              >
                <span>📚</span>
                <span>Hikayeler</span>
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="text-white hover:text-purple-400 transition-colors duration-300 flex items-center space-x-1"
              >
                <span>👤</span>
                <span>Profil</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="text-white hover:text-purple-400 transition-colors duration-300 flex items-center space-x-1"
            >
              <span>🚪</span>
              <span>Çıkış</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
