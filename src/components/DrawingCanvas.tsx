import React, { useEffect, useRef, useState, forwardRef } from "react";
import { auth } from "../services/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface DrawingCanvasProps {
  selectedTool: string;
  color: string;
  brushSize: number;
  opacity: number;
  pattern: string;
  shapeType: string;
  onDrawingChange: (data: string) => void;
}

interface Layer {
  type: string;
  data: string;
  color?: string;
  brushSize?: number;
  opacity?: number;
  pattern?: string;
  shapeType?: string;
  zIndex: number;
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

    useEffect(() => {
      const canvas = ref as React.RefObject<HTMLCanvasElement>;
      if (!canvas.current) return;

      const ctx = canvas.current.getContext("2d");
      if (!ctx) return;

      // Canvas boyutunu ayarla
      canvas.current.width = 1600;
      canvas.current.height = 1000;

      // Canvas'ı temizle ve dolguyu uygula
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
      } else {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
      }

      // Desenleri çiz
      patterns.forEach((pattern) => {
        ctx.strokeStyle = pattern.color;
        ctx.lineWidth = pattern.brushSize;
        ctx.globalAlpha = opacity / 100;

        if (pattern.type === "dots") {
          for (let i = 0; i < 100; i++) {
            const dotX = Math.random() * canvas.current!.width;
            const dotY = Math.random() * canvas.current!.height;
            ctx.beginPath();
            ctx.arc(dotX, dotY, pattern.brushSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = pattern.color;
            ctx.fill();
          }
        } else if (pattern.type === "hearts") {
          for (let i = 0; i < 50; i++) {
            const heartX = Math.random() * canvas.current!.width;
            const heartY = Math.random() * canvas.current!.height;
            drawHeart(ctx, heartX, heartY, pattern.brushSize, pattern.color);
          }
        }
      });

      // Çizimi kaydet
      onDrawingChange(canvas.current.toDataURL());
    }, [fillColor, patterns, opacity, ref, onDrawingChange]);

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;

      const canvas = ref as React.RefObject<HTMLCanvasElement>;
      if (!canvas.current) return;

      const ctx = canvas.current.getContext("2d");
      if (!ctx) return;

      const rect = canvas.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.globalAlpha = opacity / 100;

      switch (selectedTool) {
        case "brush":
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineTo(x, y);
          ctx.stroke();
          break;

        case "eraser":
          ctx.strokeStyle = "white";
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineTo(x, y);
          ctx.stroke();
          break;

        case "fill":
          setFillColor(color);
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
          switch (shapeType) {
            case "rectangle":
              ctx.rect(
                startPoint.current.x,
                startPoint.current.y,
                x - startPoint.current.x,
                y - startPoint.current.y
              );
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
              break;

            case "triangle":
              ctx.moveTo(startPoint.current.x, startPoint.current.y);
              ctx.lineTo(x, y);
              ctx.lineTo(startPoint.current.x * 2 - x, y);
              ctx.closePath();
              break;

            case "line":
              ctx.moveTo(startPoint.current.x, startPoint.current.y);
              ctx.lineTo(x, y);
              break;

            case "star":
              drawStar(
                ctx,
                startPoint.current.x,
                startPoint.current.y,
                Math.abs(x - startPoint.current.x),
                brushSize,
                color
              );
              break;
          }
          ctx.stroke();
          break;
      }

      // Çizimi kaydet
      onDrawingChange(canvas.current.toDataURL());
    };

    const drawHeart = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string
    ) => {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
      ctx.bezierCurveTo(
        x - size / 2,
        y + size / 2,
        x,
        y + size / 2,
        x,
        y + size
      );
      ctx.bezierCurveTo(
        x,
        y + size / 2,
        x + size / 2,
        y + size / 2,
        x + size / 2,
        y + size / 4
      );
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      size: number,
      color: string
    ) => {
      const spikes = 5;
      const innerRadius = radius * 0.4;

      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? radius : innerRadius;
        const angle = (Math.PI / spikes) * i;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true);
      const canvas = ref as React.RefObject<HTMLCanvasElement>;
      if (!canvas.current) return;

      const ctx = canvas.current.getContext("2d");
      if (!ctx) return;

      const rect = canvas.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(x, y);

      if (selectedTool === "shape") {
        startPoint.current = { x, y };
      }
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      const canvas = ref as React.RefObject<HTMLCanvasElement>;
      if (!canvas.current) return;

      const ctx = canvas.current.getContext("2d");
      if (!ctx) return;

      ctx.beginPath();
      startPoint.current = null;
    };

    return (
      <div className="w-full h-full flex items-center justify-center p-4 bg-gradient-to-br from-purple-100 to-pink-100">
        <canvas
          ref={ref}
          onMouseDown={handleMouseDown}
          onMouseMove={draw}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="border border-gray-300 rounded-lg shadow-lg max-w-full max-h-full bg-white"
        />
      </div>
    );
  }
);

DrawingCanvas.displayName = "DrawingCanvas";

export default DrawingCanvas;
