import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
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
}

interface Drawing {
  id: string;
  imageData: string;
  title: string;
  description: string;
}

const StoryDetail: React.FC = () => {
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
        setLoading(true);
        const db = getFirestore();
        const storyRef = doc(db, "stories", id);
        const storySnap = await getDoc(storyRef);

        if (storySnap.exists()) {
          const storyData = storySnap.data();
          console.log("Hikaye verisi:", storyData);
          console.log("Sayfalar:", storyData.pages);
          setStory({
            id: storySnap.id,
            title: storyData.title || "",
            genre: storyData.genre || "",
            description: storyData.description || "",
            coverImage: storyData.coverImage || "",
            pages: storyData.pages || [],
            userId: storyData.userId || "",
            userName: storyData.userName || "",
            createdAt: storyData.createdAt,
            updatedAt: storyData.updatedAt,
            likes: storyData.likes || 0,
            comments: storyData.comments || [],
            status: storyData.status || "published",
          });
        } else {
          setError("Hikaye bulunamadı.");
        }
      } catch (error) {
        console.error("Hikaye yüklenirken hata oluştu:", error);
        setError("Hikaye yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleLike = async () => {
    if (!story || !auth.currentUser) return;

    try {
      const db = getFirestore();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-600">{error}</div>
        </div>
      ) : story ? (
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-[500px]">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white text-center px-4">
                  {story.title}
                </h1>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      Hikaye Detayları
                    </h2>
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{story.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {story.genre}
                        </span>
                        <span className="text-gray-500">
                          {new Date(
                            story.createdAt.toDate()
                          ).toLocaleDateString("tr-TR")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isLiked
                          ? "bg-pink-100 text-pink-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
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
                      <span>{story.likes} Beğeni</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Hikaye İçeriği
                  </h2>
                  <div className="space-y-6">
                    {story.pages.map((page, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={page.imageUrl}
                            alt={`Sayfa ${index + 1}`}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                            Sayfa {index + 1}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="prose max-w-none">
                            {page.text
                              .split("\n\n")
                              .map((paragraph, pIndex) => (
                                <p key={pIndex} className="text-gray-700 mb-4">
                                  {paragraph}
                                </p>
                              ))}
                          </div>
                          {page.audioData && (
                            <div className="mt-4 bg-purple-50 rounded-lg p-4">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={(e) => {
                                    const audio =
                                      e.currentTarget.parentElement?.querySelector(
                                        "audio"
                                      );
                                    if (audio) {
                                      if (audio.paused) {
                                        audio.play();
                                      } else {
                                        audio.pause();
                                      }
                                    }
                                  }}
                                  className="flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                                >
                                  <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </button>
                                <div className="flex-1">
                                  <p className="text-sm text-purple-600 font-medium mb-1">
                                    Sesli Anlatım
                                  </p>
                                  <audio
                                    controls
                                    src={page.audioData}
                                    className="w-full"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Yorumlar
                </h2>
                <div className="space-y-4">
                  {story.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-sm p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-800">
                          {comment.userName}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {new Date(
                            comment.timestamp.toDate()
                          ).toLocaleDateString("tr-TR")}
                        </span>
                      </div>
                      <p className="text-gray-600">{comment.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Yorumunuzu yazın..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                  />
                  <button
                    onClick={handleComment}
                    disabled={isSubmitting || !comment.trim()}
                    className={`mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 ${
                      isSubmitting || !comment.trim()
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Yorum Ekle"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StoryDetail;
