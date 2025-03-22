import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { storageService } from "./services/storageService";
import { syncService } from "./services/syncService";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
