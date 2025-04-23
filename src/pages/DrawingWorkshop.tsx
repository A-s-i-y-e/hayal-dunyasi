import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DrawingCanvas from "../components/DrawingCanvas";
import DrawingTools from "../components/DrawingTools";

const DrawingWorkshop: React.FC = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState("brush");
  const [opacity, setOpacity] = useState(100);
  const [pattern, setPattern] = useState("solid");
  const [shapeType, setShapeType] = useState("rectangle");
  const [fillStyle, setFillStyle] = useState("#ffffff");
  const [gradient, setGradient] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showNameModal, setShowNameModal] = useState(false);
  const [drawingName, setDrawingName] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const tools = [
    { id: "brush", icon: "🖌️", name: "Fırça" },
    { id: "eraser", icon: "🧹", name: "Silgi" },
    { id: "fill", icon: "🪣", name: "Dolgu" },
    { id: "pattern", icon: "✨", name: "Desen" },
    { id: "shape", icon: "⬡", name: "Şekil" },
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
    { id: "solid", name: "Düz", icon: "⬜" },
    { id: "dots", name: "Noktalar", icon: "🔵" },
    { id: "hearts", name: "Kalpler", icon: "❤️" },
    { id: "stars", name: "Yıldızlar", icon: "⭐" },
    { id: "trees", name: "Ağaçlar", icon: "🌲" },
    { id: "flowers", name: "Çiçekler", icon: "🌸" },
  ];

  const shapes = [
    { id: "rectangle", name: "Dikdörtgen" },
    { id: "circle", name: "Daire" },
    { id: "triangle", name: "Üçgen" },
    { id: "line", name: "Çizgi" },
    { id: "star", name: "Yıldız" },
  ];

  const handleDrawingChange = (data: string) => {
    // Yeni çizimi history'ye ekle
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(data);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const img = new Image();
          img.src = history[historyIndex - 1];
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          };
        }
      }
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const img = new Image();
          img.src = history[historyIndex + 1];
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          };
        }
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        handleDrawingChange(canvas.toDataURL());
      }
    }
  };

  const handleSaveClick = () => {
    setShowNameModal(true);
  };

  const handleSaveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = `${drawingName || "drawing"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setShowNameModal(false);
      setDrawingName("");

      // Çizimi kaydettikten sonra hikaye oluşturma sayfasına yönlendir
      navigate("/create-story", {
        state: {
          drawingUrl: canvas.toDataURL("image/png"),
          drawingName: drawingName || "drawing",
        },
      });
    }
  };

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
              <div className="grid grid-cols-5 gap-2">
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

            {/* Desen Seçimi */}
            {selectedTool === "pattern" && (
              <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">
                  Desenler
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {patterns.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPattern(p.id)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        pattern === p.id
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <div className="text-2xl mb-1">{p.icon}</div>
                      <div className="text-xs">{p.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                      onClick={() => setShapeType(shape.id)}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        shapeType === shape.id
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <div className="text-2xl mb-1">
                        {shape.id === "rectangle" && "⬜"}
                        {shape.id === "circle" && "⭕"}
                        {shape.id === "triangle" && "🔺"}
                        {shape.id === "line" && "➖"}
                        {shape.id === "star" && "⭐"}
                      </div>
                      <div className="text-xs">{shape.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

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
              </div>
            </div>

            {/* İşlem Butonları */}
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                İşlemler
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={undo}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">↩️</span>
                  <span className="text-sm">Geri Al</span>
                </button>
                <button
                  onClick={redo}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">↪️</span>
                  <span className="text-sm">İleri Al</span>
                </button>
                <button
                  onClick={clearCanvas}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">🧹</span>
                  <span className="text-sm">Temizle</span>
                </button>
                <button
                  onClick={handleSaveClick}
                  className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
                >
                  <span className="text-xl">📚</span>
                  <span className="text-sm">Kaydet</span>
                </button>
              </div>
            </div>

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
          </div>

          {/* Sağ Panel - Çizim Alanı */}
          <div className="lg:col-span-3 h-full">
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200 h-full">
              <DrawingCanvas
                ref={canvasRef}
                color={color}
                brushSize={brushSize}
                opacity={opacity}
                pattern={pattern}
                selectedTool={selectedTool}
                shapeType={shapeType}
                onDrawingChange={handleDrawingChange}
              />
            </div>
          </div>
        </div>

        {showNameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Çizimi Kaydet</h2>
              <input
                type="text"
                value={drawingName}
                onChange={(e) => setDrawingName(e.target.value)}
                placeholder="Çizim adı"
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowNameModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveDrawing}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawingWorkshop;
