
import React from 'react';
import { MoodEntry, Mood } from '../types';
import { History, Trash2, Clock, Calendar, TrendingUp } from 'lucide-react';

interface MoodHistoryProps {
  history: MoodEntry[];
  onClear: () => void;
  getIcon: (mood: Mood) => string;
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ history, onClear, getIcon }) => {
  if (history.length === 0) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Grouping history by date for better "progression" view
  const groupedHistory = history.slice().reverse();

  return (
    <div className="mt-20 opacity-0 animate-reveal" style={{ animationDelay: '900ms' }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-white leading-none mb-1">Nhật Ký Tâm Hồn</h3>
            <p className="text-slate-500 text-sm italic">Hành trình thấu hiểu bản thân qua thời gian</p>
          </div>
        </div>
        <button 
          onClick={onClear}
          className="flex items-center gap-2 text-slate-500 hover:text-red-400 transition-colors text-xs font-medium group bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700"
        >
          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> Xóa toàn bộ lịch sử
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="relative border-l-2 border-slate-800 ml-4 pl-10 space-y-10 py-4">
          {groupedHistory.map((entry, idx) => (
            <div key={entry.id} className="relative group">
              {/* Animated Dot on line */}
              <div className="absolute -left-[49px] top-2 w-6 h-6 rounded-full bg-slate-950 border-4 border-slate-800 group-hover:border-blue-500 transition-all duration-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              </div>
              
              <div className="glass-panel p-5 rounded-3xl hover:bg-slate-800/40 transition-all duration-300 group-hover:translate-x-2 border border-slate-800/50 card-glow">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:rotate-6 transition-transform">
                      {getIcon(entry.mood)}
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold mb-1 block">Tâm trạng</span>
                      <p className="text-xl text-white font-bold">{entry.mood}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 text-slate-400 text-sm bg-slate-900/50 px-3 py-1.5 rounded-full mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(entry.timestamp)}
                    </div>
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">
                      Ghi chép số #{history.length - idx}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodHistory;
