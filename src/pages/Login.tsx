import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(formData.email, formData.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8 bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
        <div>
          <div className="text-center mb-8">
            <span className="text-6xl animate-bounce inline-block">🎪</span>
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Tekrar Hoş Geldin!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Haydi maceraya devam edelim! ✨
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
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
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
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <span className="text-xl">🚀</span>
              </span>
              Maceraya Başla!
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Henüz hesabın yok mu?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-medium text-purple-600 hover:text-purple-500 hover:underline"
            >
              Hemen Kayıt Ol! 🌟
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
