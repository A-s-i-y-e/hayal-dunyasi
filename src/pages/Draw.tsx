import React, { useState } from "react";
import { auth } from "../services/firebase";

const Draw: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string>("pencil");

  const drawingTools = [
    {
      id: "pencil",
      name: "Sihirli Kalem",
      icon: "✏️",
      description: "Özgürce çiz ve renklendir",
    },
    {
      id: "brush",
      name: "Büyülü Fırça",
      icon: "🖌️",
      description: "Kalın ve renkli çizgiler",
    },
    {
      id: "eraser",
      name: "Bulut Silgi",
      icon: "☁️",
      description: "Nazikçe sil ve düzelt",
    },
    {
      id: "shapes",
      name: "Sihirli Şekiller",
      icon: "⭐",
      description: "Hazır şekiller kullan",
    },
  ];

  const recentDrawings = [
    {
      id: 1,
      title: "Uçan Unicorn",
      thumbnail: "🦄",
      date: "2024-03-20",
      likes: 15,
    },
    {
      id: 2,
      title: "Sihirli Şato",
      thumbnail: "🏰",
      date: "2024-03-19",
      likes: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-800 to-blue-900 relative overflow-hidden pt-20">
      {/* Büyülü Arka Plan Efektleri */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Yıldızlar */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full animate-twinkle"
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
            className="absolute bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 rounded-full animate-pulse-slow"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(70px)",
            }}
          />
        ))}
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300">
            Çizim Atölyesi 🎨
          </h1>
          <p className="text-cyan-200 text-xl">
            Hayal ettiğin karakterleri hayata geçir
          </p>
        </div>

        {/* Çizim Alanı */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Araç Çubuğu */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Araçlar ✨</h3>
              <div className="space-y-4">
                {drawingTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`w-full p-4 rounded-2xl transition-all duration-300 ${
                      selectedTool === tool.id
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50"
                        : "bg-white/5 hover:bg-white/10 text-blue-200"
                    }`}
                  >
                    <div className="text-3xl mb-2">{tool.icon}</div>
                    <div className="text-sm font-semibold">{tool.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Çizim Kanvası */}
          <div className="lg:col-span-7">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl aspect-[4/3] border border-blue-500/20 flex items-center justify-center">
              <p className="text-cyan-200 text-center">
                Çizim alanı burada olacak 🎨
                <br />
                (Canvas implementasyonu eklenecek)
              </p>
            </div>
          </div>

          {/* Renk Paleti ve Kayıtlı Çizimler */}
          <div className="lg:col-span-3 space-y-8">
            {/* Renk Paleti */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Renkler 🎨</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "purple",
                  "pink",
                  "white",
                ].map((color, i) => (
                  <button
                    key={color}
                    className={`w-full aspect-square rounded-xl transform hover:scale-110 transition-transform duration-300 shadow-lg`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Son Çizimlerim */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Son Çizimlerim 🖼️
              </h3>
              <div className="space-y-4">
                {recentDrawings.map((drawing) => (
                  <div
                    key={drawing.id}
                    className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{drawing.thumbnail}</div>
                      <div>
                        <h4 className="text-white font-semibold">
                          {drawing.title}
                        </h4>
                        <p className="text-cyan-200 text-sm">{drawing.date}</p>
                      </div>
                      <div className="ml-auto text-cyan-200">
                        ❤️ {drawing.likes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draw;
