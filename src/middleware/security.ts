import helmet from "helmet";
import cors from "cors";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";

// Rate limiter yapılandırması
const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 istek
  duration: 1, // 1 saniye içinde
});

// Güvenlik middleware'leri
export const securityMiddleware = [
  // Temel güvenlik başlıkları
  helmet(),

  // CORS yapılandırması
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),

  // Rate limiting
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ip = req.ip || req.socket.remoteAddress || "unknown";
      await rateLimiter.consume(ip);
      next();
    } catch (error) {
      res.status(429).json({
        error: "Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.",
      });
    }
  },
];
