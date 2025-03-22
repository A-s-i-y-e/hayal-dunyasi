import React, { useState } from "react";
import { User } from "firebase/auth";
import { uploadProfilePicture } from "../services/firebase";

interface ProfilePictureProps {
  user: User;
  photoURL: string | null;
  onPhotoUpdate: (url: string) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  user,
  photoURL,
  onPhotoUpdate,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const downloadURL = await uploadProfilePicture(user, file);
      onPhotoUpdate(downloadURL);
    } catch (error) {
      console.error("Profil resmi yüklenirken hata:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 group-hover:border-purple-500/50 transition-all duration-300">
        {photoURL ? (
          <img
            src={photoURL}
            alt="Profil"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-purple-500/20 flex items-center justify-center text-4xl">
            👤
          </div>
        )}
      </div>
      <label
        htmlFor="profile-picture"
        className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300 rounded-full"
      >
        {uploading ? (
          <span className="animate-pulse">Yükleniyor...</span>
        ) : (
          <span>Değiştir</span>
        )}
      </label>
      <input
        type="file"
        id="profile-picture"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
    </div>
  );
};

export default ProfilePicture;
