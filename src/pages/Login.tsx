import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err: any) {
      let errorMessage = "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.";

      // Firebase hata mesajlarını Türkçeleştirme
      if (err.code === "auth/user-not-found") {
        errorMessage = "Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Hatalı şifre girdiniz.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Geçersiz e-posta adresi.";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage =
          "Çok fazla başarısız giriş denemesi yaptınız. Lütfen daha sonra tekrar deneyin.";
      }

      setError(errorMessage);
    }
  };

  // Uzay elementleri için rastgele pozisyon oluşturan yardımcı fonksiyon
  const randomPosition = () => {
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B3B] via-[#1A1A5A] to-[#2E2E8A] relative overflow-hidden pt-16">
      {/* Uzay Arka Plan Animasyonları */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Yıldızlar */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              ...randomPosition(),
            }}
          />
        ))}

        {/* Kayan Yıldızlar */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`shooting-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
            style={{
              ...randomPosition(),
              boxShadow: "0 0 10px #fff, 0 0 20px #fff",
            }}
          />
        ))}

        {/* Gezegenler ve Uzay Emojileri */}
        {["🌍", "🌎", "🌏", "🌑", "🌕", "🌠", "☄️", "🚀"].map((emoji, i) => (
          <div
            key={`space-${i}`}
            className="absolute text-4xl animate-float-slow"
            style={randomPosition()}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Giriş Formu */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div
          className={`max-w-md mx-auto transform transition-all duration-1000 ${
            showWelcome
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-8">
            <div className="text-7xl mb-4 animate-float-slow inline-block">
              🚀
            </div>
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 animate-pulse">
              Hayal Dünyası Uzay Merkezi
            </h1>
            <p className="text-gray-300">
              Yıldızlar arasında hayallerine yolculuk et! ✨
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-blue-500/20"
          >
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-200 text-center">
                {error}
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-blue-300 mb-2 text-lg"
              >
                Hayal Kaptanı E-postası
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-blue-500/20 rounded-xl px-4 py-3 text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                placeholder="kaptan@hayaldunyasi.com"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-blue-300 mb-2 text-lg"
              >
                Hayal Şifresi
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-blue-500/20 rounded-xl px-4 py-3 text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl py-3 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <span className="group-hover:animate-bounce">🌠</span>
              <span>Hayal Dünyasına Giriş</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/register")}
              className="text-blue-300 hover:text-blue-200 transition-colors duration-300"
            >
              Henüz hayal dünyasına katılmadın mı? Hemen aramıza katıl! 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
