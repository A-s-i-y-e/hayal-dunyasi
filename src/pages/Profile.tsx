import React, { useState } from "react";
import { auth } from "../services/firebase";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("stories");

  const userStats = {
    stories: 12,
    drawings: 8,
    followers: 156,
    following: 89,
  };

  const userAchievements = [
    {
      id: 1,
      title: "Masal Ustası",
      icon: "👑",
      description: "100 masal okudu",
    },
    { id: 2, title: "Hayal Mimarı", icon: "🎨", description: "50 çizim yaptı" },
    { id: 3, title: "İlham Perisi", icon: "✨", description: "25 yorum yaptı" },
    {
      id: 4,
      title: "Kahraman Dostu",
      icon: "🤝",
      description: "10 arkadaş edindi",
    },
  ];

  const userStories = [
    {
      id: 1,
      title: "Gökkuşağı Perisi",
      preview: "Rengarenk kanatlarıyla gökyüzünde süzülen küçük bir peri...",
      likes: 42,
      date: "2024-03-15",
    },
    // Diğer masallar buraya eklenecek
  ];

  const userDrawings = [
    {
      id: 1,
      title: "Sihirli Orman",
      preview: "🎨",
      likes: 35,
      date: "2024-03-18",
    },
    // Diğer çizimler buraya eklenecek
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-red-800 to-pink-800 relative overflow-hidden">
      {/* Animasyonlu Arka Plan Elementleri */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              fontSize: `${Math.random() * 20 + 20}px`,
            }}
          >
            {["👑", "⭐", "✨", "💫", "🌟"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Profil Başlığı */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 p-1 transform hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-900 to-pink-900 flex items-center justify-center text-6xl">
                👸
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 text-4xl animate-bounce">
              👑
            </div>
          </div>
          <h1 className="text-4xl font-bold mt-6 mb-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-red-300 to-pink-300">
            Masal Kahramanı
          </h1>
          <p className="text-rose-200 text-lg">@masalkahramani</p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Object.entries(userStats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 text-center transform hover:scale-105 transition-all duration-500 border border-white/10 hover:border-white/20"
            >
              <div className="text-3xl font-bold text-rose-300">{value}</div>
              <div className="text-rose-200 capitalize">{key}</div>
            </div>
          ))}
        </div>

        {/* Başarılar */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-300">
            Başarılar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="group relative bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20 transform hover:-translate-y-1"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-500">
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-rose-300">
                  {achievement.title}
                </h3>
                <p className="text-rose-200/70">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* İçerik Sekmeleri */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab("stories")}
              className={`px-6 py-3 rounded-xl backdrop-blur-xl transition-all duration-500 transform hover:scale-105 text-lg font-medium ${
                activeTab === "stories"
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"
                  : "bg-white/10 text-rose-200 hover:bg-white/20"
              }`}
            >
              📚 Masallarım
            </button>
            <button
              onClick={() => setActiveTab("drawings")}
              className={`px-6 py-3 rounded-xl backdrop-blur-xl transition-all duration-500 transform hover:scale-105 text-lg font-medium ${
                activeTab === "drawings"
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30"
                  : "bg-white/10 text-rose-200 hover:bg-white/20"
              }`}
            >
              🎨 Çizimlerim
            </button>
          </div>

          {/* İçerik Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === "stories"
              ? userStories.map((story) => (
                  <div
                    key={story.id}
                    className="group relative bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20 cursor-pointer transform hover:-translate-y-2"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <h3 className="text-xl font-bold mb-3 text-rose-300">
                      {story.title}
                    </h3>
                    <p className="text-rose-200/70 mb-4 line-clamp-2">
                      {story.preview}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-rose-200/60 text-sm">
                        {new Date(story.date).toLocaleDateString("tr-TR")}
                      </span>
                      <span className="flex items-center text-rose-300">
                        <span className="mr-1">❤️</span>
                        {story.likes}
                      </span>
                    </div>
                  </div>
                ))
              : userDrawings.map((drawing) => (
                  <div
                    key={drawing.id}
                    className="group relative bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20 cursor-pointer transform hover:-translate-y-2"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                      {drawing.preview}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-rose-300">
                      {drawing.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-rose-200/60 text-sm">
                        {new Date(drawing.date).toLocaleDateString("tr-TR")}
                      </span>
                      <span className="flex items-center text-rose-300">
                        <span className="mr-1">❤️</span>
                        {drawing.likes}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
