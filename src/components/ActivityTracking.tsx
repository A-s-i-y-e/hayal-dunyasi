import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../services/firebase";

interface Activity {
  id: string;
  type: "drawing" | "story";
  title: string;
  timestamp: Timestamp;
  imageUrl?: string;
  description?: string;
  userName?: string;
  genre?: string;
  readingTime?: string;
  likes?: number;
  views?: number;
  drawingData?: any;
  content?: string;
  pages?: { imageUrl: string; text: string }[];
  drawing?: any;
  hasAudio?: boolean;
  name?: string;
}

const ActivityTracking: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDrawings: 0,
    totalStories: 0,
    totalLikes: 0,
    totalViews: 0,
  });

  useEffect(() => {
    const fetchActivities = async () => {
      if (!auth.currentUser) return;

      try {
        const userId = auth.currentUser.uid;
        const activities: Activity[] = [];
        let totalLikes = 0;
        let totalViews = 0;

        // Hikayeleri getir
        const storiesQuery = query(
          collection(db, "stories"),
          where("userId", "==", userId)
        );
        const storiesSnapshot = await getDocs(storiesQuery);
        console.log("Hikayeler yüklendi:", storiesSnapshot.size);

        storiesSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Hikaye verisi:", data);

          activities.push({
            id: doc.id,
            type: "story",
            title: data.title || "İsimsiz Hikaye",
            timestamp: data.createdAt,
            description: data.content?.substring(0, 100) + "...",
            userName: data.author || "Anonim",
            genre: data.category,
            likes: data.likes || 0,
            views: data.views || 0,
            content: data.content,
            drawing: data.drawing,
            hasAudio: data.hasAudio || false,
            imageUrl: data.drawing?.imageData, // Çizim varsa onun imageData'sını kullan
            name: data.drawing?.name,
          });
          totalLikes += data.likes || 0;
          totalViews += data.views || 0;
        });

        // Çizimleri getir
        const drawingsQuery = query(
          collection(db, "drawings"),
          where("userId", "==", userId)
        );
        const drawingsSnapshot = await getDocs(drawingsQuery);
        console.log("Çizimler yüklendi:", drawingsSnapshot.size);

        drawingsSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Çizim verisi:", data);
          activities.push({
            id: doc.id,
            type: "drawing",
            title: data.name || data.title || "İsimsiz Çizim",
            timestamp: data.createdAt,
            imageUrl: data.imageData,
            userName: data.author || "Anonim",
            drawingData: data.drawing,
            likes: data.likes || 0,
            views: data.views || 0,
            description: data.description,
            name: data.name,
          });
          totalLikes += data.likes || 0;
          totalViews += data.views || 0;
        });

        // Tarihe göre sırala (en yeniden en eskiye)
        activities.sort((a, b) => {
          if (!a.timestamp || !b.timestamp) return 0;
          return b.timestamp.seconds - a.timestamp.seconds;
        });
        console.log("Sıralanmış aktiviteler:", activities);
        setActivities(activities);

        // İstatistikleri güncelle
        setStats({
          totalDrawings: drawingsSnapshot.size,
          totalStories: storiesSnapshot.size,
          totalLikes,
          totalViews,
        });
      } catch (error) {
        console.error("Aktiviteler yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getActivityTypeText = (type: "drawing" | "story") => {
    return type === "drawing" ? "çizim" : "hikaye";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* İstatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-purple-50 rounded-xl p-4">
          <div className="text-2xl mb-2">🎨</div>
          <div className="text-lg font-semibold text-gray-800">
            {stats.totalDrawings}
          </div>
          <div className="text-sm text-gray-600">Toplam Çizim</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-2xl mb-2">📚</div>
          <div className="text-lg font-semibold text-gray-800">
            {stats.totalStories}
          </div>
          <div className="text-sm text-gray-600">Toplam Hikaye</div>
        </div>
        <div className="bg-pink-50 rounded-xl p-4">
          <div className="text-2xl mb-2">❤️</div>
          <div className="text-lg font-semibold text-gray-800">
            {stats.totalLikes}
          </div>
          <div className="text-sm text-gray-600">Toplam Beğeni</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <div className="text-2xl mb-2">👁️</div>
          <div className="text-lg font-semibold text-gray-800">
            {stats.totalViews}
          </div>
          <div className="text-sm text-gray-600">Toplam Görüntülenme</div>
        </div>
      </div>

      {/* Aktivite Listesi */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Aktivite Geçmişi
        </h3>
        {activities.length === 0 ? (
          <p className="text-gray-600 text-center py-4">
            Henüz hiç aktivite bulunmuyor.
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {activity.type === "drawing" ? "🎨" : "📚"}
                    </div>
                    <div>
                      <span className="text-gray-800">
                        {activity.type === "story" &&
                        activity.drawing &&
                        activity.drawing.name
                          ? activity.drawing.name
                          : activity.type === "drawing" && activity.name
                          ? activity.name
                          : activity.title}
                      </span>
                      <span className="text-gray-500 ml-2">
                        {activity.type === "drawing" ? "çizimi" : "hikayesi"}{" "}
                        oluşturuldu
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(activity.timestamp)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTracking;
