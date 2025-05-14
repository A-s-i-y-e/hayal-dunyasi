import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

class AIService {
  private model: mobilenet.MobileNet | null = null;
  private isModelLoaded: boolean = false;
  private isLoading: boolean = false;

  async loadModel() {
    if (this.isLoading) {
      console.log("Model yükleme işlemi devam ediyor, bekleniyor...");
      return;
    }

    try {
      console.log("1. Model yükleme başladı...");
      this.isLoading = true;

      if (!this.isModelLoaded) {
        console.log("2. Model henüz yüklenmemiş, yükleniyor...");

        // TensorFlow.js'i başlat
        console.log("2.1. TensorFlow.js başlatılıyor...");
        await tf.ready();
        console.log("2.2. TensorFlow.js hazır");

        // Modeli yükle
        console.log("2.3. MobileNet modeli yükleniyor...");
        this.model = await mobilenet.load();
        console.log("2.4. MobileNet modeli yüklendi");

        this.isModelLoaded = true;
        console.log("3. Model başarıyla yüklendi!");
      } else {
        console.log("2. Model zaten yüklü, tekrar yüklemeye gerek yok.");
      }
    } catch (error) {
      console.error("❌ Model yükleme hatası:", error);
      this.isModelLoaded = false;
      this.model = null;
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async analyzeDrawing(imageElement: HTMLImageElement) {
    try {
      console.log("1. Çizim analizi başladı...");

      if (!this.model) {
        console.log("2. Model yüklü değil, yükleniyor...");
        await this.loadModel();
      }

      if (!this.model) {
        throw new Error("Model yüklenemedi!");
      }

      console.log("3. Görüntü analiz ediliyor...");
      console.log(
        "3.1. Görüntü boyutları:",
        imageElement.width,
        "x",
        imageElement.height
      );

      // Görüntüyü tensor'a dönüştür
      console.log("3.2. Görüntü tensor'a dönüştürülüyor...");
      const tensor = tf.browser.fromPixels(imageElement);
      console.log("3.3. Tensor oluşturuldu:", tensor.shape);

      // Analiz yap
      console.log("3.4. Model analiz yapıyor...");
      const predictions = await this.model.classify(imageElement);
      console.log("4. Analiz sonuçları:", predictions);

      // Tensor'ı temizle
      tensor.dispose();
      console.log("5. Tensor temizlendi");

      return predictions;
    } catch (error) {
      console.error("❌ Çizim analizi hatası:", error);
      throw error;
    }
  }

  async generateStoryPrompt(drawingAnalysis: any[]) {
    try {
      console.log("1. Hikaye başlangıcı oluşturuluyor...");

      if (!drawingAnalysis || drawingAnalysis.length === 0) {
        throw new Error("Analiz sonuçları boş!");
      }

      // En yüksek güvenilirlikli tahmini al
      const topPrediction = drawingAnalysis[0];
      console.log("2. En iyi tahmin:", topPrediction);

      // Basit bir hikaye başlangıcı oluştur
      const storyPrompt = `Bir zamanlar bir ${topPrediction.className} vardı...`;
      console.log("3. Oluşturulan hikaye başlangıcı:", storyPrompt);

      return storyPrompt;
    } catch (error) {
      console.error("❌ Hikaye başlangıcı oluşturma hatası:", error);
      throw error;
    }
  }

  async suggestStoryElements(drawingAnalysis: any[]) {
    try {
      console.log("1. Hikaye elementleri öneriliyor...");

      if (!drawingAnalysis || drawingAnalysis.length === 0) {
        throw new Error("Analiz sonuçları boş!");
      }

      // Çizim analizine göre hikaye elementleri öner
      const suggestions = {
        characters: drawingAnalysis.slice(0, 3).map((pred) => pred.className),
        setting: "Harika bir orman",
        plot: "Macera dolu bir yolculuk",
      };

      console.log("2. Önerilen elementler:", suggestions);
      return suggestions;
    } catch (error) {
      console.error("❌ Hikaye elementleri önerme hatası:", error);
      throw error;
    }
  }
}

export const aiService = new AIService();
