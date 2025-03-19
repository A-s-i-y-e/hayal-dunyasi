import { storageService } from "./storageService";
import { storyService } from "./storyService";

interface SyncQueue {
  id: string;
  type: "create" | "update" | "delete";
  data: any;
  timestamp: number;
}

export const syncService = {
  // Senkronizasyon kuyruğunu kaydetme
  async addToSyncQueue(item: Omit<SyncQueue, "timestamp">): Promise<void> {
    try {
      const queue = await this.getSyncQueue();
      queue.push({
        ...item,
        timestamp: Date.now(),
      });
      await storageService.setItem("syncQueue", queue);
    } catch (error) {
      console.error("Senkronizasyon kuyruğuna ekleme hatası:", error);
      throw error;
    }
  },

  // Senkronizasyon kuyruğunu alma
  async getSyncQueue(): Promise<SyncQueue[]> {
    try {
      return (await storageService.getItem<SyncQueue[]>("syncQueue")) || [];
    } catch (error) {
      console.error("Senkronizasyon kuyruğunu alma hatası:", error);
      return [];
    }
  },

  // Senkronizasyon kuyruğunu temizleme
  async clearSyncQueue(): Promise<void> {
    try {
      await storageService.setItem("syncQueue", []);
    } catch (error) {
      console.error("Senkronizasyon kuyruğunu temizleme hatası:", error);
      throw error;
    }
  },

  // Senkronizasyon işlemini başlatma
  async sync(): Promise<void> {
    try {
      const queue = await this.getSyncQueue();

      for (const item of queue) {
        switch (item.type) {
          case "create":
            await storyService.createStory(item.data);
            break;
          case "update":
            await storyService.updateStory(item.data.id, item.data);
            break;
          case "delete":
            await storyService.deleteStory(item.data.id);
            break;
        }
      }

      await this.clearSyncQueue();
    } catch (error) {
      console.error("Senkronizasyon hatası:", error);
      throw error;
    }
  },
};
