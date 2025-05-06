import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  getDoc,
  doc,
  serverTimestamp,
  QueryConstraint,
  limit as firestoreLimit,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config";

export interface Story {
  id?: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  content: string;
  date: string;
  genre: string;
  readingTime: string;
  userId?: string;
  pages: { imageUrl: string; text: string }[];
  createdAt: any;
  updatedAt: any;
}

export const storyService = {
  // Yeni hikaye oluştur
  async createStory(
    title: string,
    description: string,
    pages: { image: string; text: string }[],
    userId: string
  ): Promise<string> {
    try {
      // Save images to storage
      const imageUrls = await Promise.all(
        pages.map(async (page) => {
          const imageRef = ref(
            storage,
            `stories/${userId}/${Date.now()}_${Math.random()}`
          );
          const response = await fetch(page.image);
          const blob = await response.blob();
          await uploadBytes(imageRef, blob);
          return getDownloadURL(imageRef);
        })
      );

      // Save story to Firestore
      const storyData = {
        title,
        description,
        pages: pages.map((page, index) => ({
          imageUrl: imageUrls[index],
          text: page.text,
        })),
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "stories"), storyData);
      return docRef.id;
    } catch (error) {
      console.error("Hikaye oluşturulurken hata:", error);
      throw error;
    }
  },

  // Son eklenen hikayeleri getir
  async getLatestStories(limit: number = 10): Promise<Story[]> {
    try {
      const storiesRef = collection(db, "stories");
      const q = query(
        storiesRef,
        orderBy("date", "desc"),
        firestoreLimit(limit)
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Story[];
    } catch (error) {
      console.error("Hikayeler getirilirken hata:", error);
      throw error;
    }
  },

  // Tek bir hikayeyi getir
  async getStoryById(storyId: string): Promise<Story | null> {
    try {
      const storyDoc = await getDoc(doc(db, "stories", storyId));
      if (storyDoc.exists()) {
        return {
          id: storyDoc.id,
          ...storyDoc.data(),
        } as Story;
      }
      return null;
    } catch (error) {
      console.error("Error fetching story:", error);
      throw error;
    }
  },

  // Kullanıcının hikayelerini getirme
  async getUserStories(userId: string): Promise<Story[]> {
    // This method is not provided in the new implementation
    throw new Error("Method not implemented");
  },

  // Hikaye güncelleme
  async updateStory(
    id: string,
    updateData: Partial<Story>
  ): Promise<Story | null> {
    // This method is not provided in the new implementation
    throw new Error("Method not implemented");
  },

  // Hikaye silme
  async deleteStory(id: string): Promise<boolean> {
    // This method is not provided in the new implementation
    throw new Error("Method not implemented");
  },

  // Hikaye listesi (public hikayeler)
  async getPublicStories(): Promise<Story[]> {
    // This method is not provided in the new implementation
    throw new Error("Method not implemented");
  },

  async getStories(limitCount: number = 10): Promise<Story[]> {
    try {
      const storiesRef = collection(db, "stories");
      const q = query(
        storiesRef,
        orderBy("createdAt", "desc"),
        firestoreLimit(limitCount)
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Story[];
    } catch (error) {
      console.error("Error fetching stories:", error);
      throw error;
    }
  },
};
