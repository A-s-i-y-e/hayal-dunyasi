import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/firebase";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    userType: "veli",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(
        formData.email,
        formData.password,
        formData.name,
        formData.userType
      );
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-yellow-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8 bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
        <div>
          <div className="text-center mb-8">
            <span className="text-6xl animate-bounce inline-block">🎡</span>
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold bg-gradient-to-r from-green-500 via-yellow-500 to-pink-500 text-transparent bg-clip-text">
            Macerana Başla!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hayal dünyasına hoş geldin! 🌈
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-xl">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Adın Ne? 👋
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Adını yaz"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Adresin 📧
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="senin@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gizli Şifren 🔑
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="userType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sen Kimsin? 🎭
              </label>
              <select
                id="userType"
                name="userType"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="veli">Veliyim 👨‍👩‍👧‍👦</option>
                <option value="ogretmen">Öğretmenim 👩‍🏫</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <span className="text-xl">✨</span>
              </span>
              Haydi Başlayalım!
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Zaten hesabın var mı?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-green-600 hover:text-green-500 hover:underline"
            >
              Hemen Giriş Yap! 🎪
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
