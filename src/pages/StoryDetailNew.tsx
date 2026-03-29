import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { auth } from "../services/firebase";

interface Story {
  id: string;
  title: string;
  genre: string;
  description: string;
  coverImage: string;
  pages: {
    imageUrl: string;
    text: string;
    audioData?: string;
    imageData?: string;
  }[];
  userId: string;
  userName?: string;
  createdAt: any;
  updatedAt: any;
  likes: number;
  comments: {
    userId: string;
    userName: string;
    text: string;
    timestamp: any;
  }[];
  status: string;
  drawingImage?: string;
  imageData?: string;
  drawing?: {
    imageData?: string;
  };
  content?: string;
}

const StoryDetailNew: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      if (!id) return;

      try {
        const db = getFirestore();
        const storyDoc = await getDoc(doc(db, "stories", id));

        if (storyDoc.exists()) {
          const data = storyDoc.data();
          setStory({
            id: storyDoc.id,
            ...data,
            drawing: data.drawing || {},
          } as Story);
        }
      } catch (error) {
        console.error("Hikaye yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  useEffect(() => {
    const checkLiked = async () => {
      if (!story || !auth.currentUser) return;
      const db = getFirestore();
      const likesRef = collection(db, "likes");
      const q = query(
        likesRef,
        where("userId", "==", auth.currentUser.uid),
        where("storyId", "==", story.id)
      );
      const snapshot = await getDocs(q);
      setIsLiked(!snapshot.empty);
    };
    checkLiked();
  }, [story, auth.currentUser]);

  const handleLike = async () => {
    if (!story || !auth.currentUser || isLiked) return;
    try {
      const db = getFirestore();
      const likesRef = collection(db, "likes");
      const q = query(
        likesRef,
        where("userId", "==", auth.currentUser.uid),
        where("storyId", "==", story.id)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setIsLiked(true);
        return;
      }
      await addDoc(likesRef, {
        userId: auth.currentUser.uid,
        storyId: story.id,
        createdAt: new Date(),
      });
      const storyRef = doc(db, "stories", story.id);
      await updateDoc(storyRef, {
        likes: story.likes + 1,
      });
      setStory({
        ...story,
        likes: story.likes + 1,
      });
      setIsLiked(true);
    } catch (error) {
      console.error("Beğeni eklenirken hata oluştu:", error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !story) return;

    setIsSubmitting(true);
    try {
      const db = getFirestore();
      const newComment = {
        userId: auth.currentUser?.uid || "",
        userName: auth.currentUser?.displayName || "Anonim",
        text: comment,
        timestamp: serverTimestamp(),
      };

      await updateDoc(doc(db, "stories", story.id), {
        comments: arrayUnion(newComment),
      });

      setComment("");
    } catch (error) {
      console.error("Yorum eklenirken hata oluştu:", error);
      alert("Yorum eklenirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-700">Hikaye yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <p className="text-red-600 mb-4">{error || "Hikaye bulunamadı"}</p>
          <button
            onClick={() => navigate("/stories")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Hikayelere Dön
          </button>
        </div>
      </div>
    );
  }

  console.log("story:", story);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto p-4">
        {/* Hikaye Başlığı ve Kapak */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl mb-8">
          {(() => {
            // Debug için resim verilerini kontrol et
            console.log("Image sources:", {
              drawingImage: story?.drawingImage,
              coverImage: story?.coverImage,
              drawingImageData: story?.drawing?.imageData,
              pagesImageUrl: story?.pages?.[0]?.imageUrl,
            });
            return null;
          })()}
          {(story?.drawing?.imageData ||
            story?.drawingImage ||
            story?.coverImage) && (
            <img
              src={
                story?.drawing?.imageData ||
                story?.drawingImage ||
                story?.coverImage
              }
              alt={story.title}
              className="w-full h-full object-contain bg-gray-50"
              onError={(e) => {
                console.error("Image Error:", {
                  src: e.currentTarget.src.substring(0, 50) + "...",
                  error: e,
                });
              }}
              onLoad={(e) => {
                console.log("Image Loaded:", {
                  width: e.currentTarget.naturalWidth,
                  height: e.currentTarget.naturalHeight,
                });
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                {story.title}
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <span className="px-3 py-1 bg-purple-600/80 rounded-full text-sm">
                  {story.genre}
                </span>
                <span>
                  {new Date(story.createdAt.toDate()).toLocaleDateString(
                    "tr-TR"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Sidebar - Hikaye Detayları */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Hikaye Bilgileri
              </h2>
              <p className="text-gray-600 mb-6">{story.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={handleLike}
                  disabled={isLiked}
                  aria-label="Beğen"
                  title="Beğen"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border border-gray-300 shadow-sm ${
                    isLiked
                      ? "bg-pink-100 text-pink-500 opacity-60 cursor-not-allowed"
                      : "bg-gray-50 text-gray-500 hover:bg-pink-50 hover:text-pink-500"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={isLiked ? "#ec4899" : "none"}
                    stroke={isLiked ? "#ec4899" : "currentColor"}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="font-medium text-base">{story.likes}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sağ İçerik - Hikaye Sayfaları */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4 text-lg">{story.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailNew;
