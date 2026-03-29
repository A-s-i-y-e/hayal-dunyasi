import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

class AIService {
  private model: mobilenet.MobileNet | null = null;
  private isModelLoaded: boolean = false;
  private isLoading: boolean = false;
  private loadPromise: Promise<void> | null = null;
  private readonly MODEL_LOAD_TIMEOUT = 30000; // 30 saniye

  private async loadModelWithTimeout(): Promise<mobilenet.MobileNet> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error("Model yükleme zaman aşımına uğradı"));
      }, this.MODEL_LOAD_TIMEOUT);

      mobilenet
        .load({
          version: 2,
          alpha: 1.0,
        })
        .then((model) => {
          clearTimeout(timeoutId);
          resolve(model);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }

  async loadModel() {
    // Eğer model zaten yüklenmişse, hemen dön
    if (this.isModelLoaded && this.model) {
      console.log("Model zaten yüklü, tekrar yüklemeye gerek yok.");
      return;
    }

    // Eğer yükleme işlemi devam ediyorsa, mevcut yükleme işlemini bekle
    if (this.loadPromise) {
      console.log("Model yükleme işlemi devam ediyor, bekleniyor...");
      return this.loadPromise;
    }

    // Yeni bir yükleme işlemi başlat
    this.loadPromise = (async () => {
      try {
        console.log("1. Model yükleme başladı...");
        this.isLoading = true;

        // TensorFlow.js'i başlat
        console.log("2.1. TensorFlow.js başlatılıyor...");
        await tf.ready();
        console.log("2.2. TensorFlow.js hazır");

        // Modeli yükle
        console.log("2.3. MobileNet modeli yükleniyor...");
        try {
          this.model = await this.loadModelWithTimeout();
          console.log("2.4. MobileNet modeli yüklendi");
        } catch (modelError: any) {
          console.error("❌ MobileNet modeli yüklenirken hata:", modelError);
          throw new Error(
            `MobileNet modeli yüklenemedi: ${
              modelError.message || "Bilinmeyen hata"
            }`
          );
        }

        // Model yüklendiğini işaretle
        this.isModelLoaded = true;
        console.log("3. Model başarıyla yüklendi!");
      } catch (error) {
        console.error("❌ Model yükleme hatası:", error);
        this.isModelLoaded = false;
        this.model = null;
        throw new Error(
          `Model yüklenemedi: ${
            error instanceof Error ? error.message : "Bilinmeyen hata"
          }`
        );
      } finally {
        this.isLoading = false;
        this.loadPromise = null;
      }
    })();

    return this.loadPromise;
  }

  async analyzeDrawing(imageElement: HTMLImageElement | HTMLCanvasElement) {
    try {
      console.log("1. Çizim analizi başladı...");

      if (!imageElement) {
        throw new Error("Görüntü elementi bulunamadı!");
      }

      // Model yüklü değilse yükle ve bekle
      if (!this.model) {
        console.log("2. Model yüklü değil, yükleniyor...");
        await this.loadModel();
      }

      if (!this.model) {
        throw new Error("Model yüklenemedi!");
      }

      console.log("3. Görüntü analiz ediliyor...");

      // Görüntü boyutlarını kontrol et
      const width =
        imageElement instanceof HTMLImageElement
          ? imageElement.width
          : imageElement.width;
      const height =
        imageElement instanceof HTMLImageElement
          ? imageElement.height
          : imageElement.height;

      console.log("3.1. Görüntü boyutları:", width, "x", height);

      if (width === 0 || height === 0) {
        throw new Error("Geçersiz görüntü boyutları!");
      }

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
    } catch (error: any) {
      console.error("❌ Çizim analizi hatası:", error);
      throw new Error(`Çizim analizi başarısız: ${error.message}`);
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
