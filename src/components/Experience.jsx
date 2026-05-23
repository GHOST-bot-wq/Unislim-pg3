import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, Sparkles, Flame, Info } from 'lucide-react';

export default function Experience() {
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
    <section id="diferenca" className="relative py-10 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* ── 🌌 ILUMINAÇÃO AMBIENTAL DE FUNDO (Auras Coloridas em Parallax) ── */}
      <div className="absolute left-[-15%] top-[10%] w-[600px] h-[600px] bg-gradient-to-tr from-rose-500/5 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute left-[20%] top-[40%] w-[500px] h-[500px] bg-gradient-to-br from-[#8B7CFF]/8 to-transparent rounded-full blur-[130px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute right-[-10%] bottom-[10%] w-[450px] h-[450px] bg-gradient-to-bl from-[#A497FF]/6 to-emerald-500/3 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-24 relative z-10">
        
        {/* ============================================================== */}
        {/* LADO ESQUERDO: Gráficos Comparativos (Storytelling Visual)      */}
        {/* ============================================================== */}
        <div className="w-full lg:w-[52%] flex flex-col gap-8 order-2 lg:order-1">
          
          {/* Card Gráfico 1: Apps Tradicionais (Vidro Escuro - O Caos Mental) */}
          <div className="p-7 sm:p-9 rounded-[32px] bg-slate-950/85 border border-slate-900 backdrop-blur-xl relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:border-rose-500/30 hover:shadow-[0_20px_50px_rgba(244,63,94,0.12)] shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
            {/* Linha vermelha de backlight sutil */}
            <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-rose-500/5 blur-3xl pointer-events-none group-hover:bg-rose-500/10 transition-all duration-500" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest font-mono bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full shadow-sm">
                  ⚠️ A Flutuação Comum
                </span>
                <h4 className="text-lg font-display font-semibold text-white mt-3.5 group-hover:text-rose-400 transition-colors duration-300">Ansiedade Alimentar e Picos</h4>
                <p className="text-sm sm:text-[14px] text-slate-400 font-light mt-1.5">Culpa após comer e o temido efeito sanfona constante</p>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[8px] font-extrabold text-rose-400 tracking-wider uppercase flex items-center gap-1.5 font-mono shadow-inner group-hover:animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" />
                Ciclo Instável
              </div>
            </div>

            {/* SVG Gráfico 1 (Caótico e Pontiagudo com Gridlines) */}
            <div className="h-36 w-full relative flex items-end mt-6">
              {/* Gridlines de Precisão */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-px bg-white border-dashed border-t" />
                ))}
              </div>

              <svg className="w-full h-full absolute inset-0 overflow-visible z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Sombra da linha de picos */}
                <path
                  d="M0,80 L15,20 L30,85 L45,30 L60,90 L75,15 L90,95 L100,50"
                  fill="none"
                  stroke="rgba(244, 63, 94, 0.15)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Linha Principal Neon */}
                <motion.path
                  d="M0,80 L15,20 L30,85 L45,30 L60,90 L75,15 L90,95 L100,50"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                />

                {/* Partícula Caótica que corre pela montanha-russa */}
                {!isMobile ? (
                  <motion.circle
                    r="3.5"
                    fill="#f43f5e"
                    style={{ filter: 'drop-shadow(0 0 6px #f43f5e)' }}
                    animate={{
                      cx: [0, 15, 30, 45, 60, 75, 90, 100],
                      cy: [80, 20, 85, 30, 90, 15, 95, 50],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                ) : (
                  <circle
                    cx="100"
                    cy="50"
                    r="3.5"
                    fill="#f43f5e"
                    style={{ filter: 'drop-shadow(0 0 6px #f43f5e)' }}
                  />
                )}
              </svg>

              {/* Anotações Flutuantes nos Picos e Vales */}
              <span className="hidden sm:absolute top-[8%] left-[10%] text-[8px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20 select-none shadow-sm">
                Chocolate 🍫 (Culpa)
              </span>
              <span className="hidden sm:absolute bottom-[2%] left-[23%] text-[8px] font-mono text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800 select-none">
                Restrição Severa ❌
              </span>
              <span className="hidden sm:absolute top-[5%] left-[67%] text-[8px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20 select-none shadow-sm">
                Fim de Semana (Compulsão)
              </span>
              <span className="hidden sm:absolute bottom-[2%] left-[81%] text-[8px] font-mono text-rose-500 font-bold bg-rose-500/20 px-1.5 py-0.5 rounded border border-rose-500/30 select-none animate-bounce">
                Efeito Sanfona 🔄
              </span>
            </div>
            
            <div className="flex justify-between text-[8.5px] font-mono text-slate-500 mt-4 border-t border-slate-900 pt-3.5">
              <span>SEMANA 1</span>
              <span>SEMANA 4</span>
              <span>SEMANA 8</span>
            </div>
          </div>

          {/* Card Gráfico 2: Método UniSlim (Vidro Claro - A Paz e Consistência) */}
          <div className="p-7 sm:p-9 rounded-[32px] bg-white/80 border border-white/60 backdrop-blur-xl relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(139,124,255,0.08),0_10px_30px_rgba(0,0,0,0.01)] transition-all duration-500 hover:-translate-y-1 hover:border-[#8B7CFF]/40 hover:shadow-[0_25px_60px_rgba(139,124,255,0.18)]">
            {/* Luz lilás de backlight interno */}
            <div className="absolute right-0 top-0 w-40 h-40 bg-[#8B7CFF]/8 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest font-mono bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 rounded-full shadow-sm">
                  ✨ Método UniSlim
                </span>
                <h4 className="text-lg font-display font-semibold text-slate-900 mt-3.5 group-hover:text-brand-primary transition-colors duration-300">Consistência e Saúde Mental</h4>
                <p className="text-sm sm:text-[14px] text-slate-500 font-light mt-1.5">Evolução equilibrada, sem neuras, proibições ou contagem maluca</p>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[8px] font-extrabold text-[#6352E8] tracking-wider uppercase flex items-center gap-1.5 font-mono shadow-sm">
                <Check className="w-3.5 h-3.5 text-[#8B7CFF]" />
                Estabilidade Leve
              </div>
            </div>

            {/* SVG Gráfico 2 (Curva de Progresso Suave e Segura) */}
            <div className="h-36 w-full relative flex items-end mt-6">
              {/* Gridlines de Precisão */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-px bg-slate-900 border-dashed border-t" />
                ))}
              </div>

              <svg className="w-full h-full absolute inset-0 overflow-visible z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Defs para Gradiente Sob a Curva */}
                <defs>
                  <linearGradient id="grad-unislim-exp-premium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B7CFF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#8B7CFF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Preenchimento Gradiente Sob a Curva */}
                <motion.path
                  d="M0,75 C20,70 35,52 50,45 C65,38 80,24 100,18 L100,100 L0,100 Z"
                  fill="url(#grad-unislim-exp-premium)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />

                {/* Sombra suave sob a linha de progresso */}
                <path
                  d="M0,75 C20,70 35,52 50,45 C65,38 80,24 100,18"
                  fill="none"
                  stroke="rgba(139, 124, 255, 0.2)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Linha Principal Roxo/Indigo */}
                <motion.path
                  d="M0,75 C20,70 35,52 50,45 C65,38 80,24 100,18"
                  fill="none"
                  stroke="#8B7CFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                />

                {/* Partícula de Luz Suave que corre na curva de forma orgânica */}
                {!isMobile ? (
                  <motion.circle
                    r="3.5"
                    fill="#8B7CFF"
                    style={{ filter: 'drop-shadow(0 0 6px #8B7CFF)' }}
                    animate={{
                      cx: [0, 15, 30, 45, 60, 75, 90, 100],
                      cy: [75, 71.5, 60, 48, 44, 30, 22, 18],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ) : (
                  <circle
                    cx="100"
                    cy="18"
                    r="3.5"
                    fill="#8B7CFF"
                    style={{ filter: 'drop-shadow(0 0 6px #8B7CFF)' }}
                  />
                )}
              </svg>

              {/* Anotações Acolhedoras e Flutuantes ao longo da Curva */}
              <span className="hidden sm:absolute bottom-[30%] left-[5%] text-[8px] font-mono text-emerald-600 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 select-none shadow-sm">
                Liberdade Real (Sem Neura 🍰)
              </span>
              <span className="hidden sm:absolute top-[34%] left-[38%] text-[8px] font-mono text-blue-600 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 select-none shadow-sm">
                Consistência e Hábito 🏃‍♀️
              </span>
              <span className="hidden sm:absolute top-[8%] left-[72%] text-[8px] font-mono text-[#6352E8] font-bold bg-[#8B7CFF]/15 px-1.5 py-0.5 rounded border border-[#8B7CFF]/30 select-none animate-pulse shadow-sm">
                Autonomia e Peso Ideal 🥑
              </span>
            </div>
            
            <div className="flex justify-between text-[8.5px] font-mono text-slate-400 mt-4 border-t border-slate-100 pt-3.5">
              <span>SEMANA 1</span>
              <span>SEMANA 4</span>
              <span>SEMANA 8</span>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* LADO DIREITO: Explicações Emocionais e Diferenciais           */}
        {/* ============================================================== */}
        <div className="w-full lg:w-[42%] flex flex-col justify-center text-left order-1 lg:order-2">
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest font-mono bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 w-fit mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#8B7CFF]" /> Por que o UniSlim parece diferente?
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extralight text-brand-text tracking-tight leading-[1.15] mb-6">
            Menos pressão mental gera <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8B7CFF] to-[#6352E8]">mais consistência.</span>
          </h2>

          <p className="text-base sm:text-lg text-brand-text-secondary font-light leading-relaxed mb-8">
            Os aplicativos comuns jogam na sua tela gráficos de calorias vermelhos e piscantes quando você come um chocolate. Isso gera culpa, e a culpa faz você desistir de tudo.
            <br /><br />
            No UniSlim, a gente acalma essa neura. Nossa inteligência analisa o seu equilíbrio ao longo de semanas, e não de horas, garantindo que você faça as pazes com a comida de uma vez por todas.
          </p>

          {/* Lista Minimalista de Diferenciais de Luxo */}
          <div className="space-y-4">
            {[
              {
                title: 'Visual Suave:',
                desc: 'Cores neutras e acolhedoras, sem alertas vermelhos estressantes que disparam gatilhos de ansiedade.'
              },
              {
                title: 'Nutrição Acolhedora:',
                desc: 'Dicas práticas e feedbacks criados por especialistas focados em comportamento e equilíbrio real.'
              },
              {
                title: 'Sem Cobrança:',
                desc: 'Chega de notificações chatas no meio do dia cobrando que você registre cada garfada.'
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                {/* Checkmark circular com gradiente e sombra */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#8B7CFF] to-indigo-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_4px_12px_rgba(139,124,255,0.25)] border border-white/20 transition-transform duration-300 group-hover:scale-110">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-[14px] sm:text-[15.5px] text-brand-text-secondary font-light leading-relaxed">
                  <strong className="font-semibold text-slate-800 mr-1">{item.title}</strong>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
