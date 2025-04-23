import React from "react";

interface DrawingToolsProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  pattern: string;
  setPattern: (pattern: string) => void;
  shapeType: string;
  setShapeType: (type: string) => void;
  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;
  handleSaveClick: () => void;
}

const DrawingTools: React.FC<DrawingToolsProps> = ({
  selectedTool,
  setSelectedTool,
  color,
  setColor,
  brushSize,
  setBrushSize,
  opacity,
  setOpacity,
  pattern,
  setPattern,
  shapeType,
  setShapeType,
  undo,
  redo,
  clearCanvas,
  handleSaveClick,
}) => {
  const tools = [
    { id: "brush", name: "Fırça", icon: "🖌️" },
    { id: "eraser", name: "Silgi", icon: "🧹" },
    { id: "fill", name: "Doldur", icon: "🎨" },
    { id: "pattern", name: "Desen", icon: "✨" },
    { id: "shape", name: "Şekil", icon: "🔷" },
  ];

  const fillPatterns = [
    { id: "dots", name: "Noktalar", icon: "🔵" },
    { id: "hearts", name: "Kalpler", icon: "❤️" },
  ];

  const shapes = [
    { id: "rectangle", name: "Dikdörtgen", icon: "⬜" },
    { id: "circle", name: "Daire", icon: "⭕" },
    { id: "triangle", name: "Üçgen", icon: "🔺" },
    { id: "line", name: "Çizgi", icon: "📏" },
    { id: "star", name: "Yıldız", icon: "⭐" },
  ];

  const colors = [
    "#000000", // Siyah
    "#FFFFFF", // Beyaz
    "#FF0000", // Kırmızı
    "#00FF00", // Yeşil
    "#0000FF", // Mavi
    "#FFFF00", // Sarı
    "#FF00FF", // Pembe
    "#00FFFF", // Turkuaz
    "#FFA500", // Turuncu
    "#800080", // Mor
    "#008000", // Koyu Yeşil
    "#800000", // Koyu Kırmızı
    "#000080", // Koyu Mavi
    "#808000", // Zeytin
    "#008080", // Teal
    "#808080", // Gri
    "#FF69B4", // Açık Pembe
    "#00CED1", // Koyu Turkuaz
    "#FFD700", // Altın
    "#FF6347", // Domates
  ];

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-5 gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`p-2 rounded-lg ${
              selectedTool === tool.id
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            title={tool.name}
          >
            {tool.icon}
          </button>
        ))}
      </div>

      {selectedTool === "pattern" && (
        <div className="grid grid-cols-2 gap-2">
          {fillPatterns.map((p) => (
            <button
              key={p.id}
              onClick={() => setPattern(p.id)}
              className={`p-2 rounded-lg ${
                pattern === p.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              title={p.name}
            >
              {p.icon}
            </button>
          ))}
        </div>
      )}

      {selectedTool === "shape" && (
        <div className="grid grid-cols-5 gap-2">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => setShapeType(shape.id)}
              className={`p-2 rounded-lg ${
                shapeType === shape.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              title={shape.name}
            >
              {shape.icon}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Fırça Boyutu</label>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Opaklık</label>
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={(e) => setOpacity(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={undo}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          title="Geri Al"
        >
          ↩️
        </button>
        <button
          onClick={redo}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          title="İleri Al"
        >
          ↪️
        </button>
        <button
          onClick={clearCanvas}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          title="Temizle"
        >
          🧹
        </button>
        <button
          onClick={handleSaveClick}
          className="p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
          title="Kaydet"
        >
          💾
        </button>
      </div>

      <div className="flex flex-wrap gap-1 justify-center">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full border-2 ${
              color === c ? "border-blue-500" : "border-gray-300"
            }`}
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-6 h-6 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DrawingTools;
