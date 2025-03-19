import localforage from "localforage";

// LocalForage yapılandırması
localforage.config({
  name: "hayalDunyasi",
  storeName: "hayalDunyasiDB",
  description: "Hayal Dünyası uygulaması için yerel depolama",
});

export const storageService = {
  // Veri kaydetme
  async setItem(key: string, value: any): Promise<void> {
    try {
      await localforage.setItem(key, value);
    } catch (error) {
      console.error("Veri kaydetme hatası:", error);
      throw error;
    }
  },

  // Veri okuma
  async getItem<T>(key: string): Promise<T | null> {
    try {
      return await localforage.getItem<T>(key);
    } catch (error) {
      console.error("Veri okuma hatası:", error);
      throw error;
    }
  },

  // Veri silme
  async removeItem(key: string): Promise<void> {
    try {
      await localforage.removeItem(key);
    } catch (error) {
      console.error("Veri silme hatası:", error);
      throw error;
    }
  },

  // Tüm verileri temizleme
  async clear(): Promise<void> {
    try {
      await localforage.clear();
    } catch (error) {
      console.error("Veri temizleme hatası:", error);
      throw error;
    }
  },
};
