import axios from "axios";

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1";

class OpenAIService {
  async analyzeDrawing(imageData: string): Promise<any> {
    try {
      // Base64 formatındaki resmi temizle
      const base64Image = imageData.replace(/^data:image\/\w+;base64,/, "");

      const payload = {
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Bu çocuk çizimini analiz et. Çizimde ne görüyorsun? Renkler, şekiller, nesneler ve genel kompozisyon hakkında detaylı bilgi ver. Çocuk ne anlatmak istemiş olabilir? Çocuklar için uygun bir dil kullan.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/png;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      };

      // İlk aşama: Çizimi analiz et
      const analysisResponse = await axios.post(
        `${OPENAI_API_URL}/chat/completions`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const analysis = analysisResponse.data.choices[0].message.content;

      // İkinci aşama: Analiz sonucuna göre hikaye oluştur
      const storyResponse = await axios.post(
        `${OPENAI_API_URL}/chat/completions`,
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "Sen çocuklar için hikayeler yazan yaratıcı bir yazarsın. Çizim analizine dayanarak eğlenceli ve eğitici hikayeler oluşturursun.",
            },
            {
              role: "user",
              content: `Bu çizim analizine dayanarak çocuklar için kısa bir hikaye oluştur: ${analysis}`,
            },
          ],
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        analysis: analysis,
        story: storyResponse.data.choices[0].message.content,
      };
    } catch (error: any) {
      console.error(
        "OpenAI API Hatası:",
        error.response?.data || error.message
      );
      throw new Error(
        "Çizim analizi sırasında bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  }
}

export const openaiService = new OpenAIService();
