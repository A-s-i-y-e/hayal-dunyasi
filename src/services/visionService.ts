import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_VISION_API_KEY;
const VISION_API_URL = "https://vision.googleapis.com/v1/images:annotate";

const QUICKDRAW_CATEGORIES = [
  "airplane",
  "ambulance",
  "angel",
  "ant",
  "apple",
  "backpack",
  "banana",
  "basketball",
  "bicycle",
  "bird",
  "book",
  "bowtie",
  "bridge",
  "bus",
  "butterfly",
  "cactus",
  "cake",
  "camera",
  "car",
  "cat",
  "chair",
  "cloud",
  "coffee cup",
  "crown",
  "diamond",
  "dog",
  "dolphin",
  "donut",
  "dragon",
  "duck",
  "elephant",
  "eye",
  "face",
  "fire truck",
  "fish",
  "flower",
  "frog",
  "giraffe",
  "guitar",
  "hamburger",
  "heart",
  "helicopter",
  "house",
  "ice cream",
  "key",
  "ladder",
  "laptop",
  "leaf",
  "light bulb",
  "lollipop",
  "moon",
  "mountain",
  "mouse",
  "mushroom",
  "octopus",
  "palm tree",
  "panda",
  "parrot",
  "pencil",
  "penguin",
  "pizza",
  "rainbow",
  "rhinoceros",
  "sailboat",
  "sandwich",
  "scissors",
  "shark",
  "sheep",
  "skateboard",
  "smiley face",
  "snake",
  "snowflake",
  "snowman",
  "spider",
  "star",
  "strawberry",
  "sun",
  "sword",
  "t-shirt",
  "teddy-bear",
  "tiger",
  "tree",
  "umbrella",
  "van",
  "violin",
  "watermelon",
  "whale",
  "windmill",
  "wine bottle",
  "zebra",
];

type CategoryType = "macera" | "bilim-kurgu" | "fantastik" | "masal";

interface CategoryMapping {
  [key: string]: CategoryType;
}

const QUICKDRAW_CATEGORY_MAPPING: CategoryMapping = {
  // Macera kategorisi
  "dragon-macera": "macera",
  sword: "macera",
  castle: "macera",
  knight: "macera",
  treasure: "macera",
  pirate: "macera",
  ship: "macera",
  mountain: "macera",
  cave: "macera",
  forest: "macera",

  // Bilim Kurgu kategorisi
  rocket: "bilim-kurgu",
  robot: "bilim-kurgu",
  alien: "bilim-kurgu",
  spaceship: "bilim-kurgu",
  ufo: "bilim-kurgu",
  astronaut: "bilim-kurgu",
  planet: "bilim-kurgu",
  laser: "bilim-kurgu",
  "time machine": "bilim-kurgu",
  "flying saucer": "bilim-kurgu",

  // Fantastik kategorisi
  unicorn: "fantastik",
  fairy: "fantastik",
  "magic wand": "fantastik",
  "dragon-fantastik": "fantastik",
  phoenix: "fantastik",
  mermaid: "fantastik",
  wizard: "fantastik",
  "magic castle": "fantastik",
  "magic potion": "fantastik",
  "magic book": "fantastik",

  // Masal kategorisi
  princess: "masal",
  prince: "masal",
  "fairy tale": "masal",
  "magic mirror": "masal",
  "magic lamp": "masal",
  "magic carpet": "masal",
  "magic bean": "masal",
  "magic key": "masal",
  "magic door": "masal",
  "magic garden": "masal",
};

interface StoryElements {
  characters: string[];
  setting: string;
  plot: string;
}

interface DrawingAnalysis {
  category: CategoryType;
  confidence: number;
  similarDrawings: string[];
  elements: StoryElements;
}

export const visionService = {
  async analyzeImage(imageData: string): Promise<DrawingAnalysis> {
    try {
      console.log("Çizim analizi başlatılıyor...");

      // Base64 formatındaki resmi temizle
      const base64Image = imageData.replace(/^data:image\/\w+;base64,/, "");
      console.log("Base64 resim hazırlandı");

      // Google Cloud Vision API'ye istek at
      console.log("Vision API isteği gönderiliyor...");
      const response = await axios.post(
        `${VISION_API_URL}?key=${API_KEY}`,
        {
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: "LABEL_DETECTION",
                  maxResults: 10,
                },
                {
                  type: "OBJECT_LOCALIZATION",
                  maxResults: 10,
                },
                {
                  type: "IMAGE_PROPERTIES",
                  maxResults: 10,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Vision API yanıtı alındı:", response.data);

      if (!response.data.responses?.[0]) {
        console.error("API yanıtı geçersiz:", response.data);
        throw new Error("API geçerli bir yanıt döndürmedi");
      }

      const visionResults = response.data.responses[0];
      console.log("Vision sonuçları:", visionResults);

      // Etiketleri ve nesneleri al
      const labels = visionResults.labelAnnotations || [];
      const objects = visionResults.localizedObjectAnnotations || [];

      console.log("Tespit edilen etiketler:", labels);
      console.log("Tespit edilen nesneler:", objects);

      // En yüksek güvenilirlik skoruna sahip etiketleri al
      const topLabels = labels
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 5);

      console.log("En iyi etiketler:", topLabels);

      // Quick Draw kategorileriyle eşleştirme yap
      const matches = this.findQuickDrawMatches(topLabels, objects);
      console.log("Quick Draw eşleşmeleri:", matches);

      if (matches.length === 0) {
        console.log("Hiç eşleşme bulunamadı, varsayılan kategori kullanılıyor");
        return {
          category: "masal",
          confidence: 0,
          similarDrawings: [],
          elements: this.generateStoryElements("masal", []),
        };
      }

      // En uygun kategoriyi belirle
      const bestMatch = matches[0];
      const category =
        QUICKDRAW_CATEGORY_MAPPING[bestMatch.category] || "masal";

      console.log("Seçilen kategori:", category);

      // Benzer çizimleri al
      const similarDrawings = matches.map((match) => match.category);

      console.log("Benzer çizimler:", similarDrawings);

      // Hikaye önerileri oluştur
      const elements = this.generateStoryElements(
        bestMatch.category,
        similarDrawings
      );

      console.log("Oluşturulan hikaye önerileri:", elements);

      return {
        category,
        confidence: bestMatch.score,
        similarDrawings,
        elements,
      };
    } catch (error) {
      console.error("Çizim analizi sırasında hata:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Hatası:", error.response?.data);
        console.error("API Hata Detayları:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          headers: error.response?.headers,
          data: error.response?.data,
        });
        throw new Error(
          `API Hatası: ${error.response?.data?.error?.message || error.message}`
        );
      }
      throw new Error("Çizim analiz edilemedi");
    }
  },

  findQuickDrawMatches(
    labels: any[],
    objects: any[]
  ): Array<{ category: string; score: number }> {
    const matches: Array<{ category: string; score: number }> = [];

    // Etiketleri Quick Draw kategorileriyle eşleştir
    labels.forEach((label) => {
      const quickDrawMatch = QUICKDRAW_CATEGORIES.find(
        (category) =>
          this.calculateSimilarity(label.description.toLowerCase(), category) >
          0.7
      );

      if (quickDrawMatch) {
        matches.push({
          category: quickDrawMatch,
          score: label.score,
        });
      }
    });

    // Nesneleri Quick Draw kategorileriyle eşleştir
    objects.forEach((obj) => {
      const quickDrawMatch = QUICKDRAW_CATEGORIES.find(
        (category) =>
          this.calculateSimilarity(obj.name.toLowerCase(), category) > 0.7
      );

      if (quickDrawMatch) {
        matches.push({
          category: quickDrawMatch,
          score: obj.score,
        });
      }
    });

    // Tekrarlanan kategorileri birleştir ve en yüksek skorları al
    const uniqueMatches = matches.reduce(
      (acc: { [key: string]: number }, match) => {
        if (!acc[match.category] || acc[match.category] < match.score) {
          acc[match.category] = match.score;
        }
        return acc;
      },
      {}
    );

    // Sonuçları skorlarına göre sırala
    return Object.entries(uniqueMatches)
      .map(([category, score]) => ({ category, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  },

  calculateSimilarity(str1: string, str2: string): number {
    // Basit bir benzerlik hesaplama fonksiyonu
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);

    const commonWords = words1.filter((word) => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  },

  generateStoryElements(
    category: string,
    similarDrawings: string[]
  ): StoryElements {
    const elements: StoryElements = {
      characters: [],
      setting: "",
      plot: "",
    };

    // Karakterleri belirle
    elements.characters = similarDrawings
      .filter((drawing) => this.isCharacter(drawing))
      .map((drawing) => this.formatCharacterName(drawing));

    // Mekanı belirle
    elements.setting = this.determineSetting(category, similarDrawings);

    // Hikaye özetini oluştur
    elements.plot = this.generatePlot(
      category,
      elements.characters,
      elements.setting
    );

    return elements;
  },

  isCharacter(drawing: string): boolean {
    const characterDrawings = [
      "person",
      "animal",
      "bird",
      "fish",
      "dragon",
      "robot",
      "alien",
      "princess",
      "prince",
      "wizard",
      "knight",
      "pirate",
    ];
    return characterDrawings.includes(drawing);
  },

  formatCharacterName(drawing: string): string {
    return drawing.charAt(0).toUpperCase() + drawing.slice(1);
  },

  determineSetting(category: string, similarDrawings: string[]): string {
    const settings: Record<CategoryType, string> = {
      macera: "Heyecan dolu bir macera dünyası",
      "bilim-kurgu": "Geleceğin teknolojik dünyası",
      fantastik: "Büyülü bir fantastik dünya",
      masal: "Masalsı bir diyar",
    };

    return settings[category as CategoryType] || "Bilinmeyen bir dünya";
  },

  generatePlot(
    category: string,
    characters: string[],
    setting: string
  ): string {
    const plots: Record<CategoryType, string> = {
      macera: `${characters.join(
        " ve "
      )} ${setting}'da heyecan dolu bir maceraya atılıyor. Yollarında karşılaştıkları zorluklar ve keşifler onları bekliyor.`,
      "bilim-kurgu": `${characters.join(
        " ve "
      )} ${setting}'da teknolojik bir maceraya çıkıyor. Geleceğin sırlarını keşfetmeye çalışırken beklenmedik olaylarla karşılaşıyorlar.`,
      fantastik: `${characters.join(
        " ve "
      )} ${setting}'da büyülü bir yolculuğa çıkıyor. Sihirli güçler ve efsanevi yaratıklarla dolu bu dünyada macera onları bekliyor.`,
      masal: `${characters.join(
        " ve "
      )} ${setting}'da masalsı bir maceraya atılıyor. Konuşan hayvanlar ve büyülü nesnelerle dolu bu dünyada unutulmaz bir hikaye yaşıyorlar.`,
    };

    return plots[category as CategoryType] || "Bilinmeyen bir hikaye";
  },
};
