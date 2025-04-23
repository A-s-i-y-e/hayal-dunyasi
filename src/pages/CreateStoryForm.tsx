import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

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
  const drawing = location.state?.drawing as Drawing;

  useEffect(() => {
    if (!drawing) {
      navigate("/create-story");
    }
  }, [drawing, navigate]);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            Hikayeni Oluştur
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            Çizimini kullanarak harika bir hikaye yaz! 📚
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Çizim Kartı */}
          <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Çizimin
            </h2>
            <img
              src={drawing.imageData}
              alt={drawing.title}
              className="w-full h-64 object-contain rounded-lg mb-4"
            />
            <h3 className="text-lg font-medium text-gray-800">
              {drawing.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{drawing.description}</p>
          </div>

          {/* Hikaye Formu */}
          <div className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Hikaye Bilgileri
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  Tür
                </label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Tür seçin</option>
                  <option value="macera">Macera</option>
                  <option value="fantastik">Fantastik</option>
                  <option value="bilimkurgu">Bilim Kurgu</option>
                  <option value="komedi">Komedi</option>
                  <option value="dram">Dram</option>
                </select>
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
    </div>
  );
};

export default CreateStoryForm;
