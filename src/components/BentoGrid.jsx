import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Compass, 
  Heart, 
  Star, 
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react';

export default function BentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  // Removido o filtro blur na animação de scroll, reduzido o deslocamento y
  // e otimizado o tempo para uma sensação muito mais ágil e suave.
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="recursos" className="relative py-10 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* ── 🌌 BACKLIGHTS AMBIENTAIS DE LUXO ── */}
      <div className="absolute left-[-10%] top-[20%] w-[600px] h-[600px] bg-gradient-to-tr from-[#8B7CFF]/10 to-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute right-[-10%] bottom-[10%] w-[550px] h-[550px] bg-gradient-to-br from-emerald-500/8 to-teal-500/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute left-[30%] bottom-[-5%] w-[400px] h-[400px] bg-orange-500/3 rounded-full blur-[110px] pointer-events-none z-0 animate-pulse-slow" />

      {/* Título da Seção Bento */}
      <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-20 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-bold text-brand-primary uppercase tracking-widest font-display bg-brand-primary/10 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-5 border border-brand-primary/20 shadow-[0_4px_12px_rgba(139,124,255,0.08)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8B7CFF]" /> Feito para a vida real
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-extralight text-brand-text tracking-tight leading-[1.1]"
        >
          O emagrecimento que respeita a <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8B7CFF] to-[#6352E8] shadow-sm">sua paz.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-[19px] text-brand-text-secondary font-light leading-relaxed mt-5 max-w-2xl mx-auto"
        >
          Tudo o que você precisa para alcançar o seu peso ideal, sem ter que parar de viver ou de comer o que você gosta.
        </motion.p>
      </div>

      {/* Bento Grid Simétrico */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10"
      >
        
        {/* ============================================================== */}
        {/* CARD 1: CÂMERA AMIGA (Scanner IA) - 3 Colunas                 */}
        {/* ============================================================== */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 p-8 sm:p-9 rounded-[32px] bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_12px_40px_rgba(139,124,255,0.03)] hover:border-[#8B7CFF]/50 hover:shadow-[0_20px_50px_rgba(139,124,255,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden min-h-[340px] group flex flex-col justify-between"
        >
          {/* Malha de Pontos Decorativa */}
          <div className="absolute inset-0 bg-[radial-gradient(#8b7cff_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-[0.04] pointer-events-none rounded-[32px]" />
          {/* Glow Interno */}
          <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-[#8B7CFF]/8 blur-2xl pointer-events-none group-hover:bg-[#8B7CFF]/15 transition-all duration-500" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B7CFF] to-[#A497FF] text-white shadow-[0_8px_20px_rgba(139,124,255,0.25)] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/10">
              <Camera className="w-5.5 h-5.5" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] sm:text-xs font-extrabold text-[#8B7CFF] uppercase tracking-widest font-mono bg-[#8B7CFF]/12 px-3.5 py-1.5 rounded-full border border-[#8B7CFF]/20 shadow-[0_2px_10px_rgba(139,124,255,0.03)]">
              Scanner IA 📸
            </span>
          </div>

          <div className="relative z-10 w-full md:max-w-[62%] mt-auto mb-2">
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-brand-text mb-2.5 group-hover:text-[#8B7CFF] transition-colors duration-300">Câmera amiga</h3>
            <p className="text-[14px] sm:text-[15.5px] text-brand-text-secondary font-light leading-relaxed">
              Esqueça aquela chatice de ficar procurando marcas de comida e digitando pesos. Você só tira foto do prato e o app te ajuda a ver se a porção está equilibrada.
            </p>
          </div>

          {/* Visor de Câmera Holográfico de IA */}
          <div className="relative mx-auto mt-6 md:absolute md:right-8 md:bottom-8 w-56 h-40 rounded-2xl border border-[#8B7CFF]/40 bg-slate-950 shadow-[0_15px_35px_rgba(0,0,0,0.25)] overflow-hidden pointer-events-none group-hover:scale-105 group-hover:border-[#8B7CFF]/70 transition-all duration-500 flex flex-col justify-end p-2.5">
            {/* Foto Real de Comida no Visor com Opacidade (webp otimizado) */}
            <img 
              src="/prato_brasileiro.webp" 
              alt="Visor IA" 
              className="absolute inset-0 w-full h-full object-cover opacity-65 scale-105 group-hover:scale-110 transition-transform duration-700 pointer-events-none select-none"
              loading="lazy"
              decoding="async"
            />
            
            {/* Overlay Escuro for Legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            {/* Linha de Varredura Laser de IA */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B7CFF] to-transparent shadow-[0_0_12px_#A497FF] animate-scan" />
            
            {/* Cantos do Visor de Foco */}
            <div className="w-5 h-5 border-t-2 border-l-2 border-[#8B7CFF]/90 absolute top-2.5 left-2.5 rounded-tl-sm" />
            <div className="w-5 h-5 border-t-2 border-r-2 border-[#8B7CFF]/90 absolute top-2.5 right-2.5 rounded-tr-sm" />
            <div className="w-5 h-5 border-b-2 border-l-2 border-[#8B7CFF]/90 absolute bottom-2.5 left-2.5 rounded-bl-sm" />
            <div className="w-5 h-5 border-b-2 border-r-2 border-[#8B7CFF]/90 absolute bottom-2.5 right-2.5 rounded-br-sm" />

            {/* Marcador de Gravação / Status */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-slate-950/80 backdrop-blur-md rounded-full px-2.5 py-0.5 border border-white/15 text-[8.5px] font-bold font-mono text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>REC [AUTO]</span>
            </div>

            {/* Caixa de Informação Nutricional IA */}
            <div className="relative z-10 bg-slate-950/95 rounded-xl p-3 border border-white/15 text-[10.5px] font-sans text-white flex flex-col gap-1.5 shadow-lg w-[calc(100%-16px)] mx-auto mb-1.5">
              <div className="flex items-center justify-between text-[#A497FF] font-extrabold tracking-wide text-[10px]">
                <span>🍽️ PRATO DETECTADO</span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <Check className="w-3.5 h-3.5" /> 100%
                </span>
              </div>
              <div className="flex justify-between text-slate-200 border-t border-white/10 pt-1.5 mt-0.5 font-semibold text-[9.5px]">
                <span>Carbo: ~45g</span>
                <span>Prot: ~32g</span>
                <span className="text-emerald-400 font-extrabold">Equilibrado</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 2: CARDÁPIOS PERSONALIZADOS - 3 Colunas                  */}
        {/* ============================================================== */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 p-8 sm:p-9 rounded-[32px] bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_12px_40px_rgba(16,185,129,0.03)] hover:border-emerald-500/50 hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden min-h-[340px] group flex flex-col justify-between"
        >
          {/* Malha de Pontos Decorativa */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-[0.04] pointer-events-none rounded-[32px]" />
          {/* Glow Interno */}
          <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-emerald-500/6 blur-2xl pointer-events-none group-hover:bg-emerald-500/12 transition-all duration-500" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-[0_8px_20px_rgba(16,185,129,0.25)] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/10">
              <Compass className="w-5.5 h-5.5" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] sm:text-xs font-extrabold text-emerald-600 uppercase tracking-widest font-mono bg-emerald-500/12 px-3.5 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_2px_10px_rgba(16,185,129,0.03)]">
              Personalizado 🥗
            </span>
          </div>

          <div className="relative z-10 w-full md:max-w-[58%] mt-auto mb-2">
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-brand-text mb-2.5 group-hover:text-emerald-600 transition-colors duration-300">Cardápios sob medida</h3>
            <p className="text-[14px] sm:text-[15.5px] text-brand-text-secondary font-light leading-relaxed">
              Ideias práticas de pratos que combinam com o que você gosta (e com o seu bolso), respeitando sua rotina sem ingredientes difíceis de achar ou restrições malucas.
            </p>
          </div>

          {/* Cards de Receitas Flutuantes (webp otimizado) */}
          <div className="relative flex flex-col sm:flex-row md:flex-col items-center sm:justify-center md:items-end gap-3 mt-8 mx-auto md:absolute md:right-6 md:bottom-6 pointer-events-none transform translate-y-0 group-hover:-translate-y-1 transition-all duration-500">
            {/* Receita 1: PF Saudável */}
            <div className="px-4.5 py-3 rounded-2xl bg-white border border-slate-200/80 text-[12px] text-slate-800 whitespace-nowrap md:self-end rotate-[-2deg] shadow-[0_8px_25px_rgba(0,0,0,0.04)] flex items-center gap-3 group-hover:rotate-[-4deg] group-hover:-translate-x-2 transition-all duration-500 bg-white/98 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                <img src="/prato_brasileiro.webp" alt="PF Equilibrado" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-slate-900 text-[12px]">PF Equilibrado 🍛</span>
                <span className="text-[10px] font-bold text-emerald-600 mt-0.5">15 min • R$ 12 • 480 kcal</span>
              </div>
            </div>
            {/* Receita 2: Omelete Fit */}
            <div className="px-4.5 py-3 rounded-2xl bg-white border border-slate-200/80 text-[12px] text-slate-800 whitespace-nowrap md:self-end rotate-[2deg] shadow-[0_10px_28px_rgba(0,0,0,0.05)] flex items-center gap-3 group-hover:rotate-[4deg] translate-x-2 transition-all duration-500 bg-white/98 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                <img src="/omelete_fit.webp" alt="Omelete Especial" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-slate-900 text-[12px]">Omelete Especial 🍳</span>
                <span className="text-[10px] font-bold text-orange-600 mt-0.5">8 min • R$ 6 • 290 kcal</span>
              </div>
            </div>
            {/* Receita 3: Panqueca de Aveia */}
            <div className="px-4.5 py-3 rounded-2xl bg-white border border-slate-200/80 text-[12px] text-slate-800 whitespace-nowrap md:self-end rotate-[-1deg] shadow-[0_8px_25px_rgba(0,0,0,0.04)] flex items-center gap-3 group-hover:rotate-[-2deg] group-hover:-translate-x-1.5 transition-all duration-500 bg-white/98 backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                <img src="/panqueca_aveia.webp" alt="Panqueca de Aveia" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-slate-900 text-[12px]">Panqueca de Aveia 🥞</span>
                <span className="text-[10px] font-bold text-[#6352E8] mt-0.5">5 min • R$ 5 • 310 kcal</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 3: ENTENDENDO SEUS DESEJOS - 3 Colunas                     */}
        {/* ============================================================== */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 p-8 sm:p-9 rounded-[32px] bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_12px_40px_rgba(244,63,94,0.03)] hover:border-rose-500/50 hover:shadow-[0_20px_50px_rgba(244,63,94,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden min-h-[340px] group flex flex-col justify-between"
        >
          {/* Malha de Pontos Decorativa */}
          <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-[0.04] pointer-events-none rounded-[32px]" />
          {/* Glow Interno */}
          <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-rose-500/6 blur-2xl pointer-events-none group-hover:bg-rose-500/12 transition-all duration-500" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-[0_8px_20px_rgba(244,63,94,0.25)] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/10">
              <Heart className="w-5.5 h-5.5" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] sm:text-xs font-extrabold text-rose-600 uppercase tracking-widest font-mono bg-rose-500/12 px-3.5 py-1.5 rounded-full border border-rose-500/20 shadow-[0_2px_10px_rgba(244,63,94,0.03)]">
              Acolhimento 🧠
            </span>
          </div>

          <div className="relative z-10 w-full md:max-w-[58%] mt-auto mb-2">
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-brand-text mb-2.5 group-hover:text-rose-600 transition-colors duration-300">Entendendo seus desejos</h3>
            <p className="text-[14px] sm:text-[15.5px] text-brand-text-secondary font-light leading-relaxed">
              A gente sabe que às vezes a comida serve para acalmar um dia difícil. O app te ajuda a notar a diferença entre fome física e ansiedade, com total acolhimento.
            </p>
          </div>

          {/* Gráfico de Fome Física vs Emocional Refinado */}
          <div className="relative mx-auto mt-6 md:absolute md:right-6 md:bottom-8 w-56 p-5 rounded-2xl bg-white border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] pointer-events-none group-hover:scale-105 transition-all duration-500 bg-white/98 backdrop-blur-md">
            <div className="flex justify-between text-[11px] font-bold text-slate-800 mb-2.5 tracking-wide">
              <span className="text-emerald-600 font-extrabold flex items-center gap-1">🟢 FÍSICA (65%)</span>
              <span className="text-[#6352E8] font-extrabold flex items-center gap-1">🟣 ANSIEDADE (35%)</span>
            </div>
            <div className="w-full h-4 bg-[#E7EBF3] rounded-full overflow-hidden flex p-0.5 border border-slate-100">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full w-[65%] transition-all duration-1000" />
              <div className="h-full bg-gradient-to-r from-[#8B7CFF] to-[#7A69FA] rounded-full w-[35%] ml-0.5 transition-all duration-1000" />
            </div>
            <div className="text-[10.5px] text-rose-600 mt-2.5 font-bold text-center group-hover:animate-pulse">
              💬 Dica: Beba um copo d'água primeiro!
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* CARD 4: ESTILO DE VIDA FLEXÍVEL - 3 Colunas                   */}
        {/* ============================================================== */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 p-8 sm:p-9 rounded-[32px] bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_12px_40px_rgba(249,115,22,0.03)] hover:border-orange-500/50 hover:shadow-[0_20px_50px_rgba(249,115,22,0.12)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden min-h-[340px] group flex flex-col justify-between"
        >
          {/* Malha de Pontos Decorativa */}
          <div className="absolute inset-0 bg-[radial-gradient(#f97316_0.8px,transparent_0.8px)] [background-size:16px_16px] opacity-[0.04] pointer-events-none rounded-[32px]" />
          {/* Glow Interno */}
          <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-orange-500/6 blur-2xl pointer-events-none group-hover:bg-orange-500/12 transition-all duration-500" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow-[0_8px_20px_rgba(249,115,22,0.25)] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/10">
              <Star className="w-5.5 h-5.5" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] sm:text-xs font-extrabold text-orange-600 uppercase tracking-widest font-mono bg-orange-500/12 px-3.5 py-1.5 rounded-full border border-orange-500/20 shadow-[0_2px_10px_rgba(249,115,22,0.03)]">
              Flexível 🍕
            </span>
          </div>

          <div className="relative z-10 w-full md:max-w-[58%] mt-auto mb-2">
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-brand-text mb-2.5 group-hover:text-orange-600 transition-colors duration-300">Estilo de vida flexível</h3>
            <p className="text-[14px] sm:text-[15.5px] text-brand-text-secondary font-light leading-relaxed">
              Vai sair no sábado ou tem uma festa? O app te ajuda a planejar o dia seguinte com leveza, para você comer sua pizza sem culpa nenhuma e manter a consistência.
            </p>
          </div>

          {/* Planejamento de Fluxo Flexível Premium com Calendário */}
          <div className="relative mx-auto mt-6 md:absolute md:right-8 md:bottom-8 flex items-center gap-4 pointer-events-none transform translate-y-0 group-hover:scale-105 transition-all duration-500">
            {/* Card Sábado */}
            <div className="px-5 py-4 rounded-2xl bg-white border border-slate-200/80 text-[12.5px] text-slate-800 flex flex-col items-center shadow-[0_8px_25px_rgba(0,0,0,0.04)] bg-white/98 backdrop-blur-md">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sáb</span>
              <span className="text-3xl mt-1.5 select-none drop-shadow-sm filter">🍕</span>
              <span className="text-[10.5px] font-bold text-orange-600 mt-1">Livre</span>
            </div>
            
            {/* Seta Conectora Pulsante */}
            <div className="flex flex-col items-center gap-1.5">
              <ArrowRight className="w-6 h-6 text-orange-500 animate-pulse" />
              <span className="text-[9.5px] font-bold text-slate-500 tracking-wider">BALANCE</span>
            </div>

            {/* Card Domingo */}
            <div className="px-5 py-4 rounded-2xl bg-white border border-slate-200/80 text-[12.5px] text-slate-800 flex flex-col items-center shadow-[0_8px_25px_rgba(0,0,0,0.04)] bg-white/98 backdrop-blur-md">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dom</span>
              <span className="text-3xl mt-1.5 select-none drop-shadow-sm filter">🥗</span>
              <span className="text-[10px] font-bold text-emerald-600 mt-1">Ajuste</span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
