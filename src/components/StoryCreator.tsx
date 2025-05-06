import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config";
import DrawingTools from "./DrawingTools";
import AudioRecorder from "./AudioRecorder";

interface StoryCreatorProps {
  userId: string;
}

interface Page {
  image: string;
  text: string;
  audioUrl?: string;
}

const StoryCreator: React.FC<StoryCreatorProps> = ({ userId }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas boyutlarını ayarla
    canvas.width = 800;
    canvas.height = 600;

    // Arka planı beyaz yap
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Mevcut sayfayı yükle
    if (pages[currentPage]) {
      const img = new Image();
      img.src = pages[currentPage].image;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [currentPage, pages]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.stroke();

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSavePage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL("image/png");
    const newPages = [...pages];
    newPages[currentPage] = {
      image: imageData,
      text: newPages[currentPage]?.text || "",
    };
    setPages(newPages);
  };

  const handleAddPage = () => {
    handleSavePage();
    setPages([...pages, { image: "", text: "" }]);
    setCurrentPage(pages.length);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleSavePage();
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      handleSavePage();
      setCurrentPage(currentPage + 1);
    } else {
      handleAddPage();
    }
  };

  const handleAudioRecorded = async (audioBlob: Blob) => {
    try {
      const audioRef = ref(
        storage,
        `stories/${userId}/${Date.now()}_audio.wav`
      );
      await uploadBytes(audioRef, audioBlob);
      const audioUrl = await getDownloadURL(audioRef);

      const newPages = [...pages];
      newPages[currentPage] = {
        ...newPages[currentPage],
        audioUrl,
      };
      setPages(newPages);
    } catch (error) {
      console.error("Ses kaydı yüklenirken hata:", error);
      alert("Ses kaydı yüklenirken bir hata oluştu.");
    }
  };

  const handleSaveStory = async () => {
    if (!title || !description || !genre || pages.length === 0) {
      alert("Lütfen tüm alanları doldurun ve en az bir sayfa ekleyin.");
      return;
    }

    handleSavePage();
    setIsSaving(true);

    try {
      const storyData = {
        title,
        description,
        genre,
        coverImage: pages[0].image,
        pages: pages.map((page) => ({
          imageUrl: page.image,
          text: page.text,
          audioUrl: page.audioUrl,
        })),
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        likes: 0,
        comments: [],
        status: "published",
      };

      const docRef = await addDoc(collection(db, "stories"), storyData);
      navigate(`/story/${docRef.id}`);
    } catch (error) {
      console.error("Error saving story:", error);
      alert("Hikaye kaydedilirken bir hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-8 shadow-lg">
          <div className="mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Hikaye Başlığı"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Hikaye Türü"
              className="w-full p-3 border border-gray-300 rounded-lg mt-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Hikaye Açıklaması"
              className="w-full p-3 border border-gray-300 rounded-lg mt-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="flex gap-4 mb-6">
            <DrawingTools
              color={color}
              setColor={setColor}
              brushSize={brushSize}
              setBrushSize={setBrushSize}
              onClear={handleClearCanvas}
            />
            <AudioRecorder onAudioRecorded={handleAudioRecorded} />
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="border-2 border-gray-300 rounded-lg bg-white"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                Önceki Sayfa
              </button>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Sonraki Sayfa
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-gray-600">
              Sayfa {currentPage + 1} / {pages.length || 1}
            </div>
            <button
              onClick={handleSaveStory}
              disabled={isSaving}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
            >
              {isSaving ? "Kaydediliyor..." : "Hikayeyi Kaydet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCreator;
