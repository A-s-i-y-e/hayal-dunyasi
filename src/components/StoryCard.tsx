import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface StoryCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  genre: string;
  readingTime: string;
  description: string;
  onClick?: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  id,
  title,
  author,
  coverImage,
  genre,
  readingTime,
  description,
  onClick,
}) => {
  const navigate = useNavigate();

  // Kart renklerini belirle
  const cardColors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-cyan-500 to-blue-500",
    "from-emerald-500 to-teal-500",
  ];

  // ID'ye göre sabit bir renk seç (aynı kart her zaman aynı renkte olsun)
  const colorIndex =
    id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    cardColors.length;
  const gradientColors = cardColors[colorIndex];

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = "https://via.placeholder.com/400x300?text=Görsel+Yok";
  };

  // Görüntü URL'sini kontrol et ve düzelt
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "https://via.placeholder.com/400x300?text=Görsel+Yok";

    // Base64 formatındaki görüntüyü kontrol et
    if (imageUrl.startsWith("data:image")) {
      return imageUrl;
    }

    // HTTP URL'lerini kontrol et
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    // Firebase Storage URL'lerini kontrol et
    if (imageUrl.includes("firebasestorage")) {
      return imageUrl;
    }

    return "https://via.placeholder.com/400x300?text=Görsel+Yok";
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/stories/${id}`);
    }
  };

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative h-64 bg-gray-100">
        <img
          src={getImageUrl(coverImage)}
          alt={title}
          className="w-full h-full object-contain"
          onError={handleImageError}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {genre}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1">
          {title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-1">{author}</p>

        <div className="flex items-center text-gray-500 mb-4">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{readingTime}</span>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-2">{description}</p>

        <div
          className={`w-full bg-gradient-to-r ${gradientColors} text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center group-hover:scale-105`}
        >
          <span>Oku</span>
          <svg
            className="w-5 h-5 ml-2"
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
    </div>
  );
};

export default StoryCard;
