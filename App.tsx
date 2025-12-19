
import React, { useState, useEffect } from 'react';
import { Mood, MotivationOption, MoodEntry } from './types';
import { generateMotivationContent, getFastImageUrl } from './services/geminiService';
import MoodButton from './components/MoodButton';
import MotivationCard from './components/MotivationCard';
import MoodHistory from './components/MoodHistory';
import { Sparkles, ArrowLeft, AlertCircle, Zap } from 'lucide-react';

const MOODS = [
  { mood: Mood.SAD, icon: '😔' },
  { mood: Mood.ANXIOUS, icon: '😰' },
  { mood: Mood.TIRED, icon: '😴' },
  { mood: Mood.LOST, icon: '📉' },
  { mood: Mood.ANGRY, icon: '😤' },
  { mood: Mood.UNINSPIRED, icon: '💡' },
  { mood: Mood.LONELY, icon: '👤' },
  { mood: Mood.BORED, icon: '😐' },
  { mood: Mood.OVERWHELMED, icon: '🌊' },
  { mood: Mood.FEARFUL, icon: '😨' },
  { mood: Mood.STRESSED, icon: '😫' },
  { mood: Mood.HAPPY, icon: '✨' },
  { mood: Mood.CONFIDENT, icon: '🦁' },
  { mood: Mood.GRATEFUL, icon: '🙏' },
  { mood: Mood.EXCITED, icon: '🚀' },
  { mood: Mood.PEACEFUL, icon: '🍃' },
  { mood: Mood.PRODUCTIVE, icon: '🐝' },
  { mood: Mood.HOPEFUL, icon: '🌅' },
  { mood: Mood.LOVED, icon: '❤️' },
  { mood: Mood.CURIOUS, icon: '🧐' },
  { mood: Mood.NOSTALGIC, icon: '📻' },
  { mood: Mood.CONFUSED, icon: '🌀' },
  { mood: Mood.CALM, icon: '🧘' }
];

const STORAGE_KEY_HISTORY = 'zenpulse_mood_history';

const App: React.FC = () => {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<MotivationOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    } catch (e) { console.error(e); }

    const checkKey = () => {
      // @ts-ignore
      const envKey = (import.meta as any).env?.VITE_API_KEY || (typeof process !== 'undefined' ? process.env.API_KEY : '');
      if (envKey && envKey !== "undefined" && envKey !== "") {
        setIsConfigured(true);
      } else {
        setIsConfigured(false);
      }
    };
    checkKey();
  }, []);

  const handleGenerate = async () => {
    if (!selectedMood) return;
    setLoading(true);
    setError(null);
    setOptions([]);

    try {
      const response = await generateMotivationContent(selectedMood);
      
      const finalOptions: MotivationOption[] = response.options.map((opt, idx) => ({
        id: `opt-${idx}-${Date.now()}`,
        style: opt.style,
        quote: opt.quote,
        imageUrl: getFastImageUrl(opt.imagePrompt || opt.style, idx),
        description: opt.description
      }));

      setOptions(finalOptions);
      setLoading(false);

      const newEntry: MoodEntry = { id: Date.now().toString(), mood: selectedMood, timestamp: Date.now() };
      const newHistory = [newEntry, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(newHistory));

    } catch (err: any) {
      console.error(err);
      setError(`Lỗi: ${err.message || "Kết nối thất bại. Vui lòng thử lại."}`);
      setLoading(false);
    }
  };

  if (isConfigured === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] text-white">
        <div className="max-w-xl w-full glass-panel p-10 rounded-[3rem] border border-blue-500/30 text-center shadow-[0_0_50px_rgba(30,58,138,0.5)]">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl font-bold mb-4">Thiếu API Key</h1>
          <p className="text-slate-400 mb-6">Bạn cần cung cấp API_KEY để ứng dụng hoạt động.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100 pb-32 selection:bg-blue-500/30">
      <div className="fixed inset-0 -z-10 bg-[#020617]">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] shadow-2xl shadow-blue-500/40 transform hover:rotate-12 transition-transform duration-500">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-7xl font-serif font-bold tracking-tight bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">
            ZenPulse
          </h1>
          <p className="text-slate-400 text-xl font-medium tracking-wide">Tưới mát tâm hồn bằng năng lượng tích cực</p>
        </header>

        {error && (
          <div className="mb-10 p-6 bg-red-900/20 border border-red-500/30 rounded-[2rem] text-red-200 flex items-center gap-4">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {!options.length && !loading ? (
          <div className="animate-reveal">
            <h2 className="text-2xl font-serif font-bold mb-10 text-center text-slate-300 tracking-wider uppercase">Tâm trạng của bạn lúc này?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-16">
              {MOODS.map((m) => (
                <MoodButton
                  key={m.mood}
                  mood={m.mood}
                  icon={m.icon}
                  selected={selectedMood === m.mood}
                  onClick={() => setSelectedMood(m.mood)}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                disabled={!selectedMood}
                onClick={handleGenerate}
                className={`group relative px-16 py-6 rounded-full font-bold text-2xl transition-all duration-500 flex items-center gap-4 overflow-hidden ${
                  selectedMood 
                    ? 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.4)] scale-100 hover:scale-105 active:scale-95' 
                    : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="relative z-10">Tiếp Năng Lượng</span>
                <Zap className={`w-6 h-6 relative z-10 transition-transform duration-500 group-hover:scale-125 ${selectedMood ? 'animate-bounce' : ''}`} />
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-8 animate-reveal">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin shadow-[0_0_40px_rgba(59,130,246,0.4)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-3xl font-serif italic text-white">Đang kiến tạo niềm tin...</p>
              <p className="text-slate-500 animate-pulse">Vũ trụ đang gửi gắm những điều tốt đẹp nhất đến bạn</p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => { setOptions([]); setSelectedMood(null); }} 
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-all hover:-translate-x-2 bg-slate-800/40 px-6 py-3 rounded-full border border-white/5"
              >
                <ArrowLeft className="w-5 h-5" /> Thay đổi cảm xúc
              </button>
              <div className="px-8 py-3 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 font-black tracking-widest uppercase text-sm shadow-glow-blue">
                {selectedMood}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {options.map((opt, idx) => (
                <MotivationCard key={opt.id} option={opt} index={idx} />
              ))}
            </div>
          </div>
        )}

        <MoodHistory 
          history={history} 
          onClear={() => { setHistory([]); localStorage.removeItem(STORAGE_KEY_HISTORY); }} 
          getIcon={(m) => MOODS.find(mood => mood.mood === m)?.icon || '✨'} 
        />
      </main>
    </div>
  );
};

export default App;
