import React, { useState } from "react";

const Library: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categories = [
    { id: "all", name: "Tümü", icon: "📚" },
    { id: "fantasy", name: "Fantastik", icon: "🐉" },
    { id: "adventure", name: "Macera", icon: "🗺️" },
    { id: "fairytale", name: "Peri Masalı", icon: "🧚" },
    { id: "mythology", name: "Mitoloji", icon: "⚡" },
    { id: "folk", name: "Halk Masalı", icon: "🏰" },
  ];

  // Örnek masal verileri
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
    // Diğer masallar buraya eklenecek
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-800 relative overflow-hidden">
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
            {["📚", "🌟", "🏰", "🗝️", "📜"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Başlık */}
        <div className="text-center mb-16 transform hover:scale-105 transition-transform duration-500">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 animate-gradient">
            Masal Kütüphanesi
          </h1>
          <p className="text-xl md:text-2xl text-amber-200 max-w-3xl mx-auto leading-relaxed">
            Binbir gece masallarından modern hikayelere, keşfedilmeyi bekleyen
            sihirli bir dünya! 📚✨
          </p>
        </div>

        {/* Arama ve Filtreleme */}
        <div className="mb-12 space-y-8">
          {/* Arama Çubuğu */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <input
                type="text"
                placeholder="Masal ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border-2 border-amber-500/30 focus:border-amber-500/50 text-amber-100 placeholder-amber-300/50 outline-none transition-all duration-300 shadow-lg focus:shadow-amber-500/20"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl group-hover:scale-110 transition-transform duration-300">
                🔍
              </span>
            </div>
          </div>

          {/* Kategori Filtreleri */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl backdrop-blur-xl transition-all duration-500 transform hover:scale-105 flex items-center gap-2 text-lg font-medium ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                    : "bg-white/10 text-amber-200 hover:bg-white/20"
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Masal Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group relative bg-gradient-to-br from-amber-500/10 to-red-500/10 rounded-3xl p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-red-400 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

              {/* Masal İkonu */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {story.image}
              </div>

              {/* Masal Başlığı */}
              <h3 className="text-2xl font-bold mb-3 text-amber-300">
                {story.title}
              </h3>

              {/* Yazar */}
              <p className="text-amber-200/80 mb-4">
                <span className="text-sm">Yazar:</span> {story.author}
              </p>

              {/* Açıklama */}
              <p className="text-amber-200/70 mb-6 line-clamp-3">
                {story.description}
              </p>

              {/* Alt Bilgiler */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm px-3 py-1 rounded-full bg-amber-500/20 text-amber-300">
                  {categories.find((c) => c.id === story.category)?.name}
                </span>
                <span className="text-sm text-amber-200/60">
                  {new Date(story.date).toLocaleDateString("tr-TR")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sayfa Altı Bilgi */}
        <div className="text-center mt-16">
          <p className="text-lg text-amber-200 animate-pulse">
            ✨ Her hafta yeni masallar ekleniyor! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Library;
