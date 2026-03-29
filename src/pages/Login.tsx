import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../services/firebase";

// Basit şifreleme fonksiyonu
const simpleEncrypt = (text: string): string => {
  return btoa(text); // Base64 encoding
};

// Basit şifre çözme fonksiyonu
const simpleDecrypt = (text: string): string => {
  return atob(text); // Base64 decoding
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan bilgileri al
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedPassword && savedRememberMe) {
      setEmail(savedEmail);
      setPassword(simpleDecrypt(savedPassword));
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Beni hatırla seçeneğine göre persistence ayarını yap
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, email, password);

      // Beni hatırla seçiliyse bilgileri kaydet
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", simpleEncrypt(password));
        localStorage.setItem("rememberMe", "true");
      } else {
        // Seçili değilse bilgileri temizle
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberMe");
      }

      navigate("/");
    } catch (error: any) {
      setError(
        error.code === "auth/invalid-credential"
          ? "E-posta veya şifre hatalı."
          : "Giriş yapılırken bir hata oluştu."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-800 via-green-900 to-teal-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Büyülü Arka Plan Efektleri */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Yıldızlar */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-emerald-200 rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Sihirli Işık Efektleri */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`light-${i}`}
            className="absolute bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 rounded-full animate-pulse-slow"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(70px)",
            }}
          />
        ))}

        {/* Yapraklar */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute text-2xl animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          >
            {["🌿", "🍃", "🌱", "☘️"][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="max-w-md w-full relative">
        {/* Logo ve Başlık */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🌳</div>
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300">
            Masal Dünyasına Hoş Geldin!
          </h1>
          <p className="text-emerald-200">
            Büyülü macerana başlamak için giriş yap
          </p>
        </div>

        {/* Giriş Formu */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-emerald-500/20">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm text-red-200 p-4 rounded-2xl text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-emerald-200 mb-2 text-sm">
                E-posta Adresin
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-emerald-200 mb-2 text-sm">
                Sihirli Şifren
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-emerald-600 bg-white/5 border-emerald-500/20 rounded focus:ring-emerald-500/50"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-emerald-200"
              >
                Beni Hatırla
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl py-4 font-semibold text-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isLoading ? "Giriş Yapılıyor..." : "Maceraya Başla ✨"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-emerald-200">
              Henüz bir hesabın yok mu?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors duration-300"
              >
                Hemen Kaydol! 🌱
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
