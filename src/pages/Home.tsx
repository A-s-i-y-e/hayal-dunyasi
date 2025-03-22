import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  // Orman elementleri için rastgele pozisyon oluşturan yardımcı fonksiyon
  const randomPosition = () => {
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
    };
  };

  // Orman emojileri
  const forestEmojis = [
    "🌳",
    "🌲",
    "🌿",
    "🍄",
    "🦊",
    "🦉",
    "🦋",
    "🐿️",
    "🌸",
    "🍃",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a472a] via-[#2d5a3c] to-[#3c6d4e] relative overflow-hidden pt-16">
      {/* Arka plan animasyonları */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Ağaçlar ve bitkiler */}
        {forestEmojis.map((emoji, index) => (
          <div
            key={`forest-${index}`}
            className="absolute text-4xl animate-float-slow"
            style={{
              ...randomPosition(),
              fontSize: emoji === "🌳" || emoji === "🌲" ? "5rem" : "2rem",
              zIndex: emoji === "🌳" || emoji === "🌲" ? 1 : 2,
            }}
          >
            {emoji}
          </div>
        ))}

        {/* Düşen yapraklar */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute text-lg animate-leaf-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          >
            🍂
          </div>
        ))}

        {/* Ateş böcekleri */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`firefly-${i}`}
            className="absolute w-2 h-2 rounded-full bg-yellow-300/50 animate-firefly"
            style={{
              ...randomPosition(),
              boxShadow: "0 0 10px #ffd700, 0 0 20px #ffd700",
            }}
          />
        ))}
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div
          className={`text-center transform transition-all duration-1000 ${
            showWelcome
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Başlık Animasyonu */}
          <div className="mb-8 relative">
            <div className="text-7xl mb-4 animate-bounce inline-block">🌳</div>
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-yellow-200 to-green-300 animate-pulse">
              Hayal Dünyası Büyülü Ormanı
            </h1>
            <p className="text-2xl text-green-100 mb-8 font-medium">
              Hayallerin büyülü ormanında maceraya hazır mısın? 🌿
            </p>
          </div>

          {/* Butonlar */}
          <div className="space-y-4 md:space-y-0 md:space-x-6">
            <button
              onClick={() => navigate("/login")}
              className="transform hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center space-x-2 w-64 mx-auto md:inline-flex group"
            >
              <span className="group-hover:animate-bounce">🌿</span>
              <span>Hayallerine Başla</span>
            </button>
            <button
              onClick={() => navigate("/register")}
              className="transform hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center space-x-2 w-64 mx-auto md:inline-flex group"
            >
              <span className="group-hover:animate-bounce">🌸</span>
              <span>Hayal Dünyasına Katıl</span>
            </button>
          </div>

          {/* Özellik Kartları */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl transform hover:-translate-y-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-green-500/20 group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🎨</div>
              <h3 className="text-2xl font-bold text-green-300 mb-3">
                Hayal Et ve Çiz
              </h3>
              <p className="text-green-100">
                Hayallerini renkli çizimlerle hayata geçir!
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl transform hover:-translate-y-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-green-500/20 group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">📚</div>
              <h3 className="text-2xl font-bold text-green-300 mb-3">
                Hayal Hikayeleri
              </h3>
              <p className="text-green-100">
                Her hayal yeni bir hikaye, her düşünce yeni bir macera!
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl transform hover:-translate-y-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-green-500/20 group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🎮</div>
              <h3 className="text-2xl font-bold text-green-300 mb-3">
                Hayal Oyunları
              </h3>
              <p className="text-green-100">Hayallerini oyunlarla keşfet!</p>
            </div>
          </div>

          {/* Alt Bilgi */}
          <div className="mt-16 text-center">
            <p className="text-green-200 text-lg animate-pulse">
              Güvenli bir hayal yolculuğu için ebeveyn kontrolü 🌿
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
