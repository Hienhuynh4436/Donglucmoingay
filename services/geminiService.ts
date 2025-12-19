
import { GoogleGenAI, Type } from "@google/genai";
import { Mood, GeminiResponse } from "../types";

const getApiKey = () => {
  // @ts-ignore
  const key = (import.meta as any).env?.VITE_API_KEY || (typeof process !== 'undefined' ? process.env.API_KEY : '');
  return key || null;
};

export const generateMotivationContent = async (mood: Mood): Promise<GeminiResponse> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Bạn là chuyên gia tâm lý và truyền cảm hứng. 
  Tôi đang cảm thấy ${mood}. 
  Hãy tạo ra 4 thông điệp truyền động lực khác nhau.
  YÊU CẦU:
  1. Phong cách: Chữa lành, Mạnh mẽ, Triết lý, Hành động.
  2. Văn bản tiếng Việt thuần túy, súc tích.
  3. ImagePrompt: Chỉ trả về 1 số nguyên ngẫu nhiên từ 1 đến 1000.
  Trả về JSON chuẩn.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          options: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                style: { type: Type.STRING },
                quote: { type: Type.STRING },
                imagePrompt: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ['style', 'quote', 'imagePrompt', 'description']
            }
          }
        },
        required: ['options']
      }
    }
  });

  return JSON.parse(response.text.trim()) as GeminiResponse;
};

export const getFastImageUrl = (seed: string, index: number): string => {
  const safeSeed = seed || Math.floor(Math.random() * 1000).toString();
  return `https://picsum.photos/seed/${safeSeed}${index}/800/1200`;
};
