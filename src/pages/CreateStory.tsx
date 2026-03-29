import React, { useState, useEffect, useRef } from "react";
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
  serverTimestamp,
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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const db = getFirestore();
        const drawingsRef = collection(db, "drawings");
        const q = query(drawingsRef, where("userId", "==", user.uid));

        const querySnapshot = await getDocs(q);
        const fetchedDrawings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Drawing[];

        // Tarihe göre sırala (en yeni en üstte)
        fetchedDrawings.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);
          return dateB.getTime() - dateA.getTime();
        });

        setDrawings(fetchedDrawings);
      } catch (error) {
        console.error("Çizimler yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrawings();
  }, []); // Sadece component mount olduğunda çalışsın

  // Yeni çizim ekleme işlemi
  const addNewDrawing = async () => {
    if (!location.state?.drawingUrl || !isInitialMount.current) return;

    try {
      const user = auth.currentUser;
      if (!user) return;

      isInitialMount.current = false;

      const newDrawing = {
        imageData: location.state.drawingUrl,
        title: location.state.drawingName,
        description: "Çizim atölyesinden yeni çizim",
        createdAt: serverTimestamp(),
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

      // State'i temizle
      navigate(location.pathname, { replace: true });
    } catch (error) {
      console.error("Yeni çizim eklenirken hata oluştu:", error);
    }
  };

  // Yeni çizim varsa ekle
  useEffect(() => {
    addNewDrawing();
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
    navigate("/create-story-form", { state: { drawing } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Çizimlerimden Hikaye Oluştur
        </h1>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <div>
            {drawings.length === 0 ? (
              <div className="text-center text-white py-8">
                <p className="text-lg mb-4">Henüz hiç çizim yapmamışsın!</p>
                <button
                  onClick={() => navigate("/drawing-workshop")}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors duration-300"
                >
                  Çizim Yapmaya Başla
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drawings.map((drawing) => (
                  <div
                    key={drawing.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden relative group"
                  >
                    <div className="relative">
                      <img
                        src={drawing.imageData}
                        alt={drawing.title}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => handleDelete(drawing.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                        title="Çizimi Sil"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {drawing.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {drawing.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {drawing.createdAt
                            ?.toDate?.()
                            ?.toLocaleDateString() ||
                            new Date().toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleCreateStory(drawing)}
                          className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors duration-300"
                        >
                          Hikaye Oluştur
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
