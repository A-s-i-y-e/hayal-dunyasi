import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { getAuth } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

interface StoryCardProps {
  id: string;
  title: string;
  author: string;
  genre: string;
  readingTime: string;
  description: string;
  onClick?: () => void;
  myStoriesMode?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  story: any; // Hikaye nesnesinin tamamı
}

const StoryCard: React.FC<StoryCardProps> = ({
  id,
  title,
  author,
  genre,
  readingTime,
  description,
  onClick,
  myStoriesMode = false,
  onEdit,
  onDelete,
  onArchive,
  story,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = React.useState(false);
  const auth = getAuth();

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
    e.currentTarget.src =
      "https://placehold.co/400x300/e2e8f0/64748b?text=Görsel+Yok";
  };

  // Görüntü URL'sini kontrol et ve düzelt
  const getImageUrl = (story: any) => {
    return (
      story?.drawing?.imageData ||
      story?.drawingImage ||
      story?.coverImage ||
      "https://placehold.co/400x300/e2e8f0/64748b?text=Görsel+Yok"
    );
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/stories/${id}`);
    }
  };

  // Kategoriye göre arka plan rengi belirle
  const genreColors: Record<string, string> = {
    Macera: "bg-gray-100",
    Spor: "bg-yellow-100",
    Hayvanlar: "bg-green-100",
    Doğa: "bg-orange-100",
    Masal: "bg-pink-100",
    Genel: "bg-gray-100",
  };
  const cardBg = genreColors[genre] || "bg-gray-100";

  // Kart ilk yüklendiğinde bu hikaye zaten favorilerde mi kontrol et
  React.useEffect(() => {
    const checkLiked = async () => {
      if (!auth.currentUser) return;
      const likesRef = collection(db, "likes");
      const q = query(
        likesRef,
        where("userId", "==", auth.currentUser.uid),
        where("storyId", "==", id)
      );
      const snapshot = await getDocs(q);
      setIsLiked(!snapshot.empty);
    };
    checkLiked();
  }, [auth.currentUser, id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!auth.currentUser) {
      alert("Favorilere eklemek için giriş yapmalısınız!");
      return;
    }
    if (isLiked) return; // Çift eklemeyi engelle
    try {
      await addDoc(collection(db, "likes"), {
        userId: auth.currentUser.uid,
        storyId: id,
        createdAt: new Date(),
      });
      setIsLiked(true);
    } catch (error) {
      alert("Favorilere eklenirken hata oluştu");
    }
  };

  return (
    <div
      className={`rounded-2xl shadow-lg overflow-hidden ${cardBg} flex flex-col h-full transition-transform duration-200 hover:scale-105 cursor-pointer`}
      onClick={handleClick}
    >
      {/* Üstte büyük görsel */}
      <div className="w-full h-40 flex items-center justify-center bg-white">
        <img
          src={getImageUrl(story)}
          alt={title}
          className="max-h-36 object-contain"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      {/* İçerik */}
      <div className="flex-1 flex flex-col p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
          {title || "İsimsiz Hikaye"}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {author || "Kullanıcı"}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h10M7 11h10M7 15h10"
              />
            </svg>
            {genre || "Genel"}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {description || "Açıklama bulunmuyor."}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex gap-2 w-full">
            {/* Kalp (beğeni) butonu */}
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow border border-gray-200 ${
                isLiked
                  ? "text-pink-500 bg-pink-100"
                  : "hover:bg-pink-100 text-pink-500"
              }`}
              type="button"
              tabIndex={-1}
              onClick={handleLike}
            >
              <svg
                className="w-6 h-6"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            {/* Sadece MyStories'te düzenle ve sil butonları */}
            {myStoriesMode && (
              <>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow border border-gray-200 hover:bg-blue-100 text-blue-500"
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit && onEdit();
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2H7v-2a2 2 0 012-2h2"
                    />
                  </svg>
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow border border-gray-200 hover:bg-yellow-100 text-yellow-500"
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive && onArchive();
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4"
                    />
                  </svg>
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow border border-gray-200 hover:bg-red-100 text-red-500"
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete();
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </>
            )}
            {/* Oku butonu */}
            <button
              className="flex-1 px-5 py-2 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-900 transition-colors"
              type="button"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              Oku
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
