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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-800 to-purple-900 relative overflow-hidden pt-20">
      {/* Büyülü Arka Plan Efektleri */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Yıldızlar */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Sihirli Işık Efektleri */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`light-${i}`}
            className="absolute bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-full animate-pulse-slow"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(70px)",
            }}
          />
        ))}
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300">
            Masal Dünyası ✨
          </h1>
          <p className="text-pink-200 text-xl">
            Hayallerini masallara dönüştür ve paylaş
          </p>
        </div>

        {/* Mod Seçici */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setStoryMode("my-stories")}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              storyMode === "my-stories"
                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/50"
                : "bg-white/10 text-pink-200 hover:bg-white/20"
            }`}
          >
            Masallarım 📚
          </button>
          <button
            onClick={() => setStoryMode("create")}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              storyMode === "create"
                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/50"
                : "bg-white/10 text-pink-200 hover:bg-white/20"
            }`}
          >
            Yeni Masal Yaz ✍️
          </button>
        </div>

        {storyMode === "my-stories" ? (
          /* Masallarım */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {myStories.map((story) => (
              <div
                key={story.id}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-pink-500/20 transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-6xl mb-4 group-hover:animate-bounce">
                  {story.coverEmoji}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {story.title}
                </h3>
                <p className="text-pink-200 mb-4">{story.preview}</p>
                <div className="flex justify-between items-center text-pink-300">
                  <span>{story.date}</span>
                  <div className="flex space-x-4">
                    <span>❤️ {story.likes}</span>
                    <span>💭 {story.comments}</span>
                  </div>
                </div>
                <div className="mt-4 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        ) : (
          /* Yeni Masal Oluşturma */
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {storyStarters.map((starter, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-pink-500/20 transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-6xl mb-4 group-hover:animate-bounce">
                    {starter.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {starter.title}
                  </h3>
                  <p className="text-pink-200">{starter.description}</p>
                  <div className="mt-4 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              ))}
            </div>

            {/* Serbest Yazma Seçeneği */}
            <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-pink-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Kendi Masalını Yaz ✨
              </h3>
              <p className="text-pink-200 mb-6">
                Hayal gücünü serbest bırak ve kendi özgün masalını yaratmaya
                başla!
              </p>
              <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
                Yazmaya Başla 📝
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
