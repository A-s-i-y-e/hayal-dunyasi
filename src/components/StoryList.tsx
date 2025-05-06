import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

interface Story {
  id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: any;
  updatedAt: any;
  pages: { imageUrl: string; text: string }[];
}

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const storiesQuery = query(
          collection(db, "stories"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(storiesQuery);
        const storiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Story[];
        setStories(storiesData);
      } catch (err) {
        setError("Hikayeler yüklenirken bir hata oluştu.");
        console.error("Error fetching stories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hikayeler</h1>
        <Link
          to="/create-story"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Yeni Hikaye Oluştur
        </Link>
      </div>

      {stories.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          Henüz hiç hikaye oluşturulmamış.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Link
              key={story.id}
              to={`/story/${story.id}`}
              className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={story.pages[0]?.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
                <p className="text-gray-600 line-clamp-2">
                  {story.description}
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(story.createdAt?.toDate()).toLocaleDateString(
                    "tr-TR"
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryList;
