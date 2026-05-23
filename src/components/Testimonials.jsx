import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Comi pizza na sexta e o app não me xingou. Parece idiota, mas fez toda a diferença. Perdi 12kg sem aquela culpa que me fazia chutar o balde de vez.",
      author: "Helena Vasconcellos",
      role: "Designer de Interiores",
      duration: "Usuária do UniSlim há 6 meses",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    {
      quote: "Cara, eu só tiro foto do prato e ele me dá um toque de boa, sem sermão ou mandar cortar o pão francês. Parece mais um parceiro do que um fiscal chato.",
      author: "Guilherme Martins",
      role: "Desenvolvedor de Software",
      duration: "Usuário do UniSlim há 4 meses",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section id="depoimentos" className="relative py-10 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* ── 🌌 ILUMINAÇÃO DE FUNDO (Auras Coloridas) ── */}
      <div className="absolute left-[10%] top-[20%] w-[450px] h-[450px] bg-gradient-to-tr from-[#8B7CFF]/5 to-transparent rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute right-[10%] bottom-[20%] w-[450px] h-[450px] bg-gradient-to-bl from-emerald-500/4 to-transparent rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Cabeçalho Editorial */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-24 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-bold text-brand-primary uppercase tracking-widest font-mono bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8B7CFF]" /> Depoimentos Reais
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-display font-extralight text-brand-text tracking-tight leading-[1.15]"
        >
          A calmaria que gera <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8B7CFF] to-[#6352E8]">resultados reais.</span>
        </motion.h2>
      </div>

      {/* Grid de Depoimentos Premium (Carrossel Horizontal de Toque no Mobile) */}
      <div className="flex flex-row overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-2 gap-6 lg:gap-12 relative z-10 max-w-5xl mx-auto pb-8 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 lg:px-0">
        {testimonials.map((test, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            className="flex-shrink-0 w-[85vw] sm:w-[480px] lg:w-auto snap-center flex flex-col justify-between p-8 sm:p-10 rounded-[32px] bg-white/75 border border-white/60 backdrop-blur-xl relative group hover:border-[#8B7CFF]/45 hover:shadow-[0_20px_50px_rgba(139,124,255,0.08)] hover:-translate-y-1.5 transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.02)]"
          >
            {/* Grid de Pontos de Fundo sutil */}
            <div className="absolute inset-0 bg-[radial-gradient(#8b7cff_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-[0.02] pointer-events-none rounded-[32px]" />
            
            {/* Glow Interno no Canto */}
            <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-[#8B7CFF]/4 blur-2xl pointer-events-none group-hover:bg-[#8B7CFF]/8 transition-all duration-500" />

            {/* Ícone de Aspas Editorial Premium */}
            <div className="absolute top-6 right-8 text-[#8B7CFF]/8 select-none pointer-events-none transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
              <Quote className="w-16 h-16 fill-current" strokeWidth={1} />
            </div>

            <div className="relative z-10">
              {/* Estrelas com Glow & Badge de Validação */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-xs drop-shadow-[0_0_3px_rgba(245,158,11,0.4)]">★</span>
                  ))}
                </div>
                <span className="text-[8px] font-extrabold text-[#8B7CFF] bg-[#8B7CFF]/12 border border-[#8B7CFF]/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-2.5 h-2.5" /> História Real
                </span>
              </div>

              {/* Texto Principal do Quote */}
              <p className="text-base sm:text-lg lg:text-[19px] text-slate-700 font-light leading-relaxed font-sans mb-8 group-hover:text-slate-900 transition-colors duration-300">
                "{test.quote}"
              </p>
            </div>

            {/* Rodapé do Card (Perfil do Autor) */}
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6 mt-auto">
              {/* Avatar com Borda Dupla Iluminada */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 group-hover:scale-105 transition-all duration-500 bg-slate-100">
                <img
                  src={test.avatar}
                  alt={test.author}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-display font-bold text-slate-800 transition-colors duration-300 group-hover:text-brand-primary">
                  {test.author}
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5 font-light">
                  {test.role} • <span className="font-semibold text-brand-primary font-mono">{test.duration}</span>
                </p>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
      
    </section>
  );
}
