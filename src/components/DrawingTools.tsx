import React from "react";

interface DrawingToolsProps {
  color: string;
  setColor: (color: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  onClear: () => void;
}

const DrawingTools: React.FC<DrawingToolsProps> = ({
  color,
  setColor,
  brushSize,
  setBrushSize,
  onClear,
}) => {
  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
  ];

  const brushSizes = [2, 5, 10, 15, 20];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Renkler</h3>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === c ? "border-purple-500" : "border-gray-300"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Fırça Boyutu
          </h3>
          <div className="flex gap-2">
            {brushSizes.map((size) => (
              <button
                key={size}
                onClick={() => setBrushSize(size)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  brushSize === size ? "border-purple-500" : "border-gray-300"
                }`}
              >
                <div
                  className="bg-black rounded-full"
                  style={{ width: size, height: size }}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClear}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Temizle
        </button>
      </div>
    </div>
  );
};

export default DrawingTools;
