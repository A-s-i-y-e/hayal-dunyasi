import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-800 relative overflow-hidden">
      {/* Animasyonlu Arka Plan Elementleri */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${Math.random() * 20 + 20}px`,
            }}
          >
            {["✨", "🌟", "💫", "⭐", "🌙"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Ana Başlık */}
        <div className="text-center mb-16 transform hover:scale-105 transition-transform duration-500">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 animate-gradient">
            Hayal Dünyasına
            <br />
            Hoş Geldiniz
          </h1>
          <p className="text-xl md:text-2xl text-pink-200 max-w-3xl mx-auto leading-relaxed">
            Masallar, çizimler ve kahramanlarla dolu büyülü bir yolculuğa
            çıkmaya hazır mısınız? 🌟
          </p>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Çizim Atölyesi Kartı */}
          <div
            onClick={() => handleCardClick("/drawing-workshop")}
            className="group relative bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer transform hover:-translate-y-2"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
              🎨
            </div>
            <h3 className="text-2xl font-bold mb-4 text-cyan-300">
              Masallar Çizim Atölyesi
            </h3>
            <p className="text-cyan-200 leading-relaxed">
              Hayal gücünü renklerle buluştur ve kendi masalını resimle!
            </p>
          </div>

          {/* Masal Kütüphanesi Kartı */}
          <div
            onClick={() => handleCardClick("/library")}
            className="group relative bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer transform hover:-translate-y-2"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
              📚
            </div>
            <h3 className="text-2xl font-bold mb-4 text-amber-300">
              Masal Kütüphanesi
            </h3>
            <p className="text-amber-200 leading-relaxed">
              Binbir gece masallarından modern hikayelere, keşfedilmeyi bekleyen
              bir dünya!
            </p>
          </div>

          {/* Kahraman Profili Kartı */}
          <div
            onClick={() => handleCardClick("/profile")}
            className="group relative bg-gradient-to-br from-rose-500/20 to-red-500/20 rounded-3xl p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20 cursor-pointer transform hover:-translate-y-2"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-red-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
              👑
            </div>
            <h3 className="text-2xl font-bold mb-4 text-rose-300">
              Kahraman Profili
            </h3>
            <p className="text-rose-200 leading-relaxed">
              Kendi masal kahramanını oluştur ve maceralarını kaydet!
            </p>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="text-center mt-16">
          <p className="text-lg text-purple-200 animate-pulse">
            ✨ Her gün yeni masallar ve sürprizler sizi bekliyor! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
