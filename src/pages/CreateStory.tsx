import React, { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";

interface Drawing {
  id: string;
  imageData: string;
  title: string;
  description: string;
  createdAt: any;
}

const CreateStory: React.FC = () => {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // Eğer çizim atölyesinden yeni bir çizim geldiyse
        if (location.state?.drawingUrl) {
          const newDrawing = {
            imageData: location.state.drawingUrl,
            title: location.state.drawingName,
            description: "Çizim atölyesinden yeni çizim",
            createdAt: new Date(),
            userId: user.uid,
          };

          const db = getFirestore();
          const docRef = await addDoc(collection(db, "drawings"), newDrawing);

          // Yeni çizimi listeye ekle
          setDrawings((prevDrawings) => [
            {
              id: docRef.id,
              ...newDrawing,
            },
            ...prevDrawings,
          ]);
        }

        const db = getFirestore();
        const drawingsRef = collection(db, "drawings");
        const q = query(drawingsRef, where("userId", "==", user.uid));

        const querySnapshot = await getDocs(q);
        const fetchedDrawings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Drawing[];

        // Tarihe göre sırala (en yeni en üstte)
        fetchedDrawings.sort(
          (a, b) => b.createdAt?.toDate() - a.createdAt?.toDate()
        );

        setDrawings(fetchedDrawings);
      } catch (error) {
        console.error("Çizimler yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawings();
  }, [location.state]);

  const handleDelete = async (drawingId: string) => {
    if (!window.confirm("Bu çizimi silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const db = getFirestore();
      await deleteDoc(doc(db, "drawings", drawingId));

      // Çizimleri güncelle
      setDrawings(drawings.filter((drawing) => drawing.id !== drawingId));
      alert("Çizim başarıyla silindi!");
    } catch (error) {
      console.error("Çizim silinirken hata oluştu:", error);
      alert("Çizim silinirken bir hata oluştu");
    }
  };

  const handleCreateStory = (drawing: Drawing) => {
    // Hikaye oluşturma sayfasına yönlendir ve çizim verisini state olarak gönder
    navigate("/create-story-form", { state: { drawing } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            Hikayeni Yaz
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            Çizimlerini kullanarak yeni bir hikaye oluştur! 📚
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-700">Çizimler yükleniyor...</p>
          </div>
        ) : drawings.length === 0 ? (
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <p className="text-gray-700">
              Henüz hiç çizim yok. Önce çizim atölyesinde bir çizim yap!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drawings.map((drawing) => (
              <div
                key={drawing.id}
                className="bg-white/90 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={drawing.imageData}
                    alt={drawing.title}
                    className="w-full h-48 object-contain rounded-lg mb-2"
                  />
                  <button
                    onClick={() => handleDelete(drawing.id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                    title="Çizimi Sil"
                  >
                    🗑️
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {drawing.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {drawing.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {drawing.createdAt?.toDate().toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleCreateStory(drawing)}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors duration-300"
                  >
                    Hikaye Oluştur
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStory;
