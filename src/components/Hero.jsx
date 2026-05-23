import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppMockup from './AppMockup';
import CalmOrb from './CalmOrb';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-28 pb-8 sm:pt-32 sm:pb-20 px-4 sm:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 overflow-hidden">
      
      {/* ── 🌌 ILUMINAÇÃO CINEMATOGRÁFICA DE BACKGROUND (Calm AI Aura Core) ── */}
      <div className="absolute right-[-15%] top-[-5%] z-0">
        <CalmOrb size="extraLarge" delay={0} variant="default" />
      </div>
      <div className="absolute left-[-20%] bottom-[-10%] z-0">
        <CalmOrb size="large" delay={4} variant="default" />
      </div>

      {/* LADO ESQUERDO: Texto Editorial Minimalista (35% de largura no desktop para respiro visual) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-[46%] flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10"
      >
        {/* Selo Social Proof ultra-elegante */}
        <div className="inline-flex items-center gap-3.5 px-4.5 py-2.5 rounded-full bg-white/70 border border-brand-border backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.02)] w-fit mx-auto lg:mx-0 mb-8 hover:border-brand-primary/30 transition-colors duration-300">
          <div className="flex -space-x-2.5 overflow-hidden">
            {[
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
            ].map((src, i) => (
              <img
                key={i}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src={src}
                alt="Usuário do UniSlim"
              />
            ))}
          </div>
          <div className="flex flex-col justify-start text-left">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#8B7CFF] text-[#8B7CFF]" />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-brand-text uppercase font-display mt-0.5">
              +10k vidas transformadas
            </span>
          </div>
        </div>

        {/* Headline Editorial Gigante e Extra-Light (Aumentado contraste e impacto no mobile) */}
        <h1 className="text-[40px] sm:text-6xl lg:text-[64px] font-display font-normal sm:font-light text-brand-text tracking-[-0.03em] leading-[1.06] mb-6 sm:mb-8">
          Emagreça sem <span className="block sm:inline font-bold sm:font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#7462FF] via-[#5C45FA] to-[#4529E6] mt-1 sm:mt-2 drop-shadow-[0_2px_8px_rgba(122,105,250,0.22)]">uma prisão mental</span>
        </h1>

        {/* Subheadline Emocional e Acolhedora */}
        <p className="text-[16.5px] sm:text-lg lg:text-[19px] text-brand-text-secondary/95 font-normal sm:font-light leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0">
          Você aponta a câmera pro prato. Nossa inteligência te diz o que tem ali — sem julgamento e sem nenhum número vermelho piscando na tela.
        </p>

        {/* CTAs Premium em Estilo Linear / Cal.com */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 w-full sm:w-auto px-2 sm:px-0">
          <Link
            to="/quiz"
            className="group flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-full btn-primary-premium btn-shine-effect text-white text-[13.5px] sm:text-sm font-bold transition-all duration-300 text-center whitespace-nowrap"
          >
            Fazer as pazes com a comida
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#metodo"
            className="flex items-center justify-center gap-2 px-8 py-4.5 rounded-full btn-secondary-premium btn-shine-effect text-[13.5px] sm:text-sm font-bold text-brand-text transition-all duration-300 text-center whitespace-nowrap"
          >
            Ver como funciona
          </a>
        </div>

        {/* Selo de Garantia Acolhedor */}
        <div className="flex items-center justify-center lg:justify-start gap-2.5 mt-8 sm:mt-10 text-brand-text-secondary/90">
          <ShieldCheck className="w-5 h-5 text-[#7A69FA]" />
          <span className="text-[12px] sm:text-xs font-semibold tracking-wider uppercase font-display">Tecnologia Acolhedora • Sem neuras</span>
        </div>
      </motion.div>

      {/* LADO DIREITO: Mockup Dominante e Gigante (48% de largura no desktop para equilíbrio) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-[48%] flex items-center justify-center relative z-10"
      >
        {/* Glow ambientado extra na traseira */}
        <div className="absolute w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-brand-primary/6 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
        
        {/* Container do Mockup sem flutuação livre brusca */}
        <div className="w-full max-w-2xl transform-gpu">
          <AppMockup />
        </div>
      </motion.div>
    </section>
  );
}


// Pequeno helper para renderizar Sparkles no mockup
function Sparkles(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
    </svg>
  );
}
