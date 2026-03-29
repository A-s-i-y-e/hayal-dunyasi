import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DrawingCanvas from "../components/DrawingCanvas";
import DrawingTools from "../components/DrawingTools";
import { auth } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

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
  const [isSaving, setIsSaving] = useState(false);

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

  // Canvas'ı başlat
  useEffect(() => {
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
  }, []); // Sadece bir kez çalışsın

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

  const handleSaveDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      alert("Canvas bulunamadı!");
      return;
    }

    try {
      setIsSaving(true);
      const user = auth.currentUser;
      if (!user) {
        alert("Lütfen önce giriş yapın");
        return;
      }

      console.log("Kullanıcı giriş yapmış:", user.uid);

      // Sadece base64 string olarak al
      const base64String = canvas.toDataURL("image/png");

      // Firestore'a kaydet
      const drawingsRef = collection(db, "drawings");
      await addDoc(drawingsRef, {
        userId: user.uid,
        title: drawingName || "İsimsiz Çizim",
        imageData: base64String, // SADECE BASE64
        description: "Çizim atölyesinden yeni çizim",
        createdAt: new Date(),
      });
      setShowNameModal(false);
      setDrawingName("");
      navigate("/create-story", {
        state: {
          drawingUrl: base64String,
          drawingName: drawingName || "İsimsiz Çizim",
        },
      });
    } catch (error) {
      console.error("Çizim kaydedilirken hata oluştu:", error);
      // Hata detaylarını göster
      if (error instanceof Error) {
        console.error("Hata mesajı:", error.message);
        console.error("Hata stack:", error.stack);
      }
      alert("Çizim kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSaving(false);
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
                <div className="grid grid-cols-3 gap-2">
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
                        {shape.id === "line" && "📏"}
                        {shape.id === "star" && "⭐"}
                      </div>
                      <div className="text-xs">{shape.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Renk Paleti */}
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Renkler
              </h2>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      color === c
                        ? "border-purple-500 scale-110 shadow-lg"
                        : "border-gray-300 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Fırça Boyutu */}
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Fırça Boyutu
              </h2>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">
                {brushSize}px
              </div>
            </div>

            {/* Opaklık */}
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">
                Opaklık
              </h2>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">
                {opacity}%
              </div>
            </div>

            {/* İşlem Butonları */}
            <div className="bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={undo}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                >
                  ↩️ Geri Al
                </button>
                <button
                  onClick={redo}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                >
                  ↪️ İleri Al
                </button>
                <button
                  onClick={clearCanvas}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                >
                  🧹 Temizle
                </button>
                <button
                  onClick={handleSaveClick}
                  className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600"
                >
                  💾 Kaydet
                </button>
              </div>
            </div>
          </div>

          {/* Sağ Panel - Canvas */}
          <div className="lg:col-span-3 bg-white/90 backdrop-blur-lg rounded-xl p-2 shadow-lg border border-gray-200 h-[calc(100vh-12rem)]">
            <div className="w-full h-full relative">
              <DrawingCanvas
                ref={canvasRef}
                selectedTool={selectedTool}
                color={color}
                brushSize={brushSize}
                opacity={opacity}
                pattern={pattern}
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
                disabled={isSaving}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowNameModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={isSaving}
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveDrawing}
                  className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                    isSaving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSaving}
                >
                  {isSaving ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Yükleme göstergesi */}
        {isSaving && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg font-semibold">Çizim kaydediliyor...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawingWorkshop;
