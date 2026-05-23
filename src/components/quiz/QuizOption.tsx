import React from 'react';
import { Check } from 'lucide-react';
import { QuizOptionType } from '../../data/quizData';

interface QuizOptionProps {
  option: QuizOptionType;
  selected: boolean;
  onClick: () => void;
  type?: 'default' | 'horizontal-grid' | 'vertical' | 'chip' | 'emotional' | 'difficulty';
}

export default function QuizOption({ option, selected, onClick, type = 'default' }: QuizOptionProps) {
  // 1. Grid lateral de Gênero (horizontais lado a lado)
  if (type === 'horizontal-grid') {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`relative flex flex-col items-center justify-center h-[140px] w-full rounded-2xl bg-white border-2 text-center transition-all duration-300 ${
          selected
            ? 'border-[#7B6FE8] bg-[#EEECFF] shadow-[0_4px_16px_rgba(123,111,232,0.15)]'
            : 'border-[#E5E7EB] hover:border-[#7B6FE8]/40 hover:bg-slate-50/50 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
        }`}
      >
        {selected && (
          <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#7B6FE8] flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5" />
          </div>
        )}
        <span className="text-4xl mb-2 select-none">{option.icon}</span>
        <span className="font-semibold text-[#1A1A2E] text-base">{option.label}</span>
      </button>
    );
  }

  // 2. Chip de multi-seleção
  if (type === 'chip') {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 border-2 ${
          selected
            ? 'border-[#7B6FE8] bg-[#EEECFF] text-[#1A1A2E] font-semibold'
            : 'border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#7B6FE8]/40'
        }`}
      >
        <span className="text-lg select-none">{option.icon}</span>
        <span className="flex-1 text-left">{option.label}</span>
        <div
          className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all ${
            selected ? 'bg-[#7B6FE8] border-[#7B6FE8] text-white' : 'border-[#D1D5DB] bg-white'
          }`}
        >
          {selected && <Check className="w-3 h-3" />}
        </div>
      </button>
    );
  }

  // 3. Card com dificuldade/estratégia (ex: Pergunta 12)
  if (type === 'difficulty') {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`relative flex flex-col p-4.5 rounded-2xl bg-white border-2 text-left transition-all duration-300 w-full ${
          selected
            ? 'border-[#7B6FE8] bg-[#EEECFF] shadow-[0_4px_16px_rgba(123,111,232,0.15)]'
            : option.id === 'ia'
            ? 'border-[#7B6FE8]/60 bg-[#EEECFF]/30 hover:border-[#7B6FE8] shadow-[0_4px_16px_rgba(123,111,232,0.06)]'
            : 'border-[#E5E7EB] hover:border-[#7B6FE8]/40 hover:bg-slate-50/50 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
        }`}
      >
        <div className="flex items-start justify-between mb-1.5">
          <div className="flex items-center gap-3">
            {option.icon && <span className="text-2xl select-none">{option.icon}</span>}
            <span className="font-bold text-[#1A1A2E] text-base">{option.label}</span>
          </div>
          {option.badge && (
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
              option.id === 'ia' ? 'bg-[#7B6FE8] text-white' : 'bg-green-100 text-green-800'
            }`}>
              {option.badge}
            </span>
          )}
        </div>
        <p className="text-sm text-[#4B5563] leading-snug mb-3 pr-4">{option.sublabel}</p>
        
        {option.difficulty && (
          <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
            <span>Dificuldade:</span>
            <span className="text-[#7B6FE8] tracking-widest">{option.difficulty}</span>
          </div>
        )}
      </button>
    );
  }

  // 4. Cards emocionais grandes (ex: Pergunta 14)
  if (type === 'emotional') {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`relative flex flex-col items-start p-5 rounded-2xl bg-white border-2 text-left transition-all duration-300 w-full ${
          selected
            ? 'border-[#7B6FE8] bg-[#EEECFF] shadow-[0_4px_16px_rgba(123,111,232,0.15)]'
            : 'border-[#E5E7EB] hover:border-[#7B6FE8]/40 hover:bg-slate-50/50 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
        }`}
      >
        <span className="text-3xl mb-3 select-none">{option.icon}</span>
        <span className="font-bold text-[#1A1A2E] text-base mb-1">{option.label}</span>
        <p className="text-sm text-[#4B5563] leading-relaxed">{option.sublabel}</p>
      </button>
    );
  }

  // 5. Opções verticais padrão (Objetivos, Dores, etc.)
  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative flex items-center p-4 rounded-2xl bg-white border-2 text-left transition-all duration-300 w-full ${
        selected
          ? 'border-[#7B6FE8] bg-[#EEECFF] shadow-[0_4px_16px_rgba(123,111,232,0.15)]'
          : 'border-[#E5E7EB] hover:border-[#7B6FE8]/40 hover:bg-slate-50/50 shadow-[0_4px_16px_rgba(0,0,0,0.03)]'
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 pr-6">
        {option.icon && (
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7B6FE8]/10 to-[#A78BFA]/10 flex items-center justify-center flex-shrink-0 text-xl select-none">
            {option.icon}
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-[#1A1A2E] text-base leading-snug">{option.label}</span>
          {option.sublabel && (
            <span className="text-[13px] text-[#4B5563] mt-0.5 leading-snug">{option.sublabel}</span>
          )}
        </div>
      </div>
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
          selected ? 'bg-[#7B6FE8] border-[#7B6FE8] text-white' : 'border-[#D1D5DB] bg-white'
        }`}
      >
        {selected && <Check className="w-3.5 h-3.5" />}
      </div>
    </button>
  );
}
