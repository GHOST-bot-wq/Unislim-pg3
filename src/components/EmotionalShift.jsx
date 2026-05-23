import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Smile, Ban, Compass, Brain, RefreshCw, Star, Heart } from 'lucide-react';

export default function EmotionalShift() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="metodo" className="relative py-10 sm:py-32 px-4 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* ── 🌌 AURA LUMINOSA DA MUDANÇA EMOCIONAL (Aura Core) ── */}
      <div className="absolute right-[-10%] top-[40%] w-[450px] h-[450px] bg-[#8B7CFF]/3 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute left-[5%] bottom-[10%] w-[350px] h-[350px] bg-[#A497FF]/2 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Cabeçalho da Seção (Estilo Editorial Premium) */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-28 relative z-10">
        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest font-display bg-brand-primary/10 px-4 py-1.5 rounded-full inline-block mb-5">
          A Abordagem Comportamental
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extralight text-brand-text tracking-tight leading-[1.1] mb-5">
          Você não precisa mais viver em <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8B7CFF] to-[#6352E8]">guerra com a comida</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-[19px] text-brand-text-secondary font-light leading-relaxed max-w-2xl mx-auto">
          O problema nunca foi a sua falta de força de vontade, mas sim a imposição de regras incompatíveis com a vida real. Veja a diferença:
        </p>
      </div>

      {/* Grid de Comparação Minimalista Lado a Lado (Borderless) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col md:flex-row items-stretch gap-8 md:gap-8 relative z-10"
      >
        
        {/* LADO ESQUERDO: Abordagem Tradicional (A Guerra) */}
        <motion.div
          variants={itemVariants}
          className="flex-1 p-6 sm:p-10 rounded-[32px] bg-gradient-to-b from-white to-[#FFFBFB] border-2 border-rose-500/40 shadow-[0_24px_55px_rgba(239,68,68,0.12)] hover:border-rose-500/80 hover:shadow-[0_30px_70px_rgba(239,68,68,0.18)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Tag de destaque premium com glow neon permanente (Tradicional) */}
          <div className="absolute -top-1.5 right-6 sm:right-8 px-4.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-[#FF8B8B] text-white text-[8px] font-extrabold uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.3)] z-20">
            Regras e Restrições
          </div>

          <div>
            <div className="flex items-center gap-3.5 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-[#FF8B8B] flex items-center justify-center text-white shadow-[0_8px_20px_rgba(239,68,68,0.15)]">
                <Ban className="w-4.5 h-4.5" strokeWidth={1.5} />
              </div>
              <span className="text-[8px] font-bold font-mono uppercase tracking-widest text-rose-500 bg-rose-500/15 px-3 py-1 rounded-full border border-rose-500/30">
                Abordagem Tradicional
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[#111318] mb-8 tracking-tight">
              O modelo de punição e contagem obsessiva
            </h3>

            <div className="space-y-6">
              {[
                { title: 'Aviso vermelho', desc: 'O app te dando bronca por causa de um pedaço de chocolate.', icon: ShieldAlert },
                { title: 'Pode ou não pode', desc: 'Regras chatas que só fazem você pensar no que é proibido.', icon: Ban },
                { title: 'Efeito sanfona', desc: 'Passar fome hoje para ter um ataque de ansiedade na geladeira amanhã.', icon: RefreshCw },
                { title: 'Calculadora no prato', desc: 'Ficar somando números em vez de curtir um jantar com a família.', icon: Brain }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group p-2 rounded-xl hover:bg-rose-500/5 transition-colors duration-300">
                  <div className="w-5 h-5 rounded-full border border-rose-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 bg-white shadow-sm group-hover:border-rose-500 transition-colors duration-300">
                    <item.icon className="w-3 h-3 text-rose-500 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </div>
                  <div className="text-[14px] sm:text-[15.5px] leading-relaxed">
                    <span className="font-semibold text-rose-500 group-hover:text-rose-600 transition-colors">{item.title}:</span>
                    <span className="text-brand-text-secondary font-light"> {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E7EBF3]/60 text-xs sm:text-[13px] font-mono tracking-wide text-rose-500 uppercase font-bold">
            Sensação: <span className="italic font-light">"Comi... mas com um peso terrível na consciência."</span>
          </div>
        </motion.div>

        {/* LADO DIREITO: UniSlim (A Paz) */}
        <motion.div
          variants={itemVariants}
          className="flex-1 p-6 sm:p-10 rounded-[32px] bg-gradient-to-b from-white to-[#FBFBFF] border-2 border-[#8B7CFF]/50 shadow-[0_24px_55px_rgba(139,124,255,0.15)] hover:border-[#8B7CFF]/85 hover:shadow-[0_30px_70px_rgba(139,124,255,0.22)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Tag de destaque premium com glow neon permanente */}
          <div className="absolute -top-1.5 right-6 sm:right-8 px-4.5 py-1.5 rounded-full bg-gradient-to-r from-brand-primary to-[#A497FF] text-white text-[8px] font-extrabold uppercase tracking-widest shadow-[0_0_20px_rgba(139,124,255,0.45)] z-20">
            Caminho Leve e Recomendado
          </div>

          <div>
            <div className="flex items-center gap-3.5 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-[#A497FF] flex items-center justify-center text-white shadow-[0_8px_20px_rgba(139,124,255,0.3)]">
                <Smile className="w-4.5 h-4.5" strokeWidth={1.5} />
              </div>
              <span className="text-[8px] font-bold font-mono uppercase tracking-widest text-[#8B7CFF] bg-[#8B7CFF]/15 px-3 py-1 rounded-full border border-[#8B7CFF]/30">
                Com o UniSlim
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[#111318] mb-8 tracking-tight">
              O emagrecimento consciente, calmo e acolhedor
            </h3>

            <div className="space-y-6">
              {[
                { title: 'Olhar amigo', desc: 'Ver o que seu prato tem de bom, sem julgamentos ou sermão.', icon: Smile },
                { title: 'Ouvir o corpo', desc: 'Toques simples para perceber quando você já está satisfeito.', icon: Compass },
                { title: 'Sua vida normal', desc: 'Dicas que se adaptam à sua rotina real, inclusive na pizzaria.', icon: Heart },
                { title: 'Evolução sem neura', desc: 'Acompanhar o seu progresso sem ficar escravo da balança todo dia.', icon: Star }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group p-2 rounded-xl hover:bg-brand-primary/5 transition-colors duration-300">
                  <div className="w-5 h-5 rounded-full border border-brand-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 bg-white shadow-sm group-hover:border-[#8B7CFF]/50 transition-colors duration-300">
                    <item.icon className="w-3 h-3 text-brand-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  </div>
                  <div className="text-[14px] sm:text-[15.5px] leading-relaxed">
                    <span className="font-semibold text-brand-primary group-hover:text-brand-primary transition-colors">{item.title}:</span>
                    <span className="text-brand-text-secondary font-light"> {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E7EBF3]/60 text-xs sm:text-[13px] font-mono tracking-wide text-brand-primary uppercase font-bold">
            Sensação: <span className="italic font-light">"Finalmente um app que me entende e não me pune."</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}

