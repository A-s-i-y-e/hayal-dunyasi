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
import { aiService } from "../services/aiService";

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
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde modeli yükle
    const loadModel = async () => {
      try {
        await aiService.loadModel();
      } catch (error) {
        console.error("Model yüklenirken hata oluştu:", error);
      }
    };
    loadModel();
  }, []);

  useEffect(() => {
    if (!drawing) {
      navigate("/create-story");
    }
  }, [drawing, navigate]);

  const handleAnalyzeDrawing = async () => {
    if (!drawing?.imageData) {
      alert("Analiz edilecek çizim bulunamadı!");
      return;
    }

    try {
      console.log("🚀 Analiz işlemi başlatılıyor...");
      setIsAnalyzing(true);

      // Görüntüyü yükle
      const image = new Image();
      image.crossOrigin = "anonymous"; // CORS hatasını önlemek için

      // Görüntü yükleme hatalarını yakala
      image.onerror = (error) => {
        console.error("❌ Görüntü yüklenirken hata oluştu:", error);
        alert("Görüntü yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        setIsAnalyzing(false);
      };

      // Görüntü yüklendiğinde analiz et
      image.onload = async () => {
        try {
          console.log("📸 Görüntü yüklendi, analiz başlıyor...");
          console.log("📐 Görüntü boyutları:", image.width, "x", image.height);

          // Görüntü boyutlarını kontrol et
          if (image.width === 0 || image.height === 0) {
            throw new Error("Geçersiz görüntü boyutları!");
          }

          // Görüntüyü canvas'a çiz
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            throw new Error("Canvas context oluşturulamadı!");
          }

          ctx.drawImage(image, 0, 0);
          console.log("🎨 Görüntü canvas'a çizildi");

          // Analiz işlemlerini yap
          const analysis = await aiService.analyzeDrawing(image);
          const storyPrompt = await aiService.generateStoryPrompt(analysis);
          const suggestions = await aiService.suggestStoryElements(analysis);

          setAiSuggestions(suggestions);
          setContent(storyPrompt);
          console.log("✅ Analiz işlemi başarıyla tamamlandı!");
        } catch (error) {
          console.error("❌ Analiz sırasında hata oluştu:", error);
          alert(
            "Çizim analiz edilirken bir hata oluştu. Lütfen tekrar deneyin."
          );
        } finally {
          setIsAnalyzing(false);
        }
      };

      // Görüntüyü yüklemeye başla
      image.src = drawing.imageData;
    } catch (error) {
      console.error("❌ Analiz başlatılırken hata oluştu:", error);
      alert("Analiz başlatılırken bir hata oluştu. Lütfen tekrar deneyin.");
      setIsAnalyzing(false);
    }
  };

  const handleAudioRecorded = async (audioBlob: Blob) => {
    try {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-md z-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Yeni Hikaye Oluştur
            </h1>
            <button
              onClick={() => navigate("/create-story")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              İptal
            </button>
          </div>
        </div>
      </div>

      <div className="pt-24 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <div className="mb-6 flex justify-end">
              <button
                onClick={handleAnalyzeDrawing}
                disabled={isAnalyzing || !drawing?.imageData}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {isAnalyzing ? "Analiz Ediliyor..." : "Çizimi Analiz Et"}
              </button>
            </div>

            {aiSuggestions && (
              <div className="mb-8 p-6 bg-purple-50 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  AI Önerileri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Karakterler
                    </h3>
                    <ul className="list-disc list-inside">
                      {aiSuggestions.characters.map(
                        (char: string, index: number) => (
                          <li key={index} className="text-gray-600">
                            {char}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Mekan
                    </h3>
                    <p className="text-gray-600">{aiSuggestions.setting}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Hikaye
                    </h3>
                    <p className="text-gray-600">{aiSuggestions.plot}</p>
                  </div>
                </div>
              </div>
            )}

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

              <div className="flex justify-end">
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

      {isAnalyzing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-700">
              Çiziminiz analiz ediliyor...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStoryForm;
