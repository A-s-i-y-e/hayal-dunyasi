import Story, { IStory } from "../models/Story";

export const storyService = {
  // Hikaye oluşturma
  async createStory(storyData: Partial<IStory>): Promise<IStory> {
    const story = new Story(storyData);
    return await story.save();
  },

  // Hikaye getirme
  async getStoryById(id: string): Promise<IStory | null> {
    return await Story.findById(id).populate("authorId", "username");
  },

  // Kullanıcının hikayelerini getirme
  async getUserStories(userId: string): Promise<IStory[]> {
    return await Story.find({ authorId: userId }).sort({ createdAt: -1 });
  },

  // Hikaye güncelleme
  async updateStory(
    id: string,
    updateData: Partial<IStory>
  ): Promise<IStory | null> {
    return await Story.findByIdAndUpdate(id, updateData, { new: true });
  },

  // Hikaye silme
  async deleteStory(id: string): Promise<boolean> {
    const result = await Story.findByIdAndDelete(id);
    return !!result;
  },

  // Hikaye listesi (public hikayeler)
  async getPublicStories(): Promise<IStory[]> {
    return await Story.find({ isPublic: true })
      .populate("authorId", "username")
      .sort({ createdAt: -1 });
  },
};
