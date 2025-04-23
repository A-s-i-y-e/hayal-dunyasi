import React from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

const Navbar: React.FC = () => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`text-lg font-semibold ${
                isActive("/")
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/library"
              className={`text-lg font-semibold ${
                isActive("/library")
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Kütüphane
            </Link>
            <Link
              to="/games"
              className={`text-lg font-semibold ${
                isActive("/games")
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Oyunlar
            </Link>
            <Link
              to="/drawing-workshop"
              className={`text-lg font-semibold ${
                isActive("/drawing-workshop")
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Çizim Atölyesi
            </Link>
            <Link
              to="/create-story-form"
              className={`text-lg font-semibold ${
                isActive("/create-story-form")
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Hikayeni Yaz
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className={`text-lg font-semibold ${
                isActive("/profile")
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Profil
            </Link>
            <button
              onClick={handleLogout}
              className="text-lg font-semibold text-gray-700 hover:text-purple-600"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
