import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4 sm:px-12 bg-[#111318] relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo & Marca */}
        <div className="flex items-center gap-2 select-none">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-glow flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display font-semibold text-sm tracking-tight text-white">
            UniSlim
          </span>
        </div>

        {/* Links do Rodapé */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {['Termos de Uso', 'Privacidade', 'Contato', 'Sobre a IA'].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="text-[10px] font-bold text-white/50 hover:text-white transition-colors duration-300 tracking-widest uppercase font-mono"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Direitos Autorais e Isenção de Responsabilidade de IA */}
        <div className="text-center md:text-right">
          <p className="text-[10px] text-white/40 font-light">
            © {new Date().getFullYear()} UniSlim Inc. Todos os direitos reservados.
          </p>
          <p className="text-[9px] text-white/30 mt-1 font-light max-w-xs md:max-w-none">
            UniSlim é uma plataforma de orientação comportamental de estilo de vida auxiliada por inteligência artificial.
          </p>
        </div>

      </div>
    </footer>
  );
}

