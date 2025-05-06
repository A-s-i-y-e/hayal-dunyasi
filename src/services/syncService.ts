import { storageService } from "./storageService";
import { storyService, Story } from "./storyService";

interface SyncQueue {
  id: string;
  type: "create" | "update" | "delete";
  data: {
    title: string;
    description: string;
    pages: { imageUrl: string; text: string }[];
    userId: string;
    id?: string;
  };
  timestamp: number;
}

interface SyncItem {
  type: "create" | "update" | "delete";
  data: {
    title?: string;
    description?: string;
    pages?: { imageUrl: string; text: string }[];
    userId?: string;
    id?: string;
  };
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
            if (
              !item.data.title ||
              !item.data.description ||
              !item.data.pages ||
              !item.data.userId
            ) {
              throw new Error("Missing required fields for story creation");
            }
            await storyService.createStory(
              item.data.title,
              item.data.description,
              item.data.pages.map((page) => ({
                image: page.imageUrl,
                text: page.text,
              })),
              item.data.userId
            );
            break;
          case "update":
            if (!item.data.id) {
              throw new Error("Missing story ID for update");
            }
            await storyService.updateStory(
              item.data.id,
              item.data as Partial<Story>
            );
            break;
          case "delete":
            if (!item.data.id) {
              throw new Error("Missing story ID for deletion");
            }
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

  async syncOfflineChanges(items: SyncItem[]): Promise<void> {
    try {
      for (const item of items) {
        switch (item.type) {
          case "create":
            if (
              !item.data.title ||
              !item.data.description ||
              !item.data.pages ||
              !item.data.userId
            ) {
              throw new Error("Missing required fields for story creation");
            }
            await storyService.createStory(
              item.data.title,
              item.data.description,
              item.data.pages.map((page) => ({
                image: page.imageUrl,
                text: page.text,
              })),
              item.data.userId
            );
            break;
          case "update":
            if (!item.data.id) {
              throw new Error("Missing story ID for update");
            }
            await storyService.updateStory(
              item.data.id,
              item.data as Partial<Story>
            );
            break;
          case "delete":
            if (!item.data.id) {
              throw new Error("Missing story ID for deletion");
            }
            await storyService.deleteStory(item.data.id);
            break;
        }
      }
    } catch (error) {
      console.error("Error syncing offline changes:", error);
      throw error;
    }
  },

  async saveOfflineChange(item: SyncItem): Promise<void> {
    try {
      const offlineItems = this.getOfflineItems();
      offlineItems.push(item);
      localStorage.setItem("offlineChanges", JSON.stringify(offlineItems));
    } catch (error) {
      console.error("Error saving offline change:", error);
      throw error;
    }
  },

  getOfflineItems(): SyncItem[] {
    try {
      const items = localStorage.getItem("offlineChanges");
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error("Error getting offline items:", error);
      return [];
    }
  },

  clearOfflineItems(): void {
    try {
      localStorage.removeItem("offlineChanges");
    } catch (error) {
      console.error("Error clearing offline items:", error);
    }
  },
};
