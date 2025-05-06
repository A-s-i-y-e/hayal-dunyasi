import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import AudioRecorder from "../components/AudioRecorder";

interface Drawing {
  id: string;
  imageData: string;
  title: string;
  description: string;
}

const CreateStoryForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audioData, setAudioData] = useState<string | null>(null);
  const drawing = location.state?.drawing as Drawing;

  useEffect(() => {
    if (!drawing) {
      navigate("/create-story");
    }
  }, [drawing, navigate]);

  const handleAudioRecorded = async (audioBlob: Blob) => {
    try {
      // Ses kaydını base64'e çevir
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64Audio = reader.result as string;
        setAudioData(base64Audio);
      };
    } catch (error) {
      console.error("Ses kaydı işlenirken hata:", error);
      alert("Ses kaydı işlenirken bir hata oluştu.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !genre.trim()) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    try {
      setIsSubmitting(true);
      const user = auth.currentUser;
      if (!user) {
        alert("Lütfen önce giriş yapın");
        return;
      }

      const db = getFirestore();
      const storiesRef = collection(db, "stories");

      await addDoc(storiesRef, {
        userId: user.uid,
        title,
        content,
        genre,
        drawingId: drawing.id,
        drawingImage: drawing.imageData,
        coverImage: drawing.imageData,
        pages: [
          {
            imageUrl: drawing.imageData,
            text: `Çizim: ${drawing.title}\n\n${drawing.description}\n\nHikaye: ${content}`,
            audioData: audioData,
          },
        ],
        createdAt: serverTimestamp(),
        likes: 0,
        comments: [],
        status: "published",
      });

      alert("Hikaye başarıyla oluşturuldu!");
      navigate("/stories");
    } catch (error) {
      console.error("Hikaye oluşturulurken hata oluştu:", error);
      alert("Hikaye oluşturulurken bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!drawing) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Yeni Hikaye Oluştur
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={drawing.imageData}
                  alt={drawing.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  Çizim
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {drawing.title}
                </h3>
                <p className="text-gray-600">{drawing.description}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hikaye Başlığı
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Hikayenin başlığını yaz..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hikaye Türü
              </label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Hikayenin türünü yaz..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hikaye İçeriği
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Hikayeni yaz..."
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Ses Kaydı</label>
              <AudioRecorder onAudioRecorded={handleAudioRecorded} />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => navigate("/create-story")}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-lg ${
                  isSubmitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600"
                } text-white`}
              >
                {isSubmitting ? "Oluşturuluyor..." : "Hikayeyi Oluştur"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryForm;
