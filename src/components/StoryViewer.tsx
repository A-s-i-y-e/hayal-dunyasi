import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

interface StoryViewerProps {
  userId: string;
}

interface Page {
  imageUrl: string;
  text: string;
}

interface Story {
  title: string;
  description: string;
  genre: string;
  coverImage: string;
  pages: Page[];
  userId: string;
  createdAt: any;
  updatedAt: any;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ userId }) => {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      if (!storyId) return;

      try {
        const storyDoc = await getDoc(doc(db, "stories", storyId));
        if (storyDoc.exists()) {
          setStory(storyDoc.data() as Story);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (!story) {
    return <div>Hikaye bulunamadı.</div>;
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-2">{story.title}</h1>
        <p className="text-gray-600 mb-4">{story.genre}</p>
        <p className="text-gray-700 mb-6">{story.description}</p>

        <div className="relative">
          <img
            src={story.pages[currentPage].imageUrl}
            alt={`Sayfa ${currentPage + 1}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
          {story.pages[currentPage].text && (
            <p className="mt-4 text-gray-700">
              {story.pages[currentPage].text}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Önceki Sayfa
          </button>
          <span className="text-gray-600">
            Sayfa {currentPage + 1} / {story.pages.length}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === story.pages.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Sonraki Sayfa
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
