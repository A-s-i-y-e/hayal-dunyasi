import React, { useState } from "react";
import { auth } from "../services/firebase";

const Stories: React.FC = () => {
  const [storyMode, setStoryMode] = useState<"create" | "my-stories">(
    "my-stories"
  );

  // Örnek masallar (gerçek uygulamada Firebase'den gelecek)
  const myStories = [
    {
      id: 1,
      title: "Sihirli Ormanın Sırrı",
      preview: "Bir varmış bir yokmuş, büyülü bir ormanın derinliklerinde...",
      date: "2024-03-20",
      likes: 24,
      comments: 5,
      coverEmoji: "🌳",
    },
    {
      id: 2,
      title: "Ay Prensesi",
      preview: "Her gece dolunayda parlayan gizemli bir saray...",
      date: "2024-03-18",
      likes: 18,
      comments: 3,
      coverEmoji: "🌙",
    },
  ];

  const storyStarters = [
    {
      title: "Sihirli Orman",
      description: "Konuşan ağaçlar ve dans eden çiçeklerle dolu bir macera",
      emoji: "🌳",
    },
    {
      title: "Gökyüzü Şehri",
      description: "Bulutların üzerinde yaşayan insanların hikayesi",
      emoji: "☁️",
    },
    {
      title: "Deniz Krallığı",
      description: "Derin sulardaki gizemli yaratıklar ve hazineler",
      emoji: "🌊",
    },
    {
      title: "Uzay Macerası",
      description: "Yıldızlar arasında geçen büyülü bir yolculuk",
      emoji: "🚀",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
            Hikayeler
          </h1>
          <p className="text-lg text-gray-600">
            İlham verici hikayeleri keşfet ve kendi hikayeni yaz!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Hikaye kartları buraya eklenecek */}
        </div>
      </div>
    </div>
  );
};

export default Stories;
