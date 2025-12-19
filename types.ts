
export enum Mood {
  // Negative / Challenging
  SAD = 'Buồn bã',
  ANXIOUS = 'Lo lắng',
  TIRED = 'Mệt mỏi',
  LOST = 'Mất phương hướng',
  ANGRY = 'Tức giận',
  UNINSPIRED = 'Thiếu ý tưởng',
  LONELY = 'Cô đơn',
  BORED = 'Chán nản',
  OVERWHELMED = 'Quá tải',
  FEARFUL = 'Sợ hãi',
  STRESSED = 'Căng thẳng',
  INSECURE = 'Tự ti',
  JEALOUS = 'Ghen tị',
  REGRETFUL = 'Hối hận',
  GUILTY = 'Tội lỗi',
  ASHAMED = 'Xấu hổ',
  DISAPPOINTED = 'Thất vọng',
  BURNED_OUT = 'Kiệt sức',
  
  // Positive / Empowering
  HAPPY = 'Hạnh phúc',
  CONFIDENT = 'Tự tin',
  GRATEFUL = 'Biết ơn',
  EXCITED = 'Hào hứng',
  PEACEFUL = 'Bình yên',
  PRODUCTIVE = 'Năng suất',
  HOPEFUL = 'Hy vọng',
  LOVED = 'Được yêu thương',
  
  // Neutral / Complex
  CURIOUS = 'Tò mò',
  NOSTALGIC = 'Hoài niệm',
  CONFUSED = 'Bối rối',
  CALM = 'Điềm tĩnh'
}

export interface MoodEntry {
  id: string;
  mood: Mood;
  timestamp: number;
}

export interface MotivationOption {
  id: string;
  style: string;
  quote: string;
  imageUrl: string;
  description: string;
  imagePrompt?: string; // Optional prompt for late loading
}

export interface GeminiResponse {
  options: {
    style: string;
    quote: string;
    imagePrompt: string;
    description: string;
  }[];
}
