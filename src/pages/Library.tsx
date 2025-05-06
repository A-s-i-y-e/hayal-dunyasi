import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Library: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "Tümü", icon: "📚" },
    { id: "fantasy", name: "Fantastik", icon: "🐉" },
    { id: "adventure", name: "Macera", icon: "🗺️" },
    { id: "fairytale", name: "Peri Masalı", icon: "🧚" },
    { id: "mythology", name: "Mitoloji", icon: "⚡" },
    { id: "folk", name: "Halk Masalı", icon: "🏰" },
  ];

  // Örnek hikaye verileri
  const stories = [
    {
      id: 1,
      title: "Uyuyan Güzel",
      category: "fairytale",
      author: "Grimm Kardeşler",
      date: "2024-03-15",
      image: "🏰",
      description: "Yüz yıllık uykuya dalan bir prensesin büyülü hikayesi...",
    },
    // Diğer hikayeler buraya eklenecek
  ];

  const sections = [
    {
      title: "Hikayeler",
      description: "Tüm hikayeleri keşfet ve oku!",
      icon: "📚",
      path: "/stories",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Hikayelerim",
      description: "Kendi hikayelerini keşfet ve oku!",
      icon: "📖",
      path: "/library/my-stories",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Favoriler",
      description: "Favori hikayelerini buradan oku!",
      icon: "❤️",
      path: "/library/favorites",
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "Hikayeni Yaz",
      description:
        "Kendi hikayeni yaz ve başkalarıyla paylaş! Hayal gücünü kullanarak harika hikayeler oluşturabilirsin.",
      icon: "✍️",
      path: "/create-story-form",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
            Hikayelerim
          </h1>
          <p className="text-2xl text-gray-600">
            Kendi hikayelerini keşfet ve oku!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              onClick={() => navigate(section.path)}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
            >
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-r ${section.gradient} flex items-center justify-center text-5xl mb-6 group-hover:rotate-12 transition-transform duration-300`}
              >
                {section.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {section.title}
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                {section.description}
              </p>
              <div className="flex items-center text-purple-600 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-lg font-medium">Keşfet</span>
                <svg
                  className="w-6 h-6 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
