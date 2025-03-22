import React, { useState, useRef } from "react";
import firebaseService from "../services/firebase";

interface ProfilePictureProps {
  user: any; // Firebase User tipini kullanabilirsiniz
  currentPhotoURL?: string;
  onUploadSuccess?: (url: string) => void;
  onUploadError?: (error: any) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  user,
  currentPhotoURL,
  onUploadSuccess,
  onUploadError,
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    currentPhotoURL
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Dosya önizleme
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Dosya yükleme
    try {
      setUploading(true);
      const downloadURL = await firebaseService.uploadProfilePicture(
        user,
        file
      );
      onUploadSuccess?.(downloadURL);
    } catch (error) {
      console.error("Profil resmi yüklenirken hata:", error);
      onUploadError?.(error);
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group"
        onClick={handleClick}
      >
        {/* Profil Resmi */}
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profil"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-4xl">👤</span>
          </div>
        )}

        {/* Hover Efekti */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm">Değiştir</span>
        </div>

        {/* Yükleme Göstergesi */}
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Gizli Dosya Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ProfilePicture;
