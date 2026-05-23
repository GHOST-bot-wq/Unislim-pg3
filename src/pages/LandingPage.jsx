import React, { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

// Componentes abaixo da dobra importados de forma assíncrona (Lazy Loading / Code Splitting)
const EmotionalShift = React.lazy(() => import('../components/EmotionalShift'));
const ScannerFeature = React.lazy(() => import('../components/ScannerFeature'));
const BentoGrid = React.lazy(() => import('../components/BentoGrid'));
const Experience = React.lazy(() => import('../components/Experience'));
const Testimonials = React.lazy(() => import('../components/Testimonials'));
const CTAFinal = React.lazy(() => import('../components/CTAFinal'));
const Footer = React.lazy(() => import('../components/Footer'));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text relative overflow-x-hidden font-sans noise-bg antialiased">
      {/* Barra de Navegação */}
      <Navbar />

      {/* Grid de Gradientes Ambientais Globais de Fundo */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Seção Principal (Hero) */}
      <Hero />

      {/* Divisor Suave */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-brand-border/60 to-transparent" />
      </div>

      {/* Componentes abaixo da dobra embrulhados em Suspense para fracionar o bundle */}
      <Suspense fallback={<div className="h-40 flex items-center justify-center text-xs text-brand-text-secondary opacity-30">Carregando conteúdo...</div>}>
        {/* Seção 2: Antes vs Depois (Guerra vs Paz) */}
        <EmotionalShift />

        {/* Divisor Suave */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-border/60 to-transparent" />
        </div>

        {/* Seção 3: Scanner Inteligente (Feature Principal) */}
        <ScannerFeature />

        {/* Divisor Suave */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-border/60 to-transparent" />
        </div>

        {/* Seção 4: Bento Grid de Recursos */}
        <BentoGrid />

        {/* Divisor Suave */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-border/60 to-transparent" />
        </div>

        {/* Seção 5: Por que é diferente (Gráficos e Ansiedade vs Consistência) */}
        <Experience />

        {/* Divisor Suave */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-brand-border/60 to-transparent" />
        </div>

        {/* Seção 6: Depoimentos Editoriais */}
        <Testimonials />

        {/* Seção 7: CTA Final Escuro com Glow Intenso */}
        <CTAFinal />

        {/* Rodapé */}
        <Footer />
      </Suspense>
    </div>
  );
}
