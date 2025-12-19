
import React from 'react';
import { Mood } from '../types';

interface MoodButtonProps {
  mood: Mood;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

const MoodButton: React.FC<MoodButtonProps> = ({ mood, icon, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
        selected 
          ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105 border-2 border-blue-400' 
          : 'bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50'
      }`}
    >
      <span className="text-4xl mb-3">{icon}</span>
      <span className="text-sm font-medium text-slate-200">{mood}</span>
    </button>
  );
};

export default MoodButton;
