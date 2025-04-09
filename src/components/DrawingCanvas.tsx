import React, { useRef, useEffect, useState } from "react";

interface CanvasProps {
  color: string;
  brushSize: number;
  isDrawing: boolean;
  setIsDrawing: (isDrawing: boolean) => void;
  opacity: number;
  pattern: string;
  selectedTool: string;
}

export const Canvas: React.FC<CanvasProps> = ({
  color,
  brushSize,
  isDrawing,
  setIsDrawing,
  opacity,
  pattern,
  selectedTool,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas boyutunu ayarla
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
      contextRef.current.globalAlpha = opacity / 100;

      // Desen ayarlarını uygula
      switch (pattern) {
        case "dotted":
          contextRef.current.setLineDash([2, 2]);
          break;
        case "dashed":
          contextRef.current.setLineDash([5, 5]);
          break;
        case "zigzag":
          contextRef.current.setLineDash([10, 5, 2, 5]);
          break;
        default:
          contextRef.current.setLineDash([]);
      }
    }
  }, [color, brushSize, opacity, pattern]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartPoint({ x, y });

    // Yeni çizim başladığında geçmişi güncelle
    if (historyIndex < history.length - 1) {
      setHistory(history.slice(0, historyIndex + 1));
    }
    setHistory([
      ...history,
      ctx.getImageData(0, 0, canvas.width, canvas.height),
    ]);
    setHistoryIndex(historyIndex + 1);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalAlpha = opacity / 100;
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    switch (selectedTool) {
      case "brush":
        if (startPoint) {
          ctx.beginPath();
          ctx.moveTo(startPoint.x, startPoint.y);
          ctx.lineTo(x, y);
          ctx.stroke();
          setStartPoint({ x, y });
        }
        break;

      case "eraser":
        ctx.globalCompositeOperation = "destination-out";
        if (startPoint) {
          ctx.beginPath();
          ctx.moveTo(startPoint.x, startPoint.y);
          ctx.lineTo(x, y);
          ctx.stroke();
          setStartPoint({ x, y });
        }
        ctx.globalCompositeOperation = "source-over";
        break;

      case "shape":
        if (startPoint) {
          // Önceki çizimi temizle
          ctx.putImageData(history[historyIndex], 0, 0);

          ctx.beginPath();
          switch (pattern) {
            case "rectangle":
              ctx.rect(
                startPoint.x,
                startPoint.y,
                x - startPoint.x,
                y - startPoint.y
              );
              break;
            case "circle":
              const radius = Math.sqrt(
                Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
              );
              ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2);
              break;
            case "triangle":
              ctx.moveTo(startPoint.x, startPoint.y);
              ctx.lineTo(x, y);
              ctx.lineTo(startPoint.x * 2 - x, y);
              ctx.closePath();
              break;
            case "line":
              ctx.moveTo(startPoint.x, startPoint.y);
              ctx.lineTo(x, y);
              break;
            case "star":
              const points = 5;
              const outerRadius = Math.sqrt(
                Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
              );
              const innerRadius = outerRadius / 2;
              const angle = Math.PI / points;

              ctx.moveTo(startPoint.x, startPoint.y - outerRadius);
              for (let i = 0; i < points * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const currentAngle = angle * i;
                ctx.lineTo(
                  startPoint.x + Math.sin(currentAngle) * radius,
                  startPoint.y - Math.cos(currentAngle) * radius
                );
              }
              ctx.closePath();
              break;
          }
          ctx.stroke();
        }
        break;

      case "spray":
        const density = 10; // Sprey yoğunluğu
        for (let i = 0; i < density; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * brushSize;
          const sprayX = x + Math.cos(angle) * radius;
          const sprayY = y + Math.sin(angle) * radius;
          ctx.fillStyle = color;
          ctx.fillRect(sprayX, sprayY, 1, 1);
        }
        break;
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setStartPoint(null);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      setHistoryIndex(historyIndex - 1);
      ctx.putImageData(history[historyIndex - 1], 0, 0);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      setHistoryIndex(historyIndex + 1);
      ctx.putImageData(history[historyIndex + 1], 0, 0);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setHistoryIndex(-1);
  };

  return (
    <div className="relative h-full group">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="w-full h-full bg-white rounded-lg shadow-inner border border-gray-200 cursor-crosshair transition-all duration-300 hover:border-purple-300"
      />

      {/* Araç Çubuğu */}
      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-lg rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-1 shadow-lg border border-gray-200">
        <button
          onClick={clearCanvas}
          className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-600 transition-all duration-300 transform hover:scale-110"
          title="Temizle"
        >
          🗑️
        </button>
        <button
          onClick={undo}
          className="p-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-600 transition-all duration-300 transform hover:scale-110"
          title="Geri Al"
        >
          ↩️
        </button>
        <button
          onClick={redo}
          className="p-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-600 transition-all duration-300 transform hover:scale-110"
          title="İleri Al"
        >
          ↪️
        </button>
        <button
          className="p-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-600 transition-all duration-300 transform hover:scale-110"
          title="Kaydet"
        >
          💾
        </button>
      </div>
    </div>
  );
};
