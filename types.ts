
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
  HEARTBROKEN = 'Thất tình',
  FRUSTRATED = 'Bực bội',
  HOPELESS = 'Tuyệt vọng',
  RESENTFUL = 'Phẫn nộ',
  APATHETIC = 'Thờ ơ',
  VULNERABLE = 'Dễ bị tổn thương',
  MISUNDERSTOOD = 'Bị hiểu lầm',
  REJECTED = 'Bị từ chối',
  ENVIOUS = 'Đố kỵ',
  EMPTY = 'Trống rỗng',
  DOUBTFUL = 'Nghi ngờ',
  INDECISIVE = 'Do dự',
  AWKWARD = 'Ngại ngùng',
  PRESSURE = 'Áp lực đồng lứa',
  
  // Positive / Empowering
  HAPPY = 'Hạnh phúc',
  CONFIDENT = 'Tự tin',
  GRATEFUL = 'Biết ơn',
  EXCITED = 'Hào hứng',
  PEACEFUL = 'Bình yên',
  PRODUCTIVE = 'Năng suất',
  HOPEFUL = 'Hy vọng',
  LOVED = 'Được yêu thương',
  DETERMINED = 'Quyết tâm',
  BRAVE = 'Can đảm',
  CREATIVE = 'Sáng tạo',
  ENERGETIC = 'Tràn đầy năng lượng',
  PROUD = 'Tự hào',
  AMBITIOUS = 'Tham vọng',
  CONTENT = 'Hài lòng',
  JOYFUL = 'Vui vẻ',
  OPTIMISTIC = 'Lạc quan',
  PLAYFUL = 'Ham chơi',
  APPRECIATED = 'Được trân trọng',
  FOCUSED = 'Tập trung',
  ZEN = 'Tĩnh tại',
  
  // Neutral / Complex
  CURIOUS = 'Tò mò',
  NOSTALGIC = 'Hoài niệm',
  CONFUSED = 'Bối rối',
  CALM = 'Điềm tĩnh',
  LAZY = 'Lười biếng',
  DISTRACTED = 'Xao nhãng'
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
  imagePrompt?: string; 
}

export interface GeminiResponse {
  options: {
    style: string;
    quote: string;
    imagePrompt: string;
    description: string;
  }[];
}
