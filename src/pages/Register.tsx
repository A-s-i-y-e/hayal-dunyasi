import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Kayıt oluşturulamadı. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  // Su altı elementleri için rastgele pozisyon oluşturan yardımcı fonksiyon
  const randomPosition = () => {
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
    };
  };

  // Su altı emojileri
  const underwaterEmojis = [
    "🐠",
    "🐟",
    "🐡",
    "🦈",
    "🐋",
    "🐳",
    "🐢",
    "🦀",
    "🦑",
    "🐙",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#003366] via-[#004080] to-[#0066cc] relative overflow-hidden pt-16">
      {/* Su Altı Arka Plan Animasyonları */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Baloncuklar */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-white/20 animate-float-slow"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              ...randomPosition(),
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Su Altı Canlıları */}
        {underwaterEmojis.map((emoji, i) => (
          <div
            key={`creature-${i}`}
            className="absolute text-4xl animate-swim"
            style={{
              ...randomPosition(),
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          >
            {emoji}
          </div>
        ))}

        {/* Su Yansımaları */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`reflection-${i}`}
            className="absolute bg-white/5 animate-sway"
            style={{
              width: "100px",
              height: "2px",
              ...randomPosition(),
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Kayıt Formu */}
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
              🐋
            </div>
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 animate-pulse">
              Hayal Dünyası Su Altı Macerası
            </h1>
            <p className="text-cyan-100">
              Hayallerin derinliklerinde yeni bir yolculuğa hazır mısın? 🌊
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-cyan-500/20"
          >
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-200 text-center">
                {error}
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-cyan-300 mb-2 text-lg"
              >
                Hayal Kaptanı E-postası
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-cyan-200/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                placeholder="kaptan@hayaldunyasi.com"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-cyan-300 mb-2 text-lg"
              >
                Hayal Şifresi
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-cyan-200/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-cyan-300 mb-2 text-lg"
              >
                Hayal Şifreni Tekrar Gir
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder-cyan-200/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xl py-3 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <span className="group-hover:animate-bounce">🐋</span>
              <span>Hayal Dünyasına Katıl</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300"
            >
              Zaten hayal dünyasının bir parçası mısın? Hemen giriş yap! 🌊
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
