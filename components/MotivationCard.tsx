
import React, { useState, useEffect } from 'react';
import { MotivationOption } from '../types';

interface MotivationCardProps {
  option: MotivationOption;
  index: number;
}

const MotivationCard: React.FC<MotivationCardProps> = ({ option, index }) => {
  const [imgState, setImgState] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (imgState === 'loading') setImgState('error'); 
    }, 4000);
    return () => clearTimeout(timer);
  }, [imgState]);

  const gradients = [
    'from-blue-600 via-indigo-900 to-slate-950',
    'from-purple-600 via-fuchsia-900 to-slate-950',
    'from-emerald-600 via-teal-900 to-slate-950',
    'from-rose-600 via-pink-900 to-slate-950'
  ];

  return (
    <div 
      className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-white/10 aspect-[3/4.5] flex flex-col justify-end cursor-pointer transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] animate-reveal shadow-2xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 z-0 bg-gradient-to-br transition-all duration-1000 ${gradients[index % gradients.length]}`}>
        {imgState !== 'error' && (
          <img 
            src={option.imageUrl} 
            alt={option.style} 
            onLoad={() => setImgState('loaded')}
            onError={() => setImgState('error')}
            className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
              imgState === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            } group-hover:scale-110`} 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
      </div>

      {imgState === 'loading' && (
        <div className="absolute top-4 right-4 z-30">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}

      <div className="absolute top-6 left-6 z-20">
        <div className="px-4 py-1.5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full shadow-xl">
          <span className="text-[10px] uppercase font-black text-white tracking-[0.2em] drop-shadow-md">
            {option.style}
          </span>
        </div>
      </div>

      <div className="relative p-8 z-10 space-y-4 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
        <div className={`h-1.5 rounded-full transition-all duration-500 group-hover:w-24 ${
          index % 4 === 0 ? 'bg-blue-400 w-12 shadow-[0_0_15px_rgba(96,165,250,0.6)]' :
          index % 4 === 1 ? 'bg-purple-400 w-12 shadow-[0_0_15px_rgba(192,132,252,0.6)]' :
          index % 4 === 2 ? 'bg-teal-400 w-12 shadow-[0_0_15px_rgba(45,212,191,0.6)]' :
          'bg-rose-400 w-12 shadow-[0_0_15px_rgba(251,113,133,0.6)]'
        }`} />
        
        <p className="font-serif text-2xl md:text-3xl text-white leading-tight italic drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
          "{option.quote}"
        </p>
        
        <div className="max-h-0 group-hover:max-h-40 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <p className="text-slate-100/90 text-sm leading-relaxed border-t border-white/10 pt-4 font-medium backdrop-blur-sm">
            {option.description}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none group-hover:border-white/20 transition-colors duration-500" />
    </div>
  );
};

export default MotivationCard;
