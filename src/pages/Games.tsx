import React from "react";
import { useNavigate } from "react-router-dom";

const Games: React.FC = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: "Kelime Bulmacası",
      description: "Harfleri birleştirerek kelimeleri bul!",
      icon: "🔠",
      path: "/games/word-puzzle",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Sayı Oyunu",
      description: "Sayıları kullanarak eğlenceli matematik oyunları oyna!",
      icon: "🔢",
      path: "/games/number-game",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Hafıza Kartları",
      description: "Kartları eşleştirerek hafızanı geliştir!",
      icon: "🎴",
      path: "/games/memory-cards",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Puzzle",
      description: "Parçaları birleştirerek resimleri tamamla!",
      icon: "🧩",
      path: "/games/puzzle",
      gradient: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-6">
            Oyunlar
          </h1>
          <p className="text-2xl text-gray-600">
            Eğlenceli oyunlarla öğrenmeye devam et!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.map((game, index) => (
            <div
              key={index}
              onClick={() => navigate(game.path)}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
            >
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-r ${game.gradient} flex items-center justify-center text-5xl mb-6 group-hover:rotate-12 transition-transform duration-300`}
              >
                {game.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {game.title}
              </h2>
              <p className="text-xl text-gray-600 mb-6">{game.description}</p>
              <div className="flex items-center text-purple-600 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-lg font-medium">Oyna</span>
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

export default Games;
