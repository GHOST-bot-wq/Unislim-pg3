import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 h-16 sm:h-20 bg-brand-bg/60 backdrop-blur-md border-b border-brand-border/40 z-50 flex items-center justify-between px-4 sm:px-12 max-w-7xl mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-2 select-none group">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-glow flex items-center justify-center shadow-md shadow-brand-primary/10 transition-transform duration-500 group-hover:rotate-[10deg]">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-display font-semibold text-xl tracking-tight text-brand-text">
          UniSlim
        </span>
      </div>

      {/* Navigation Links - Minimalist & Elegant */}
      <div className="hidden md:flex items-center gap-8">
        {['O Método', 'Scanner IA', 'Recursos', 'A Diferença', 'Depoimentos'].map((item, idx) => (
          <a
            key={idx}
            href={`#${['metodo', 'scanner', 'recursos', 'diferenca', 'depoimentos'][idx]}`}
            className="text-[13px] font-semibold text-brand-text-secondary hover:text-brand-text transition-colors duration-300 tracking-wide uppercase"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Action Button */}
      <div>
        <Link
          to="/quiz"
          className="relative inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-full btn-secondary-premium btn-shine-effect text-[13px] font-semibold text-brand-text transition-all duration-300 overflow-hidden"
        >
          Começar agora
        </Link>
      </div>
    </nav>
  );
}
