import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CalmOrb from './CalmOrb';

export default function CTAFinal() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Otimização de Mouse Move: manipulação direta do estilo DOM
  // Evita re-renderizações e recalculo de frames no ciclo do React
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    if (containerRef.current) {
      containerRef.current.style.setProperty('--mouse-x', x);
      containerRef.current.style.setProperty('--mouse-y', y);
    }
  };

  return (
    <section 
      id="cta" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (containerRef.current) {
          containerRef.current.style.setProperty('--mouse-x', 0);
          containerRef.current.style.setProperty('--mouse-y', 0);
        }
      }}
      className="relative py-12 sm:py-32 bg-[#111318] overflow-hidden flex flex-col items-center justify-center border-t border-white/5"
      style={{
        '--mouse-x': 0,
        '--mouse-y': 0
      }}
    >
      {/* ── 🌌 TRANSIÇÃO SUAVE DE COR DO TOP ── */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#F6F7FB] to-[#111318] pointer-events-none z-0" />
      
      {/* Calm Orb Gigante de Fundo (Reativo ao Movimento do Mouse via CSS) */}
      <div 
        className="absolute left-1/2 top-1/2 z-0 opacity-70 mix-blend-plus-lighter pointer-events-none will-change-transform"
        style={{
          transition: 'transform 1s cubic-bezier(0.1, 0.8, 0.2, 1)',
          transform: isMobile
            ? 'translate3d(-50%, -50%, 0)'
            : 'translate3d(calc(-50% + var(--mouse-x) * 30px), calc(-50% + var(--mouse-y) * 30px), 0)'
        }}
      >
        <CalmOrb size="large" delay={0} />
      </div>

      {/* Efeito extra de Glow Radial Centralizado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,124,255,0.08)_0%,transparent_65%)] pointer-events-none z-0" />

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center w-full">
        
        {/* Badge IA Monospace Discreto */}
        <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white/8 border border-white/15 mb-6 sm:mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C3B5FF]" strokeWidth={1.75} />
          <span className="text-[10px] font-extrabold text-[#C3B5FF] uppercase tracking-widest font-mono">
            Chega de dieta restritiva
          </span>
        </div>

        {/* Headline de Alto Impacto Editorial */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal sm:font-light text-white tracking-tight leading-[1.1] mb-5 sm:mb-6 max-w-3xl">
          Seu corpo não precisa <span className="font-bold sm:font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#9C8FFF] to-[#C3B5FF] block md:inline drop-shadow-[0_2px_10px_rgba(156,143,255,0.3)]">sofrer para mudar</span>
        </h2>

        {/* Subheadline com apelo à paz alimentar */}
        <p className="text-[16.5px] sm:text-lg lg:text-[19px] text-white/80 font-normal sm:font-light leading-relaxed mb-8 sm:mb-12 max-w-xl">
          Descubra como emagrecer com leveza, no seu próprio ritmo. Faça as pazes com a comida e com o seu espelho hoje mesmo.
        </p>

        {/* Botão de Conversão Premium com Borda Iluminada */}
        <motion.button
          onClick={() => navigate('/quiz')}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4.5 sm:px-10 sm:py-5 rounded-full btn-primary-premium btn-shine-effect text-white text-[13.5px] sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 overflow-hidden w-full sm:w-auto text-center shadow-[0_20px_50px_rgba(122,105,250,0.5)] cursor-pointer"
        >
          Quero fazer as pazes com a comida
          <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.2} />
        </motion.button>

        {/* Selos Adicionais e Social Proof */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-12 sm:mt-16 text-white/75 text-[11px] sm:text-[13px] tracking-wide uppercase font-sans w-full justify-center font-semibold sm:font-medium">
          <span className="flex items-center gap-2 text-center">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
            Experimente sem compromisso por 7 dias
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span>Disponível para iOS e Android</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span>Cancele quando quiser, sem burocracia</span>
        </div>

      </div>
    </section>
  );
}
