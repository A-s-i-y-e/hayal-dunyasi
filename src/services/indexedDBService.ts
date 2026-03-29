import { openDB } from "idb";

// Veritabanı adı ve versiyonu
const DB_NAME = "hayalDunyasi";
const DB_VERSION = 1;

// Veritabanını başlat
const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Çizimler için store
      if (!db.objectStoreNames.contains("drawings")) {
        db.createObjectStore("drawings");
      }
      // Ses kayıtları için store
      if (!db.objectStoreNames.contains("audio")) {
        db.createObjectStore("audio");
      }
      // Hikayeler için store
      if (!db.objectStoreNames.contains("stories")) {
        db.createObjectStore("stories");
      }
    },
  });
  return db;
};

// Çizim kaydetme
export const saveDrawing = async (drawingId: string, drawingData: Blob) => {
  try {
    const db = await initDB();
    await db.put("drawings", drawingData, drawingId);
    return true;
  } catch (error) {
    console.error("Çizim kaydetme hatası:", error);
    return false;
  }
};

// Çizim getirme
export const getDrawing = async (drawingId: string) => {
  try {
    const db = await initDB();
    return await db.get("drawings", drawingId);
  } catch (error) {
    console.error("Çizim getirme hatası:", error);
    return null;
  }
};

// Ses kaydetme
export const saveAudio = async (audioId: string, audioData: Blob) => {
  try {
    const db = await initDB();
    await db.put("audio", audioData, audioId);
    return true;
  } catch (error) {
    console.error("Ses kaydetme hatası:", error);
    return false;
  }
};

// Ses getirme
export const getAudio = async (audioId: string) => {
  try {
    const db = await initDB();
    return await db.get("audio", audioId);
  } catch (error) {
    console.error("Ses getirme hatası:", error);
    return null;
  }
};

// Hikaye kaydetme
export const saveStory = async (
  storyId: string,
  storyData: {
    title: string;
    content: string;
    drawingId: string;
    audioId: string;
    createdAt: number;
  }
) => {
  try {
    const db = await initDB();
    await db.put("stories", storyData, storyId);
    return true;
  } catch (error) {
    console.error("Hikaye kaydetme hatası:", error);
    return false;
  }
};

// Hikaye getirme
export const getStory = async (storyId: string) => {
  try {
    const db = await initDB();
    return await db.get("stories", storyId);
  } catch (error) {
    console.error("Hikaye getirme hatası:", error);
    return null;
  }
};

// Tüm hikayeleri getirme
export const getAllStories = async () => {
  try {
    const db = await initDB();
    return await db.getAll("stories");
  } catch (error) {
    console.error("Hikayeleri getirme hatası:", error);
    return [];
  }
};

// Veri silme
export const deleteData = async (storeName: string, id: string) => {
  try {
    const db = await initDB();
    await db.delete(storeName, id);
    return true;
  } catch (error) {
    console.error("Veri silme hatası:", error);
    return false;
  }
};
