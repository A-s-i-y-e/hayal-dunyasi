import { db, storage } from "../firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const migrateToStorage = async () => {
  try {
    console.log("Migration başlıyor...");

    // Çizimleri getir
    const drawingsRef = collection(db, "drawings");
    const drawingsSnapshot = await getDocs(drawingsRef);
    console.log(`${drawingsSnapshot.size} çizim bulundu.`);

    for (const doc of drawingsSnapshot.docs) {
      const drawing = doc.data();
      console.log(`Çizim işleniyor: ${drawing.title || "İsimsiz Çizim"}`);

      try {
        // Çizim verisini yükle
        if (drawing.imageData) {
          console.log("Çizim yükleniyor...");
          const imageResponse = await fetch(drawing.imageData);
          const imageBlob = await imageResponse.blob();
          const imagePath = `drawings/${doc.id}.png`;
          const imageRef = ref(storage, imagePath);
          await uploadBytes(imageRef, imageBlob);
          const imageUrl = await getDownloadURL(imageRef);
          console.log("Çizim yüklendi:", imageUrl);

          // Firestore'u güncelle
          await updateDoc(doc.ref, {
            imageData: imageUrl,
          });
        }

        console.log(
          `Çizim başarıyla migrate edildi: ${drawing.title || "İsimsiz Çizim"}`
        );
      } catch (error) {
        console.error(
          `Çizim migrate edilirken hata: ${drawing.title || "İsimsiz Çizim"}`,
          error
        );
      }
    }

    console.log("Migration tamamlandı!");
    return true;
  } catch (error) {
    console.error("Migration sırasında hata:", error);
    throw error;
  }
};
