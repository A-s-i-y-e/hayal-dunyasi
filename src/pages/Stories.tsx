import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoryCard from "../components/StoryCard";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";

interface Story {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  content: string;
  genre: string;
  readingTime: string;
  userId: string;
  userName: string;
  createdAt: any;
  pages?: { imageUrl: string; text: string }[];
  drawingImage?: string;
  drawing: any;
}

const Stories: React.FC = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllStories = async () => {
      try {
        console.log("Tüm hikayeler getiriliyor...");
        const storiesRef = collection(db, "stories");
        const q = query(storiesRef, orderBy("createdAt", "desc"));
        console.log("Stories koleksiyonu referansı alındı");

        const querySnapshot = await getDocs(q);
        console.log("Sorgu sonuçları alındı");
        console.log("Bulunan hikaye sayısı:", querySnapshot.size);

        if (querySnapshot.empty) {
          console.log("Veritabanında hiç hikaye bulunamadı!");
          setStories([]);
          setLoading(false);
          return;
        }

        const fetchedStories = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Hikaye ID:", doc.id);
          console.log("Hikaye verisi:", data);

          // Kapak resmini kontrol et
          let coverImage = "";
          if (data.drawingImage) {
            coverImage = data.drawingImage;
          } else if (
            data.pages &&
            data.pages.length > 0 &&
            data.pages[0].imageUrl
          ) {
            coverImage = data.pages[0].imageUrl;
          } else if (data.coverImage) {
            coverImage = data.coverImage;
          } else {
            coverImage = "https://via.placeholder.com/400x300?text=Görsel+Yok";
          }

          // Okuma süresini hesapla
          const readingTime = data.readingTime || "5 dk";

          // İçeriği kontrol et
          let content = data.content || "";
          if (data.pages && data.pages.length > 0) {
            content = data.pages.map((page: any) => page.text).join("\n\n");
          }

          return {
            id: doc.id,
            title: data.title || "İsimsiz Hikaye",
            author: data.userName || data.author || "Anonim",
            coverImage: coverImage,
            description: data.description || "Açıklama bulunmuyor.",
            content: content,
            genre: data.genre || "Genel",
            readingTime: readingTime,
            userId: data.userId || "",
            userName: data.userName || "",
            createdAt: data.createdAt,
            pages: data.pages || [],
            drawing: data.drawing || {},
            drawingImage: data.drawingImage,
          } as Story;
        });

        console.log("İşlenmiş hikayeler:", fetchedStories);
        setStories(fetchedStories);
      } catch (error) {
        console.error("Hikayeler yüklenirken hata oluştu:", error);
        setError(
          "Hikayeler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllStories();
  }, []);

  const handleStoryClick = (story: Story) => {
    navigate(`/stories/${story.id}`);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
            Tüm Hikayeler
          </h1>
          <p className="text-lg text-gray-700">
            Hayal dünyasında yeni maceralar keşfet! 📚
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <p className="text-xl text-gray-600">Henüz hikaye eklenmemiş.</p>
            <button
              onClick={() => navigate("/create-story")}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              İlk Hikayeni Yaz
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                author={story.userName || story.author}
                genre={story.genre}
                readingTime={story.readingTime}
                description={story.description}
                story={story}
                onClick={() => handleStoryClick(story)}
              />
            ))}
          </div>
        )}

        {selectedStory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">
                    {selectedStory.title}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {selectedStory.userName || selectedStory.author}
                  </p>
                </div>
                <button
                  onClick={handleCloseStory}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="prose prose-lg max-w-none">
                {selectedStory.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
