import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Star: React.FC<{ delay: number }> = ({ delay }) => {
  const size = Math.random() * 3 + 1;
  return (
    <div
      className="absolute bg-white rounded-full animate-twinkle"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

const ShootingStar: React.FC<{ delay: number }> = ({ delay }) => {
  return (
    <div
      className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
      style={{
        top: `${Math.random() * 50}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        boxShadow: "0 0 10px #fff, 0 0 20px #fff",
      }}
    />
  );
};

const Planet: React.FC<{ emoji: string; delay: number }> = ({
  emoji,
  delay,
}) => {
  return (
    <div
      className="absolute text-4xl animate-float-slow"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
      }}
    >
      {emoji}
    </div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  const planets = ["🌍", "🌎", "🌏", "🌑", "🌕", "🌠", "☄️", "🚀"];
  const stars = Array.from({ length: 50 }, (_, i) => i);
  const shootingStars = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B3B] via-[#1A1A5A] to-[#2E2E8A] relative overflow-hidden">
      {/* Yıldızlar */}
      {stars.map((_, index) => (
        <Star key={`star-${index}`} delay={index * 0.2} />
      ))}

      {/* Kayan Yıldızlar */}
      {shootingStars.map((_, index) => (
        <ShootingStar key={`shooting-${index}`} delay={index * 3} />
      ))}

      {/* Gezegenler */}
      {planets.map((planet, index) => (
        <Planet key={`planet-${index}`} emoji={planet} delay={index * 2} />
      ))}

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
            <div className="text-7xl mb-4 animate-float-slow inline-block">
              🚀
            </div>
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 animate-pulse">
              Hayal Dünyasına Hoş Geldin!
            </h1>
            <p className="text-2xl text-gray-200 mb-8 font-medium animate-fadeIn">
              Uzayın derinliklerinde kendi hikayeni yaratmaya hazır mısın? ✨
            </p>
          </div>

          {/* Butonlar */}
          <div className="space-y-4 md:space-y-0 md:space-x-6">
            <button
              onClick={() => navigate("/login")}
              className="transform hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] flex items-center justify-center space-x-2 w-64 mx-auto md:inline-flex group"
            >
              <span className="group-hover:animate-bounce">🚀</span>
              <span>Maceraya Başla</span>
            </button>
            <button
              onClick={() => navigate("/register")}
              className="transform hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] flex items-center justify-center space-x-2 w-64 mx-auto md:inline-flex group"
            >
              <span className="group-hover:animate-bounce">🌟</span>
              <span>Yeni Kahraman Ol</span>
            </button>
          </div>

          {/* Özellik Kartları */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl transform hover:-translate-y-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🎨</div>
              <h3 className="text-2xl font-bold text-blue-300 mb-3">
                Galakside Çiz
              </h3>
              <p className="text-gray-300">
                Uzayın derinliklerinde kendi karakterlerini tasarla!
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl transform hover:-translate-y-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🌌</div>
              <h3 className="text-2xl font-bold text-purple-300 mb-3">
                Yıldızlarda Hikaye
              </h3>
              <p className="text-gray-300">
                Her gezegen yeni bir macera, her yıldız yeni bir hikaye!
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl transform hover:-translate-y-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🎮</div>
              <h3 className="text-2xl font-bold text-pink-300 mb-3">
                Uzay Oyunları
              </h3>
              <p className="text-gray-300">
                Galaksiler arası yolculukta eğlenceli oyunlar!
              </p>
            </div>
          </div>

          {/* Alt Bilgi */}
          <div className="mt-16 text-center">
            <p className="text-gray-300 text-lg animate-pulse">
              Güvenli bir uzay yolculuğu için ebeveyn kontrolü 🛸
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
