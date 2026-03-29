import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const testMigration = async () => {
  try {
    console.log("Test migration başlıyor...");

    // Basit bir test resmi oluştur
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "purple";
      ctx.fillRect(0, 0, 100, 100);
    }

    // Canvas'ı blob'a çevir
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/png");
    });

    // Sadece bir test dosyası yükle
    const testPath = "images/covers/test_cover.png";
    console.log(`${testPath} yükleniyor...`);
    const storageRef = ref(storage, testPath);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    console.log(`${testPath} başarıyla yüklendi: ${url}`);

    console.log("Test migration tamamlandı!");
    return true;
  } catch (error) {
    console.error("Test migration sırasında hata:", error);
    throw error;
  }
};
