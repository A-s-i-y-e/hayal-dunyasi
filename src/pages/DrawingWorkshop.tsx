import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "../components/DrawingCanvas";

const DrawingWorkshop: React.FC = () => {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState("brush");
  const [opacity, setOpacity] = useState(100);
  const [pattern, setPattern] = useState("solid");
  const [shapeType, setShapeType] = useState("rectangle");
  const [sprayDensity, setSprayDensity] = useState(10);

  const tools = [
    { id: "brush", icon: "🖌️", name: "Fırça" },
    { id: "eraser", icon: "🧹", name: "Silgi" },
    { id: "fill", icon: "🪣", name: "Dolgu" },
    { id: "spray", icon: "💨", name: "Sprey" },
    { id: "text", icon: "✍️", name: "Yazı" },
    { id: "shape", icon: "⬡", name: "Şekil" },
    { id: "stamp", icon: "🎯", name: "Damga" },
    { id: "gradient", icon: "🌈", name: "Gradyan" },
  ];

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#800000",
    "#000080",
    "#808000",
    "#008080",
    "#808080",
    "#FF69B4",
    "#00CED1",
    "#FFD700",
    "#FF6347",
    "#7B68EE",
  ];

  const patterns = [
    { id: "solid", name: "Düz" },
    { id: "dotted", name: "Noktalı" },
    { id: "dashed", name: "Kesikli" },
    { id: "zigzag", name: "Zikzak" },
  ];

  const shapes = [
    { id: "rectangle", name: "Dikdörtgen" },
    { id: "circle", name: "Daire" },
    { id: "triangle", name: "Üçgen" },
    { id: "line", name: "Çizgi" },
    { id: "star", name: "Yıldız" },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="text-center py-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            Çizim Atölyesi
          </h1>
          <p className="text-lg text-gray-700">
            Hayal gücünüzü özgürce kullanın! 🎨
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-2 p-2">
          {/* Sol Panel - Araçlar */}
          <div className="space-y-2">
            {/* Araç Kutusu */}
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Araçlar
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      selectedTool === tool.id
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <div className="text-2xl mb-1">{tool.icon}</div>
                    <div className="text-xs">{tool.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Şekil Seçimi */}
            {selectedTool === "shape" && (
              <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                  Şekiller
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {shapes.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setPattern(shape.id)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        pattern === shape.id
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {shape.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sprey Ayarları */}
            {selectedTool === "spray" && (
              <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                  Sprey Ayarları
                </h2>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Yoğunluk:</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={sprayDensity}
                    onChange={(e) => setSprayDensity(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    {sprayDensity}
                  </span>
                </div>
              </div>
            )}

            {/* Renk Paleti */}
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Renkler
              </h2>
              <div className="grid grid-cols-5 gap-2 mb-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-full aspect-square rounded-lg transition-all duration-300 transform hover:scale-110 ${
                      color === c
                        ? "ring-4 ring-purple-500 shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="color" className="text-sm text-gray-700">
                  Özel Renk:
                </label>
                <input
                  type="color"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-gray-300"
                />
              </div>
            </div>

            {/* Fırça Ayarları */}
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Fırça Ayarları
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Boyut:</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    {brushSize}px
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Opaklık:</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    {opacity}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-700">Desen:</label>
                  <select
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-1 text-sm"
                  >
                    {patterns.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Panel - Çizim Alanı */}
          <div className="lg:col-span-3 h-full">
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200 h-full">
              <Canvas
                color={color}
                brushSize={brushSize}
                isDrawing={isDrawing}
                setIsDrawing={setIsDrawing}
                opacity={opacity}
                pattern={pattern}
                selectedTool={selectedTool}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingWorkshop;
