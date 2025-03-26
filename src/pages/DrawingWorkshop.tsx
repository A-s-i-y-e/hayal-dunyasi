import React, { useState } from "react";

const DrawingWorkshop: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string>("brush");
  const [color, setColor] = useState<string>("#00B4D8");
  const [brushSize, setBrushSize] = useState<number>(5);
  const [selectedSticker, setSelectedSticker] = useState<string>("");

  const tools = [
    { id: "brush", icon: "🖌️", name: "Fırça" },
    { id: "eraser", icon: "🧹", name: "Silgi" },
    { id: "fill", icon: "🪣", name: "Dolgu" },
    { id: "spray", icon: "💨", name: "Sprey" },
    { id: "text", icon: "✍️", name: "Yazı" },
    { id: "sticker", icon: "🎯", name: "Çıkartma" },
  ];

  const stickers = [
    { emoji: "🦄", name: "Unicorn" },
    { emoji: "🌈", name: "Gökkuşağı" },
    { emoji: "⭐", name: "Yıldız" },
    { emoji: "🌸", name: "Çiçek" },
    { emoji: "🦋", name: "Kelebek" },
    { emoji: "🌟", name: "Parlak Yıldız" },
    { emoji: "🎨", name: "Palet" },
    { emoji: "🎭", name: "Maske" },
  ];

  const colors = [
    "#00B4D8", // Turkuaz
    "#0077B6", // Koyu Mavi
    "#90E0EF", // Açık Turkuaz
    "#CAF0F8", // Buz Mavisi
    "#023E8A", // Lacivert
    "#0096C7", // Okyanus Mavisi
    "#48CAE4", // Gökyüzü Mavisi
    "#ADE8F4", // Pastel Mavi
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-blue-900 to-indigo-900">
      {/* Üst Boşluk - Navbar için */}
      <div className="h-16"></div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Başlık */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-bounce">✨</div>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 animate-gradient pt-8">
            Çizim Atölyesi
          </h1>
          <p className="text-xl text-cyan-200 max-w-2xl mx-auto leading-relaxed">
            Hayal gücünü özgürce kullan! Sihirli fırçanla masallar diyarına renk
            kat 🎨
          </p>

          {/* Dekoratif Elementler */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={`deco-${i}`}
                className="absolute animate-float-slow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: 0.3,
                }}
              >
                {["🎨", "✨", "💫", "🖌️", "🎭"][i]}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sol Panel - Araçlar */}
          <div className="space-y-6">
            {/* Araç Kutusu */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 flex items-center gap-2">
                <span>🎨</span> Araçlar
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedTool === tool.id
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                        : "bg-white/5 hover:bg-white/10 text-cyan-200"
                    }`}
                  >
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <div className="text-sm font-medium">{tool.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Renk Paleti */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 flex items-center gap-2">
                <span>🎨</span> Renkler
              </h2>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-full aspect-square rounded-xl transition-all duration-300 transform hover:scale-110 ${
                      color === c
                        ? "ring-4 ring-white shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 rounded-xl cursor-pointer bg-transparent mt-2"
              />
            </div>

            {/* Fırça Boyutu */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 flex items-center gap-2">
                <span>📏</span> Boyut
              </h2>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl appearance-none cursor-pointer"
              />
              <div className="text-center text-cyan-200 mt-3 text-lg font-medium">
                {brushSize}px
              </div>
            </div>

            {/* Çıkartmalar */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 flex items-center gap-2">
                <span>🎯</span> Çıkartmalar
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {stickers.map((sticker) => (
                  <button
                    key={sticker.emoji}
                    onClick={() => setSelectedSticker(sticker.emoji)}
                    className={`p-3 rounded-xl text-2xl transition-all duration-300 transform hover:scale-110 ${
                      selectedSticker === sticker.emoji
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                    title={sticker.name}
                  >
                    {sticker.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Panel - Çizim Alanı */}
          <div className="lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 h-full">
              <div className="bg-white rounded-2xl shadow-inner w-full aspect-[4/3] relative group">
                {/* Çizim canvas'ı buraya gelecek */}
                <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
                  <div className="text-center transform transition-transform duration-300 hover:scale-105">
                    <div className="text-7xl mb-6 animate-bounce">🎨</div>
                    <p className="text-xl font-medium bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                      Çizim alanı yakında eklenecek...
                    </p>
                  </div>
                </div>

                {/* Araç Çubuğu */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-3 shadow-lg">
                  <button className="p-3 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-white transition-all duration-300 transform hover:scale-110">
                    💾
                  </button>
                  <button className="p-3 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-white transition-all duration-300 transform hover:scale-110">
                    ↩️
                  </button>
                  <button className="p-3 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-white transition-all duration-300 transform hover:scale-110">
                    ↪️
                  </button>
                  <button className="p-3 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-white transition-all duration-300 transform hover:scale-110">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingWorkshop;
