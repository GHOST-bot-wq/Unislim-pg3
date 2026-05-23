import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Settings } from 'lucide-react';
import CalmOrb from './CalmOrb';

export default function AppMockup() {
  const activeTab = 1;
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { name: 'Início', icon: SmileIcon },
    { name: 'Scanner', icon: Camera },
    { name: 'Equilíbrio', icon: CompassIcon },
    { name: 'Calma', icon: BarChartIcon }
  ];

  // Handler de mouse ultraperformático: atualiza as variáveis CSS no elemento DOM diretamente.
  // Isso atinge FPS alto e remove totalmente o ciclo de renderização e reconciliação do React.
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 a 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 a 0.5
    
    if (containerRef.current) {
      containerRef.current.style.setProperty('--mouse-x', x);
      containerRef.current.style.setProperty('--mouse-y', y);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (containerRef.current) {
          containerRef.current.style.setProperty('--mouse-x', 0);
          containerRef.current.style.setProperty('--mouse-y', 0);
        }
      }}
      className="relative flex items-center justify-center p-6 sm:p-12 select-none cursor-pointer"
      style={{ 
        perspective: isMobile ? undefined : 1500,
        '--mouse-x': 0,
        '--mouse-y': 0
      }}
    >
      
      {/* ── 🌌 BACKLIGHT AURA INTEGRADO ── */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 scale-[1.35] opacity-80 pointer-events-none">
        <CalmOrb size="medium" delay={0} />
      </div>

      {/* ── CORPO PRINCIPAL DO SMARTPHONE ── */}
      <div
        className="relative w-[300px] h-[610px] sm:w-[335px] sm:h-[680px] z-10 will-change-transform"
        style={{ 
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.1, 0.8, 0.2, 1)',
          transform: isHovered 
            ? 'rotateY(calc(var(--mouse-x) * 8deg)) rotateX(calc(var(--mouse-y) * -8deg)) scale(1.015)' 
            : 'rotateY(0deg) rotateX(0deg) scale(1)'
        }}
      >
        {/* Botão Power (Direita) */}
        <div className="absolute -right-[3px] top-[240px] w-[3px] h-20 bg-gradient-to-b from-[#2d3139] to-[#1a1c23] rounded-r-md border-r border-[#4c5264]/20 shadow-[2px_0_5px_rgba(0,0,0,0.2)] z-0" />
        {/* Botão de Silencioso (Esquerda) */}
        <div className="absolute -left-[3px] top-[140px] w-[3px] h-8 bg-gradient-to-b from-[#2d3139] to-[#1a1c23] rounded-l-md border-l border-[#4c5264]/20 shadow-[-2px_0_5px_rgba(0,0,0,0.2)] z-0" />
        {/* Botões de Volume (Esquerda) */}
        <div className="absolute -left-[3px] top-[190px] w-[3px] h-12 bg-gradient-to-b from-[#2d3139] to-[#1a1c23] rounded-l-md border-l border-[#4c5264]/20 shadow-[-2px_0_5px_rgba(0,0,0,0.2)] z-0" />
        <div className="absolute -left-[3px] top-[255px] w-[3px] h-12 bg-gradient-to-b from-[#2d3139] to-[#1a1c23] rounded-l-md border-l border-[#4c5264]/20 shadow-[-2px_0_5px_rgba(0,0,0,0.2)] z-0" />

        {/* Moldura e Bisel do Smartphone */}
        <div
          className="relative w-full h-full rounded-[52px] bg-[#0d0f14] p-[10px] shadow-[0_40px_100px_-15px_rgba(17,19,24,0.4),0_20px_50px_-10px_rgba(139,124,255,0.12),0_0_0_1px_rgba(255,255,255,0.06),inset_0_4px_12px_rgba(255,255,255,0.15)] flex flex-col overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Moldura Metálica Externa Brilhante */}
          <div className="absolute inset-0 rounded-[52px] border-[3px] border-slate-700/60 pointer-events-none z-40" />
          {/* Bisel Interno Preto da Tela */}
          <div className="absolute inset-[3px] rounded-[48px] border-[5px] border-black pointer-events-none z-40" />

          {/* DYNAMIC ISLAND */}
          <div className="absolute top-[16px] inset-x-0 h-7 flex justify-center items-center z-50 pointer-events-none">
            <div className="w-[95px] h-[26px] bg-black rounded-full flex items-center justify-between px-3 shadow-[inset_0_1px_3px_rgba(255,255,255,0.3)]">
              <div className="w-3.5 h-3.5 rounded-full bg-radial from-[#040817] via-[#091e3b] to-black flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#050608]" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#050608]" />
            </div>
          </div>

          {/* ── TELA DO SMARTPHONE (DESIGN REFINADO DO SCANNER) ── */}
          <div className="flex-1 bg-[#F6F7FB] pt-11 px-4 pb-16 overflow-hidden relative flex flex-col rounded-[42px] select-none justify-between">
            
            {/* Header Superior da Câmera */}
            <div className="mt-1 flex items-center justify-between px-1">
              <div className="w-7 h-7 rounded-full bg-white border border-[#E7EBF3] flex items-center justify-center text-[#111318] shadow-sm hover:scale-105 transition-transform">
                <Settings className="w-3.5 h-3.5 opacity-80" />
              </div>
              <h4 className="text-[10px] font-bold font-display text-[#111318] tracking-widest uppercase opacity-90">Scanner Inteligente</h4>
              <div className="px-2.5 py-1 rounded-full bg-[#8B7CFF]/12 border border-[#8B7CFF]/25 text-[8px] font-extrabold text-[#8B7CFF] uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF] animate-pulse" />
                IA Ativa
              </div>
            </div>

            {/* Viewfinder da Câmera Principal */}
            <div className="relative w-full aspect-square rounded-[28px] overflow-hidden border border-[#E7EBF3] bg-slate-950 shadow-[inset_0_0_30px_rgba(0,0,0,0.8),0_8px_25px_-5px_rgba(0,0,0,0.12)] flex items-center justify-center my-3 group">
              
              {/* Prato de comida brasileiro (webp otimizado) */}
              <img
                src="/prato_brasileiro.webp"
                alt="Prato Brasileiro"
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover contrast-[1.08] saturate-[1.08] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
              />

              {/* ── 🌟 REFLEXO DIAGONAL DE VIDRO MÓVEL (Aceleração por hardware via CSS) ── */}
              <div
                className="absolute -inset-10 bg-gradient-to-tr from-transparent via-white/14 to-transparent pointer-events-none z-30 mix-blend-overlay rotate-[15deg] scale-125 will-change-transform"
                style={{
                  transition: 'transform 0.8s cubic-bezier(0.1, 0.8, 0.2, 1)',
                  transform: isHovered
                    ? 'translate3d(calc(var(--mouse-x) * -60px), calc(var(--mouse-y) * -60px), 0)'
                    : 'translate3d(0, 0, 0)'
                }}
              />

              {/* Linha Laser Roxo-Neon (CSS Keyframe de performance) */}
              <div
                className={`absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#8B7CFF] to-transparent shadow-[0_0_18px_#A497FF] z-20 will-change-transform ${
                  isMobile ? 'top-1/2' : 'animate-scan-laser'
                }`}
              />

              {/* HUD Vision Pro Overlay */}
              <div className="absolute inset-4 border border-white/20 rounded-2xl pointer-events-none z-15">
                <div className="w-3.5 h-3.5 border-t-2 border-l-2 border-[#8B7CFF] absolute top-0 left-0 rounded-tl-sm" />
                <div className="w-3.5 h-3.5 border-t-2 border-r-2 border-[#8B7CFF] absolute top-0 right-0 rounded-tr-sm" />
                <div className="w-3.5 h-3.5 border-b-2 border-l-2 border-[#8B7CFF] absolute bottom-0 left-0 rounded-bl-sm" />
                <div className="w-3.5 h-3.5 border-b-2 border-r-2 border-[#8B7CFF] absolute bottom-0 right-0 rounded-br-sm" />
              </div>

              {/* HUD Central Reticle */}
              <div className="absolute w-16 h-16 rounded-full border border-white/10 flex items-center justify-center pointer-events-none z-15">
                <div className="w-8 h-8 rounded-full border border-[#8B7CFF]/20 flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#8B7CFF] rounded-full" />
                </div>
              </div>

              {/* Pins de detecção do prato (Estáticos para economizar CPU, com hover suave) */}
              <div className="absolute top-[32%] left-[45%] z-25 flex items-center gap-1.5 bg-[#111318]/90 backdrop-blur-md border border-white/15 px-2.5 py-0.5 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
                <span className="text-[8px] text-white font-bold tracking-wide">Frango Grelhado</span>
              </div>

              <div className="absolute top-[68%] left-[28%] z-25 flex items-center gap-1.5 bg-[#111318]/90 backdrop-blur-md border border-white/15 px-2.5 py-0.5 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
                <span className="text-[8px] text-white font-bold tracking-wide">Feijão Preto</span>
              </div>

              <div className="absolute top-[52%] left-[68%] z-25 flex items-center gap-1.5 bg-[#111318]/90 backdrop-blur-md border border-white/15 px-2.5 py-0.5 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF]" />
                <span className="text-[8px] text-white font-bold tracking-wide">Arroz Integral</span>
              </div>

              {/* Tag Flutuante de Calorias */}
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#8B7CFF] text-white text-[9px] font-extrabold tracking-wider shadow-[0_6px_15px_rgba(139,124,255,0.45)] flex items-center gap-1.5 z-25 border border-white/20 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-white" />
                <span>420 kcal</span>
              </div>
            </div>

            {/* Painel de Feedback da IA Acolhedora */}
            <div className="p-4 rounded-[20px] bg-white border border-[#E7EBF3] shadow-[0_10px_25px_rgba(0,0,0,0.03)] mb-1">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8B7CFF]" />
                <span className="text-[9px] font-bold text-[#8B7CFF] uppercase tracking-wider font-display">
                  UniSlim Calm AI
                </span>
              </div>
              <p className="text-[11px] text-[#0f1115] font-medium leading-relaxed">
                O clássico arroz e feijão brasileiro! Aporte de <span className="font-extrabold text-[#8B7CFF] underline decoration-wavy decoration-[#8B7CFF]/30">420 kcal</span> com excelente equilíbrio de aminoácidos, proteínas e fibras. Nutritivo e acolhedor.
              </p>
            </div>

          </div>

          {/* ── BARRA DE ABAS INFERIOR ── */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-white/90 backdrop-blur-md border-t border-brand-border/80 flex items-center justify-around px-3 z-30">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center flex-1 py-1 relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="app-tab-active-pill"
                      className="absolute -top-1 w-7 h-0.5 bg-brand-primary"
                    />
                  )}
                  <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-brand-primary' : 'text-brand-text-secondary'}`} />
                  <span className={`text-[8px] mt-1 font-semibold transition-colors duration-300 ${isActive ? 'text-brand-primary' : 'text-brand-text-secondary'}`}>
                    {tab.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1 inset-x-0 h-3 flex items-center justify-center z-50 pointer-events-none">
            <div className="w-24 h-1 bg-[#b2b7c5] rounded-full opacity-60" />
          </div>

        </div>
      </div>

    </div>
  );
}

// ── ÍCONES INTERNOS SIMPLIFICADOS ──
function SmileIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

function CompassIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function BarChartIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" x2="18" y1="20" y2="10" />
      <line x1="12" x2="12" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="14" />
    </svg>
  );
}
