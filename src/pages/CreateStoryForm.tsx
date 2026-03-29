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
import { visionService } from "../services/visionService";
import { openaiService } from "../services/openaiService";

interface Drawing {
  id: string;
  imageData: string;
  title: string;
  description: string;
}

const CATEGORIES = [
  { id: "macera", label: "Macera", icon: "🏃" },
  { id: "bilim-kurgu", label: "Bilim Kurgu", icon: "🚀" },
  { id: "fantastik", label: "Fantastik", icon: "✨" },
  { id: "masal", label: "Masal", icon: "📚" },
  { id: "hayvanlar", label: "Hayvanlar", icon: "🐘" },
  { id: "dostluk", label: "Dostluk", icon: "🤝" },
  { id: "egitici", label: "Eğitici", icon: "🎓" },
  { id: "spor", label: "Spor", icon: "⚽" },
  { id: "doga", label: "Doğa", icon: "🌳" },
  { id: "uzay", label: "Uzay", icon: "🌙" },
  { id: "deniz", label: "Deniz", icon: "🐠" },
  { id: "muzik", label: "Müzik", icon: "🎵" },
];

const CreateStoryForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const drawing = location.state?.drawing as Drawing;

  useEffect(() => {
    if (!drawing) {
      navigate("/create-story");
    }
  }, [drawing, navigate]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // OpenAI ile çizimi analiz et
      const result = await openaiService.analyzeDrawing(drawing.imageData);
      setAnalysis(result.analysis);
      setContent(result.story);
    } catch (error) {
      console.error("Çizim analizi hatası:", error);
      setError(
        "Çizim analiz edilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !content.trim()) {
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
        title: title,
        content: content,
        genre: category,
        drawingId: drawing.id,
        drawingImage: drawing.imageData,
        coverImage: drawing.imageData,
        analysis: analysis,
        suggestions: suggestions,
        pages: [
          {
            imageUrl: drawing.imageData,
            text: `Çizim: ${drawing.title}\n\n${drawing.description}\n\nHikaye: ${content}`,
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
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Hata!</h1>
          <p className="mb-4">Çizim bulunamadı. Lütfen önce bir çizim seçin.</p>
          <button
            onClick={() => navigate("/create-story")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Çizimlere Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-[1920px] mx-auto">
        <h1 className="text-5xl font-bold text-white mb-10">Hikaye Oluştur</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Orta - Çizim ve Analiz */}
          <div className="lg:col-span-6 space-y-10">
            {/* Çizim Formu */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-10">
              <h3 className="text-3xl font-semibold text-white mb-8">Çizim</h3>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={drawing.imageData}
                    alt={drawing.title}
                    className="w-full h-auto max-h-[500px] object-contain bg-gray-50"
                  />
                  <div className="absolute top-5 right-5 bg-white/90 px-5 py-2 rounded-full text-lg font-medium text-gray-700">
                    Çizim
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {drawing.title}
                  </h3>
                  <p className="text-xl text-gray-600">{drawing.description}</p>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full mt-8 px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analiz Ediliyor...
                  </div>
                ) : (
                  "Çizimi Analiz Et"
                )}
              </button>
            </div>

            {/* Analiz Sonuçları */}
            {analysis && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-10">
                <h3 className="text-3xl font-semibold text-white mb-8">
                  Analiz Sonuçları
                </h3>
                <div className="space-y-8">
                  <div className="bg-white/5 rounded-xl p-8">
                    <h4 className="text-2xl font-medium text-white mb-5">
                      Çizim Analizi
                    </h4>
                    <p className="text-xl text-white/80 whitespace-pre-wrap">
                      {analysis}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-8">
                    <h4 className="text-2xl font-medium text-white mb-5">
                      Hikaye Önerisi
                    </h4>
                    <p className="text-xl text-white/80 whitespace-pre-wrap">
                      {content}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sağ taraf - Hikaye Formu */}
          <div className="lg:col-span-6 bg-white/10 backdrop-blur-sm rounded-xl p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <label className="block text-xl font-medium text-white mb-3">
                  Hikaye Başlığı
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Hikayenin başlığını yaz..."
                  className="w-full px-8 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-xl text-white placeholder-white/50"
                />
              </div>

              <div>
                <label className="block text-xl font-medium text-white mb-5">
                  Hikaye Kategorisi
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300 ${
                        category === cat.id
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <span className="text-3xl mb-2">{cat.icon}</span>
                      <span className="text-lg font-medium">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xl font-medium text-white mb-3">
                  Hikaye İçeriği
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Hikayeni yaz..."
                  rows={10}
                  className="w-full px-8 py-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-xl text-white placeholder-white/50"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Kaydediliyor..." : "Hikayeyi Kaydet"}
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
