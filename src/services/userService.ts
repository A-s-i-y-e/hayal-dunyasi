import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";

export const userService = {
  // Kullanıcı oluşturma
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    const user = new User({
      ...userData,
      password: hashedPassword,
    });
    return await user.save();
  },

  // Kullanıcı girişi
  async login(email: string, password: string): Promise<IUser | null> {
    const user = await User.findOne({ email });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  },

  // Kullanıcı bilgilerini getirme
  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  },

  // Kullanıcı bilgilerini güncelleme
  async updateUser(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  },

  // Kullanıcı silme
  async deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return !!result;
  },
};
