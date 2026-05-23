import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Check, Info, ShieldAlert, Flame, Compass, Dumbbell, Leaf } from 'lucide-react';
import CalmOrb from './CalmOrb';

// Dados estáticos declarados fora da função componente para evitar realocação em cada renderização
const meals = [
  {
    tabName: 'Prato',
    name: 'Prato Feito Saudável (PF)',
    image: '/prato_brasileiro.webp',
    description: 'Arroz integral, feijão preto saboroso, filé de frango grelhado e couve refogada.',
    iaFeedback: 'Arroz, feijão e frango: o clássico brasileiro perfeito! Esse prato sustenta super bem, tem nutrientes ótimos e cerca de 480 kcal para te dar energia sem pesar.',
    tags: [
      { label: 'Frango Grelhado', top: '35%', left: '42%' },
      { label: 'Feijão Preto', top: '65%', left: '30%' },
      { label: 'Arroz Integral', top: '55%', left: '60%' },
      { label: 'Couve Refogada', top: '28%', left: '65%' }
    ],
    metrics: {
      calorias: '480 kcal',
      saciedade: 'Excelente',
      fibras: 'Altas (9g)',
      proteinas: '32g',
      carboidratos: 'Carboidratos bons (38g)',
      fats: 'Gorduras boas (8g)'
    }
  },
  {
    tabName: 'Omelete',
    name: 'Omelete Fit com Queijo',
    image: '/omelete_fit.webp',
    description: 'Ovos caipiras batidos, queijo branco derretido, tomate em cubos e uma pitada de orégano.',
    iaFeedback: 'Omelete é o rei da saciedade e das proteínas! Com cerca de 320 kcal, o queijo branco e os ovos garantem energia duradoura com baixo carboidrato. Perfeito para uma refeição prática e leve.',
    tags: [
      { label: 'Ovos Caipiras', top: '48%', left: '35%' },
      { label: 'Queijo Branco', top: '52%', left: '62%' },
      { label: 'Tomate e Orégano', top: '32%', left: '50%' }
    ],
    metrics: {
      calorias: '320 kcal',
      saciedade: 'Muito Alta',
      fibras: 'Leve (2g)',
      proteinas: '22g',
      carboidratos: 'Muito baixo (3g)',
      fats: 'Gorduras boas (16g)'
    }
  },
  {
    tabName: 'Panqueca',
    name: 'Panqueca de Aveia e Banana',
    image: '/panqueca_aveia.webp',
    description: 'Massa leve de aveia e ovos, rodelas de banana e morangos por cima, finalizada com um fio de mel.',
    iaFeedback: 'Essa panqueca é excelente para dar energia estável! A aveia é um carboidrato de digestão lenta que, junto com a banana e o mel, mata a vontade de doce sem dar preguiça depois.',
    tags: [
      { label: 'Panqueca de Aveia', top: '52%', left: '35%' },
      { label: 'Morangos Frescos', top: '30%', left: '45%' },
      { label: 'Banana em Rodelas', top: '38%', left: '60%' },
      { label: 'Mel de Abelha', top: '65%', left: '52%' }
    ],
    metrics: {
      calorias: '390 kcal',
      saciedade: 'Alta',
      fibras: 'Altas (6g)',
      proteinas: '12g',
      carboidratos: 'Energia estável (42g)',
      fats: 'Gorduras boas (6g)'
    }
  }
];

export default function ScannerFeature() {
  const [selectedMeal, setSelectedMeal] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="scanner" className="relative py-10 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* ── 🌌 ILUMINAÇÃO DE BACKGROUND ── */}
      <div className="absolute right-[-10%] top-[15%] z-0">
        <CalmOrb size="large" delay={1} variant="default" />
      </div>

      {/* Título Superior da Seção */}
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-20">
        <span className="text-[10px] sm:text-xs font-semibold text-brand-primary uppercase tracking-widest font-display bg-brand-primary/10 px-4 py-1.5 rounded-full inline-block mb-4">
          Inteligência Visual
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-extralight text-brand-text tracking-tight leading-tight">
          Sua câmera inteligente <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8B7CFF] to-[#6352E8]">Sem complicações</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-[19px] text-brand-text-secondary font-light leading-relaxed mt-4 max-w-2xl mx-auto">
          Esqueça diários complicados de comida. Basta uma foto rápida e o UniSlim faz o reconhecimento alimentar na hora.
        </p>
      </div>

      {/* Grid de Duas Colunas - Layout Cinematográfico */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
        
        {/* LADO ESQUERDO: O Scanner HUD futurista */}
        <div className="w-full lg:w-[55%] flex flex-col items-center">
          
          {/* Seletor de Prato Glassmorphism */}
          <div className="flex gap-1.5 mb-8 bg-white/40 border border-brand-border p-1.5 rounded-full backdrop-blur-md w-full max-w-md shadow-[0_4px_15px_rgba(0,0,0,0.015)]">
            {meals.map((meal, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedMeal(idx)}
                className={`flex-1 py-2.5 px-4 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  selectedMeal === idx
                    ? 'bg-brand-primary text-white shadow-[0_4px_12px_rgba(139,124,255,0.25)]'
                    : 'text-brand-text-secondary hover:text-brand-text hover:bg-white/50'
                }`}
              >
                {meal.tabName}
              </button>
            ))}
          </div>

          {/* Viewfinder principal do Scanner */}
          <div className="relative w-full aspect-square max-w-[480px] rounded-[44px] overflow-hidden border border-brand-border/60 bg-[#0d0f14] shadow-[0_50px_100px_-25px_rgba(17,19,24,0.35),0_15px_40px_-15px_rgba(139,124,255,0.1)] flex items-center justify-center">
            
            {/* Imagem do Prato com transição de opacidade simples, livre de blurs caros na GPU */}
            {/* Otimizado: sem AnimatePresence/wait, fade-in direto e ultra-rápido de 150ms */}
            <motion.img
              key={selectedMeal}
              src={meals[selectedMeal].image}
              alt={meals[selectedMeal].name}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0.95 }}
              transition={{ duration: 0.15, ease: 'linear' }}
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none contrast-[1.08] saturate-[1.12] brightness-[0.93]"
            />

            {/* Efeito de Vidro HUD por cima */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60 pointer-events-none z-10" />

            {/* Linha Laser Roxo-Neon Animada via CSS Nativo */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B7CFF] to-transparent shadow-[0_0_20px_#A497FF] z-20 pointer-events-none animate-scan-laser will-change-transform" />

            {/* Marcadores de tags e pins do prato: cascata ultra-rápida sem AnimatePresence */}
            {meals[selectedMeal].tags.map((tag, idx) => (
              <motion.div
                key={`${selectedMeal}-tag-${idx}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: idx * 0.03, ease: 'easeOut' }}
                className="absolute z-30 flex items-center gap-2"
                style={{ top: tag.top, left: tag.left }}
              >
                {/* Anel Pulsante e Pin animado nativamente com aceleração 3D */}
                <div className="relative flex items-center justify-center cursor-pointer group">
                  <div className="absolute w-6 h-6 rounded-full border border-brand-primary/45 bg-brand-primary/10 animate-pin-pulse will-change-transform" />
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-primary border border-white shadow-lg" />
                  
                  {/* Tag de vidro flutuante reativa */}
                  <span className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-[#111318]/90 backdrop-blur-md border border-white/15 text-[8px] font-extrabold uppercase tracking-widest text-white shadow-lg pointer-events-none transform scale-95 group-hover:scale-100 group-hover:bg-[#8B7CFF] group-hover:border-white/30 transition-all duration-300">
                    {tag.label}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Moldura HUD Espacial (Vision Pro Design) */}
            <div className="absolute inset-6 border border-white/10 rounded-[32px] pointer-events-none z-15">
              <div className="w-5 h-5 border-t border-l border-white/35 absolute top-0 left-0 rounded-tl-xl" />
              <div className="w-5 h-5 border-t border-r border-white/35 absolute top-0 right-0 rounded-tr-xl" />
              <div className="w-5 h-5 border-b border-l border-white/35 absolute bottom-0 left-0 rounded-bl-xl" />
              <div className="w-5 h-5 border-b border-r border-white/35 absolute bottom-0 right-0 rounded-br-xl" />
              
              <div className="absolute top-3 left-4 text-[7px] font-mono text-white/30 tracking-widest uppercase">
                SYS_DETECTION: ON
              </div>
              <div className="absolute bottom-3 right-4 text-[7px] font-mono text-white/30 tracking-widest uppercase">
                CALIBRATION_GRID_9
              </div>
            </div>

            {/* Selo Câmera Ativa */}
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-extrabold text-white tracking-widest uppercase flex items-center gap-1.5 z-25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF] animate-pulse" />
              Vision HUD v1.0
            </div>

            {/* Tag Flutuante de Calorias dinâmica */}
            <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-[#8B7CFF] text-white text-[10px] font-extrabold tracking-wider shadow-[0_6px_15px_rgba(139,124,255,0.4)] flex items-center gap-1.5 z-25 border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 fill-white/10 text-white animate-pulse" />
              <span>{meals[selectedMeal].metrics.calorias}</span>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: IA Acolhedora e Detalhes Nutritivos */}
        <div className="w-full lg:w-[42%] flex flex-col justify-center text-left">
          
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest font-display bg-brand-primary/10 px-4 py-1.5 rounded-full inline-block w-fit mb-5">
            Sem restrições
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-display font-extralight text-brand-text tracking-tight leading-tight mb-6">
            Você aponta a câmera, <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8B7CFF] to-[#6352E8]">o app faz o resto</span>
          </h2>

          <p className="text-base sm:text-lg text-brand-text-secondary font-light leading-relaxed mb-8">
            Tudo o que você precisa fazer é tirar uma foto rápida. O app reconhece o que está no seu prato na mesma hora e te dá dicas simples de porções e saciedade — sem que você precise digitar nada ou ficar adivinhando.
          </p>

          {/* Conselho da IA Acolhedora */}
          <div className="p-6 rounded-[28px] bg-gradient-to-b from-white to-[#F8F7FF] border border-[#8B7CFF]/30 shadow-[0_20px_45px_rgba(139,124,255,0.08)] hover:shadow-[0_25px_50px_rgba(139,124,255,0.14)] hover:border-[#8B7CFF]/50 transition-all duration-500 mb-8 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-brand-primary to-[#A497FF]" />
            <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-[#8B7CFF]/8 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-3.5 mt-1">
              <div className="w-5 h-5 rounded-full bg-[#8B7CFF]/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-[#8B7CFF]" />
              </div>
              <span className="text-[9px] font-bold text-[#8B7CFF] uppercase tracking-widest font-display">
                Conselho da IA Acolhedora
              </span>
            </div>

            {/* Otimizado: fade rápido de 150ms */}
            <motion.p
              key={selectedMeal}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="text-[14.5px] sm:text-[16px] text-[#111318] font-semibold leading-relaxed italic"
            >
              "{meals[selectedMeal].iaFeedback}"
            </motion.p>
          </div>

          {/* Grade de Métricas do Prato */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                label: 'Energia estimada', 
                value: meals[selectedMeal].metrics.calorias, 
                icon: Flame, 
                iconBg: 'bg-orange-500/10 text-orange-500',
                borderStyle: 'border-orange-500/25',
                shadowStyle: 'shadow-[0_12px_28px_rgba(249,115,22,0.05),0_2px_8px_rgba(0,0,0,0.02)]',
                borderHover: 'hover:border-orange-500/60 hover:shadow-[0_22px_40px_rgba(249,115,22,0.14)]',
                valueColor: 'text-orange-600'
              },
              { 
                label: 'Fome sob controle', 
                value: meals[selectedMeal].metrics.saciedade, 
                icon: Compass, 
                iconBg: 'bg-emerald-500/10 text-emerald-500',
                borderStyle: 'border-emerald-500/25',
                shadowStyle: 'shadow-[0_12px_28px_rgba(16,185,129,0.05),0_2px_8px_rgba(0,0,0,0.02)]',
                borderHover: 'hover:border-emerald-500/60 hover:shadow-[0_22px_40px_rgba(16,185,129,0.14)]',
                valueColor: 'text-emerald-600'
              },
              { 
                label: 'Proteína', 
                value: meals[selectedMeal].metrics.proteinas, 
                icon: Dumbbell, 
                iconBg: 'bg-[#8B7CFF]/10 text-[#8B7CFF]',
                borderStyle: 'border-[#8B7CFF]/35',
                shadowStyle: 'shadow-[0_12px_28px_rgba(139,124,255,0.07),0_2px_8px_rgba(0,0,0,0.02)]',
                borderHover: 'hover:border-[#8B7CFF]/75 hover:shadow-[0_22px_40px_rgba(139,124,255,0.18)]',
                valueColor: 'text-[#8B7CFF]'
              },
              { 
                label: 'Fibras', 
                value: meals[selectedMeal].metrics.fibras, 
                icon: Leaf, 
                iconBg: 'bg-teal-500/10 text-teal-500',
                borderStyle: 'border-teal-500/25',
                shadowStyle: 'shadow-[0_12px_28px_rgba(20,184,166,0.05),0_2px_8px_rgba(0,0,0,0.02)]',
                borderHover: 'hover:border-teal-500/60 hover:shadow-[0_22px_40px_rgba(20,184,166,0.14)]',
                valueColor: 'text-teal-600'
              },
            ].map((metric, idx) => (
              <div 
                key={idx} 
                className={`p-3 sm:p-5 rounded-2xl bg-gradient-to-br from-white to-[#FAFAFC] border ${metric.borderStyle} ${metric.shadowStyle} hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 sm:gap-3.5 ${metric.borderHover}`}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${metric.iconBg}`}>
                  <metric.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9.5px] sm:text-xs text-[#5D6472] uppercase tracking-wider block font-bold truncate">
                    {metric.label}
                  </span>
                  <span className={`text-[12.5px] sm:text-base font-bold font-display mt-0.5 block leading-tight ${metric.valueColor}`}>
                    {metric.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
