import React, { useEffect, useState } from "react";
import "./App.css";
import { storageService } from "./services/storageService";
import { syncService } from "./services/syncService";

function App() {
  const [testData, setTestData] = useState<string>("");
  const [syncStatus, setSyncStatus] = useState<string>("");

  useEffect(() => {
    // Test verisi kaydetme
    const saveTestData = async () => {
      try {
        await storageService.setItem("testKey", "Merhaba Hayal Dünyası!");
        console.log("Test verisi başarıyla kaydedildi");
      } catch (error) {
        console.error("Test verisi kaydedilemedi:", error);
      }
    };

    // Test verisi okuma
    const readTestData = async () => {
      try {
        const data = await storageService.getItem<string>("testKey");
        if (data) {
          setTestData(data);
          console.log("Test verisi başarıyla okundu:", data);
        }
      } catch (error) {
        console.error("Test verisi okunamadı:", error);
      }
    };

    saveTestData();
    readTestData();
  }, []);

  // Senkronizasyon testi
  const testSync = async () => {
    try {
      setSyncStatus("Senkronizasyon başlatılıyor...");

      // Test verisi ekleme
      await syncService.addToSyncQueue({
        id: "test-1",
        type: "create",
        data: {
          title: "Test Hikayesi",
          content: "Bu bir test hikayesidir.",
          authorId: "test-user",
          drawings: [],
        },
      });

      // Senkronizasyon işlemi
      await syncService.sync();

      setSyncStatus("Senkronizasyon başarılı!");
    } catch (error: any) {
      console.error("Senkronizasyon testi hatası:", error);
      setSyncStatus(
        "Senkronizasyon hatası: " + (error.message || "Bilinmeyen hata")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">H</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Hayal Dünyam</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Yapay Zeka Destekli Okul Öncesi Hikaye Oluşturma Platformu
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Çocukların hayal güçlerini geliştirmelerine yardımcı olan interaktif
            platform
          </p>
        </div>
      </main>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <h2 className="text-xl font-semibold mb-4">
                Yerel Depolama Testi
              </h2>
              <p className="text-gray-600">
                {testData
                  ? `Kaydedilen veri: ${testData}`
                  : "Veri yükleniyor..."}
              </p>

              <h2 className="text-xl font-semibold mb-4">
                Senkronizasyon Testi
              </h2>
              <button
                onClick={testSync}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Senkronizasyonu Test Et
              </button>
              {syncStatus && <p className="mt-2 text-gray-600">{syncStatus}</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
