import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import QuizProgress from './QuizProgress';

interface QuizShellProps {
  currentQuestion: number;
  totalQuestions: number;
  onBack: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
  nextButtonText?: string;
  isSubmitting?: boolean;
  children: React.ReactNode;
}

export default function QuizShell({
  currentQuestion,
  totalQuestions,
  onBack,
  onNext,
  isNextDisabled,
  nextButtonText = 'Continuar',
  isSubmitting = false,
  children
}: QuizShellProps) {
  return (
    <div className="min-h-screen bg-[#F0F0F8] flex flex-col quiz-container select-none">
      {/* ── TOPO FIXO ── */}
      <header className="sticky top-0 bg-white shadow-sm z-50 flex flex-col border-b border-[#E5E7EB]/50">
        <div className="h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between max-w-lg w-full mx-auto">
          {/* Botão Voltar */}
          <div className="w-10">
            {currentQuestion > 1 && (
              <button
                onClick={onBack}
                type="button"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#4B5563] hover:bg-slate-100 transition-colors"
                aria-label="Voltar para a pergunta anterior"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Logo Central */}
          <div className="flex items-center gap-1.5 font-display font-semibold text-lg text-[#1A1A2E]">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#7B6FE8] to-[#A78BFA] flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>UniSlim</span>
          </div>

          {/* Contador de Perguntas */}
          <div className="w-10 text-right">
            <span className="text-[13px] font-medium text-[#9CA3AF] font-mono">
              {currentQuestion}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Barra de Progresso */}
        <QuizProgress current={currentQuestion} total={totalQuestions} />
      </header>

      {/* ── ÁREA DE CONTEÚDO (ROLÁVEL E CENTRALIZADA) ── */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:py-8 flex justify-center items-start">
        <div className="w-full max-w-[480px] flex flex-col h-full">
          {children}
        </div>
      </main>

      {/* ── RODAPÉ FIXO ── */}
      <footer className="sticky bottom-0 bg-white border-t border-[#E5E7EB] py-4 px-5 pb-6 sm:pb-8 z-40">
        <div className="max-w-[480px] mx-auto flex flex-col items-center gap-3">
          <button
            onClick={onNext}
            disabled={isNextDisabled || isSubmitting}
            type="button"
            className={`w-full h-13 sm:h-14 flex items-center justify-center gap-2 rounded-full font-semibold text-base transition-all duration-300 ${
              isNextDisabled
                ? 'bg-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-[#7B6FE8] to-[#6358D4] text-white hover:translate-y-[-1px] shadow-[0_4px_14px_rgba(123,111,232,0.4)] active:translate-y-[1px]'
            } ${nextButtonText.includes('Ver meu plano') ? 'btn-pulse-glow' : ''}`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {nextButtonText}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <span className="text-[11px] text-[#9CA3AF] flex items-center gap-1">
            <span>🔒</span> Suas respostas são privadas e seguras
          </span>
        </div>
      </footer>
    </div>
  );
}
