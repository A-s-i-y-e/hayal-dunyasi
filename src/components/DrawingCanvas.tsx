import React, { useEffect, useRef, useState, forwardRef } from "react";

interface DrawingCanvasProps {
  selectedTool: string;
  color: string;
  brushSize: number;
  opacity: number;
  pattern: string;
  shapeType: string;
  onDrawingChange: (data: string) => void;
}

const DrawingCanvas = forwardRef<HTMLCanvasElement, DrawingCanvasProps>(
  (props, ref) => {
    const {
      selectedTool,
      color,
      brushSize,
      opacity,
      pattern,
      shapeType,
      onDrawingChange,
    } = props;

    const [isDrawing, setIsDrawing] = useState(false);
    const startPoint = useRef<{ x: number; y: number } | null>(null);
    const [fillColor, setFillColor] = useState<string | null>(null);
    const [patterns, setPatterns] = useState<
      Array<{ type: string; color: string; brushSize: number }>
    >([]);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    // Canvas'ı başlat
    useEffect(() => {
      const canvas = ref as React.RefObject<HTMLCanvasElement>;
      if (!canvas.current) return;

      // Canvas'ı container boyutuna göre ayarla
      const container = canvas.current.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        canvas.current.width = rect.width;
        canvas.current.height = rect.height;
      }

      const ctx = canvas.current.getContext("2d");
      if (!ctx) return;

      // Canvas ayarlarını yap
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.globalAlpha = opacity / 100;

      // Referansları kaydet
      contextRef.current = ctx;

      // Canvas'ı temizle ve dolguyu uygula
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
    }, [ref]);

    // Renk, fırça boyutu veya opaklık değiştiğinde canvas ayarlarını güncelle
    useEffect(() => {
      if (!contextRef.current) return;

      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
      contextRef.current.globalAlpha = opacity / 100;
    }, [color, brushSize, opacity]);

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !contextRef.current) return;

      const canvas = ref as React.RefObject<HTMLCanvasElement>;
      if (!canvas.current) return;

      const rect = canvas.current.getBoundingClientRect();
      const scaleX = canvas.current.width / rect.width;
      const scaleY = canvas.current.height / rect.height;

      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      const ctx = contextRef.current;

      switch (selectedTool) {
        case "brush":
          if (!startPoint.current) {
            startPoint.current = { x, y };
            ctx.beginPath();
            ctx.moveTo(x, y);
            return;
          }
          ctx.lineTo(x, y);
          ctx.stroke();
          break;

        case "eraser":
          if (!startPoint.current) {
            startPoint.current = { x, y };
            ctx.beginPath();
            ctx.moveTo(x, y);
            return;
          }
          ctx.strokeStyle = "white";
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.strokeStyle = color; // Rengi geri ayarla
          break;

        case "fill":
          setFillColor(color);
          if (canvas.current) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
            onDrawingChange(canvas.current.toDataURL());
          }
          break;

        case "pattern":
          setPatterns([...patterns, { type: pattern, color, brushSize }]);
          break;

        case "shape":
          if (!startPoint.current) {
            startPoint.current = { x, y };
            return;
          }

          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = brushSize;
          ctx.globalAlpha = opacity / 100;

          switch (shapeType) {
            case "rectangle":
              ctx.rect(
                startPoint.current.x,
                startPoint.current.y,
                x - startPoint.current.x,
                y - startPoint.current.y
              );
              ctx.stroke();
              ctx.fillStyle = color;
              ctx.fill();
              break;

            case "circle":
              const radius = Math.sqrt(
                Math.pow(x - startPoint.current.x, 2) +
                  Math.pow(y - startPoint.current.y, 2)
              );
              ctx.arc(
                startPoint.current.x,
                startPoint.current.y,
                radius,
                0,
                Math.PI * 2
              );
              ctx.stroke();
              ctx.fillStyle = color;
              ctx.fill();
              break;

            case "triangle":
              ctx.moveTo(startPoint.current.x, startPoint.current.y);
              ctx.lineTo(x, y);
              ctx.lineTo(startPoint.current.x * 2 - x, y);
              ctx.closePath();
              ctx.stroke();
              ctx.fillStyle = color;
              ctx.fill();
              break;

            case "line":
              ctx.moveTo(startPoint.current.x, startPoint.current.y);
              ctx.lineTo(x, y);
              ctx.stroke();
              break;

            case "star":
              drawStar(
                ctx,
                startPoint.current.x,
                startPoint.current.y,
                Math.abs(x - startPoint.current.x),
                5,
                color
              );
              break;
          }
          break;
      }

      // Çizimi kaydet
      if (canvas.current) {
        onDrawingChange(canvas.current.toDataURL());
      }
    };

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      spikes: number,
      color: string
    ) => {
      let rot = (Math.PI / 2) * 3;
      let cx = x;
      let cy = y;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - size);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * size;
        y = cy + Math.sin(rot) * size;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * (size / 2);
        y = cy + Math.sin(rot) * (size / 2);
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - size);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true);
      startPoint.current = null;
      draw(e);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      startPoint.current = null;
      if (contextRef.current) {
        contextRef.current.beginPath();
      }
    };

    const handleMouseLeave = () => {
      setIsDrawing(false);
      startPoint.current = null;
      if (contextRef.current) {
        contextRef.current.beginPath();
      }
    };

    return (
      <canvas
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseMove={draw}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "crosshair",
          touchAction: "none",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      />
    );
  }
);

DrawingCanvas.displayName = "DrawingCanvas";

export default DrawingCanvas;
