import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Shield, Check, Camera, Sparkles } from 'lucide-react';
import QuizShell from '../components/quiz/QuizShell';
import QuizOption from '../components/quiz/QuizOption';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { calcularResultados } from '../utils/quizCalculations';
import { supabase } from '../utils/supabaseClient';
import '../styles/quiz.css';

interface QuizState {
  genero: string;
  objetivo: string;
  maior_problema: string;
  tentativas: string;
  conhecimento_calorias: string;
  refeicoes_dia: string;
  peso_atual: string;
  peso_meta: string;
  maior_medo: string;
  comprometimento_foto: string;
  email: string;
}

const INITIAL_STATE: QuizState = {
  genero: '',
  objetivo: '',
  maior_problema: '',
  tentativas: '',
  conhecimento_calorias: '',
  refeicoes_dia: '',
  peso_atual: '',
  peso_meta: '',
  maior_medo: '',
  comprometimento_foto: '',
  email: ''
};

export default function Quiz() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [quizData, setQuizData] = useState<QuizState>(INITIAL_STATE);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isLoadingScreen, setIsLoadingScreen] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState<number>(0);
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  
  // Controle específico da Pergunta 5 (Teste calórico)
  const [calorieGuess, setCalorieGuess] = useState<string>('');
  const [showCalorieFeedback, setShowCalorieFeedback] = useState<boolean>(false);

  // Carregar dados salvos no localStorage no início
  useEffect(() => {
    const saved = localStorage.getItem('unislim_quiz');
    const savedStep = localStorage.getItem('unislim_quiz_step');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuizData(parsed);
        if (parsed.conhecimento_calorias) {
          setCalorieGuess(parsed.conhecimento_calorias);
          setShowCalorieFeedback(true);
        }
      } catch (e) {
        console.error('Erro ao ler dados do localStorage:', e);
      }
    }
    if (savedStep) {
      const step = parseInt(savedStep);
      if (step >= 1 && step <= 10) {
        setCurrentStep(step);
      }
    }
  }, []);

  // Persistir dados no localStorage quando alterados
  const saveToStorage = (updatedState: QuizState, step: number) => {
    localStorage.setItem('unislim_quiz', JSON.stringify(updatedState));
    localStorage.setItem('unislim_quiz_step', step.toString());
  };

  const handleFieldChange = (field: keyof QuizState, value: any) => {
    const updated = { ...quizData, [field]: value };
    setQuizData(updated);
    saveToStorage(updated, currentStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      localStorage.setItem('unislim_quiz_step', prevStep.toString());
      
      // Resetar estados de visualização de feedback se voltar da P5
      if (prevStep !== 5) {
        setShowCalorieFeedback(false);
        setCalorieGuess('');
      }
    }
  };

  const handleNext = () => {
    // Validar etapa atual se necessário
    if (currentStep === 7) {
      const errors: Record<string, string> = {};
      const pesoVal = parseFloat(quizData.peso_atual);
      const metaVal = parseFloat(quizData.peso_meta);

      if (isNaN(pesoVal) || pesoVal < 30 || pesoVal > 300) {
        errors.peso_atual = 'Peso deve ser entre 30kg e 300kg';
      }
      if (isNaN(metaVal) || metaVal < 30) {
        errors.peso_meta = 'Peso meta deve ser no mínimo 30kg';
      } else if (metaVal >= pesoVal) {
        errors.peso_meta = 'Peso meta deve ser menor que seu peso atual';
      }

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    }

    if (currentStep === 10) {
      if (!quizData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quizData.email)) {
        setValidationErrors({ email: 'Por favor, insira um e-mail válido.' });
        return;
      }
      salvarLead();
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    localStorage.setItem('unislim_quiz_step', nextStep.toString());
  };

  // Salvar lead no Supabase
  const salvarLead = async () => {
    setIsSubmittingLead(true);
    const calculos = calcularResultados({
      genero: quizData.genero,
      objetivo: quizData.objetivo,
      peso_atual: parseFloat(quizData.peso_atual) || 75,
      peso_meta: parseFloat(quizData.peso_meta) || 65
    });

    try {
      await supabase.from('leads').insert({
        email: quizData.email,
        genero: quizData.genero,
        objetivo: quizData.objetivo,
        maior_dor: quizData.maior_problema, // mapeado para maior_dor no Supabase
        refeicoes_dia: quizData.refeicoes_dia ? parseInt(quizData.refeicoes_dia.replace(/\D/g, '')) || 3 : 3,
        conhecimento_calorias: quizData.conhecimento_calorias,
        peso_atual: parseFloat(quizData.peso_atual) || null,
        peso_meta: parseFloat(quizData.peso_meta) || null,
        maior_medo: quizData.maior_medo,
        comprometimento_foto: quizData.comprometimento_foto,
        imc: calculos.imc,
        calorias_meta: calculos.caloriasAlvo,
        semanas_estimadas: calculos.semanas,
      });
    } catch (error) {
      console.error('Erro ao salvar lead no Supabase:', error);
    }

    setIsSubmittingLead(false);
    startLoadingScreen();
  };

  const startLoadingScreen = () => {
    setIsLoadingScreen(true);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 2;
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/resultado');
        }, 300);
      }
    }, 100); // 5000ms / 50 = 100ms

    const msgInterval = setInterval(() => {
      setLoadingMessageIdx(prev => (prev < 5 ? prev + 1 : prev));
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
    };
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1: return !!quizData.genero;
      case 2: return !!quizData.objetivo;
      case 3: return !!quizData.maior_problema;
      case 4: return !!quizData.tentativas;
      case 5: return !!quizData.conhecimento_calorias;
      case 6: return !!quizData.refeicoes_dia;
      case 7:
        const peso = parseFloat(quizData.peso_atual);
        const meta = parseFloat(quizData.peso_meta);
        return !validationErrors.peso_atual && !validationErrors.peso_meta && peso >= 30 && peso <= 300 && meta >= 30 && meta < peso;
      case 8: return !!quizData.maior_medo;
      case 9: return !!quizData.comprometimento_foto;
      case 10: return !!quizData.email && !validationErrors.email;
      default: return false;
    }
  };

  // Auto-avanço da Pergunta 1
  useEffect(() => {
    if (currentStep === 1 && quizData.genero) {
      const timer = setTimeout(() => {
        handleNext();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [quizData.genero]);

  const loadingMessages = [
    "📸 Calibrando seu scanner pessoal de IA...",
    "🧬 Calculando sua meta calórica diária...",
    "🍽️ Mapeando os alimentos da sua rotina...",
    "📊 Calculando sua projeção de emagrecimento...",
    "🤖 Configurando seu assistente nutricional...",
    "✅ Tudo pronto! Abrindo seu plano..."
  ];

  // Cálculo dinâmico para o card da P7
  const pesoDif = quizData.peso_atual && quizData.peso_meta
    ? (parseFloat(quizData.peso_atual) - parseFloat(quizData.peso_meta)).toFixed(1)
    : null;

  const semanasMeta = pesoDif && parseFloat(pesoDif) > 0
    ? Math.ceil(parseFloat(pesoDif) / 0.75)
    : null;

  const resultadosCalcs = quizData.peso_atual && quizData.peso_meta && quizData.genero
    ? calcularResultados({
        peso_atual: parseFloat(quizData.peso_atual),
        peso_meta: parseFloat(quizData.peso_meta),
        genero: quizData.genero
      })
    : null;

  const getNextButtonText = () => {
    if (currentStep === 9) return 'Ver meu plano calórico →';
    if (currentStep === 10) return 'Ver meu plano calórico →';
    return 'Continuar';
  };

  const handleCalorieSelect = (label: string) => {
    setCalorieGuess(label);
    setShowCalorieFeedback(true);
    handleFieldChange('conhecimento_calorias', label);
  };

  if (isLoadingScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1A1A2E] to-[#2D1B69] text-white p-6 relative overflow-hidden select-none">
        {/* Glow ambientado de fundo */}
        <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#7B6FE8]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-[#A78BFA]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-sm flex flex-col items-center text-center z-10">
          {/* Câmera IA Animada */}
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-10 brain-pulse-anim">
            <Camera className="w-12 h-12 text-[#7B6FE8]" />
          </div>

          <h2 className="text-[22px] font-bold tracking-tight mb-2">
            📸 Criando seu perfil calórico...
          </h2>
          <p className="text-sm text-slate-300 opacity-90 max-w-[280px] leading-relaxed mb-10">
            Analisando +10.000 perfis similares ao seu...
          </p>

          {/* Barra de progresso */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-3.5">
            <div
              className="h-full bg-gradient-to-r from-[#7B6FE8] to-[#A78BFA] rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <span className="text-xs text-[#9CA3AF] font-mono mb-12">
            {loadingProgress}%
          </span>

          {/* Cards Rotativos Glassmorphism */}
          <div className="relative w-full h-[68px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={loadingMessageIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full py-4.5 px-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left flex items-center gap-3.5 shadow-xl"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#7B6FE8] animate-ping" />
                <span className="text-sm font-semibold text-white/95">
                  {loadingMessages[loadingMessageIdx]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-8 text-center text-[11px] text-slate-400 font-medium">
          Baseado em dados de +10.847 usuários com perfil similar
        </div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS.find(q => q.id === currentStep);

  return (
    <QuizShell
      currentQuestion={currentStep}
      totalQuestions={10}
      onBack={handleBack}
      onNext={handleNext}
      isNextDisabled={!isCurrentStepValid()}
      nextButtonText={getNextButtonText()}
      isSubmitting={isSubmittingLead}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -25 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col gap-6"
        >
          {/* Header da pergunta */}
          <div className="flex flex-col items-center text-center">
            <span className="quiz-pill-badge mb-3.5">{question?.chip}</span>
            <h1 className="text-[25px] font-bold text-[#1A1A2E] leading-tight mb-2 tracking-tight">
              {question?.headline}
            </h1>
            <p className="text-[14.5px] text-[#4B5563] leading-relaxed max-w-[340px]">
              {question?.subtext}
            </p>
          </div>

          {/* Opções ou Inputs */}
          <div className="flex flex-col gap-3">
            {/* PERGUNTA 1 — GÊNERO */}
            {currentStep === 1 && question?.options && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                {question.options.map(opt => (
                  <QuizOption
                    key={opt.id}
                    option={opt}
                    selected={quizData.genero === opt.label}
                    onClick={() => handleFieldChange('genero', opt.label)}
                    type="horizontal-grid"
                  />
                ))}
              </div>
            )}

            {/* PERGUNTA 2 — OBJETIVO */}
            {currentStep === 2 && question?.options && (
              <div className="flex flex-col gap-3.5 mt-2">
                {question.options.map(opt => (
                  <QuizOption
                    key={opt.id}
                    option={opt}
                    selected={quizData.objetivo === opt.label}
                    onClick={() => handleFieldChange('objetivo', opt.label)}
                  />
                ))}
              </div>
            )}

            {/* PERGUNTA 3 — MAIOR PROBLEMA */}
            {currentStep === 3 && question?.options && (
              <div className="flex flex-col gap-3.5 mt-2">
                {question.options.map(opt => (
                  <QuizOption
                    key={opt.id}
                    option={opt}
                    selected={quizData.maior_problema === opt.label}
                    onClick={() => handleFieldChange('maior_problema', opt.label)}
                  />
                ))}

                {/* Insight do Maior Problema */}
                {quizData.maior_problema && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4.5 rounded-2xl bg-[#EEECFF] border border-[#7B6FE8]/30 mt-2 text-left"
                  >
                    <p className="text-sm font-semibold text-[#1A1A2E] leading-relaxed">
                      {question.options.find(o => o.label === quizData.maior_problema)?.insight}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* PERGUNTA 4 — TENTATIVAS ANTERIORES */}
            {currentStep === 4 && question?.options && (
              <div className="flex flex-col gap-3.5 mt-2">
                {question.options.map(opt => (
                  <QuizOption
                    key={opt.id}
                    option={opt}
                    selected={quizData.tentativas === opt.label}
                    onClick={() => handleFieldChange('tentativas', opt.label)}
                  />
                ))}

                {/* Insight das Tentativas */}
                {quizData.tentativas && question.options.find(o => o.label === quizData.tentativas)?.insight && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4.5 rounded-2xl bg-[#EEECFF] border border-[#7B6FE8]/30 mt-2 text-left"
                  >
                    <p className="text-sm font-semibold text-[#1A1A2E] leading-relaxed">
                      {question.options.find(o => o.label === quizData.tentativas)?.insight}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* PERGUNTA 5 — TESTE CALÓRICO */}
            {currentStep === 5 && question?.options && (
              <div className="flex flex-col gap-5 mt-2">
                {/* Imagem do prato */}
                <div className="w-full h-48 bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-sm relative flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80"
                    alt="Arroz, feijão e frango típico"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    🍽️ Arroz, feijão e peito de frango
                  </div>
                </div>

                <div className="text-center font-semibold text-[#1A1A2E] text-sm">
                  Quanto você acha que tem?
                </div>

                {/* Grid 2x2 de Palpites */}
                <div className="grid grid-cols-2 gap-3">
                  {question.options.map(opt => {
                    const isSelected = calorieGuess === opt.label;
                    const isCorrect = opt.id === '680';
                    let btnStyle = 'border-[#E5E7EB] bg-white text-[#1A1A2E] hover:border-[#7B6FE8]/50';

                    if (showCalorieFeedback) {
                      if (isCorrect) {
                        btnStyle = 'border-green-500 bg-green-50 text-green-700 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'border-red-500 bg-red-50 text-red-700 font-bold';
                      } else {
                        btnStyle = 'border-[#E5E7EB] bg-white/70 text-[#9CA3AF] cursor-not-allowed';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => !showCalorieFeedback && handleCalorieSelect(opt.label)}
                        disabled={showCalorieFeedback}
                        type="button"
                        className={`h-13 rounded-2xl border-2 text-center transition-all duration-300 font-semibold text-sm ${btnStyle}`}
                      >
                        {opt.label}
                        {showCalorieFeedback && isCorrect && ' ✓'}
                        {showCalorieFeedback && isSelected && !isCorrect && ' ✗'}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Card */}
                {showCalorieFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl text-left border shadow-sm ${
                      calorieGuess.includes('680')
                        ? 'bg-green-50/80 border-green-200'
                        : 'bg-[#EEECFF] border-[#7B6FE8]/30'
                    }`}
                  >
                    {calorieGuess.includes('680') ? (
                      <p className="text-sm font-semibold text-[#1A1A2E] leading-relaxed">
                        🎉 <span className="text-green-600 font-bold">Incrível!</span> Você tem um bom senso calórico. Com o UniSlim você confirma isso em segundos para cada refeição do dia. 📸
                      </p>
                    ) : (
                      <p className="text-sm font-semibold text-[#1A1A2E] leading-relaxed animate-fade-in">
                        💡 <span className="text-[#7B6FE8] font-bold">Interessante!</span> Esse prato tem ~680 kcal. A maioria das pessoas erra por 200-300 kcal. É exatamente por isso que ver os números reais faz toda a diferença. 📊
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {/* PERGUNTA 6 — REFEIÇÕES POR DIA */}
            {currentStep === 6 && question?.options && (
              <div className="flex flex-col gap-4 mt-2">
                <div className="grid grid-cols-2 gap-3.5">
                  {question.options.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleFieldChange('refeicoes_dia', opt.label)}
                      type="button"
                      className={`age-grid-button ${quizData.refeicoes_dia === opt.label ? 'selected' : ''}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Insight do metabolismo de refeições */}
                {quizData.refeicoes_dia && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4.5 rounded-2xl bg-[#EEECFF] border border-[#7B6FE8]/30 mt-2 text-left text-sm font-semibold text-[#1A1A2E] leading-relaxed"
                  >
                    Com {quizData.refeicoes_dia.toLowerCase()}, você terá <span className="text-[#7B6FE8] font-bold font-mono">{
                      quizData.refeicoes_dia.replace(/\D/g, '') || '3'
                    }</span> oportunidades por dia de fotografar e entender exatamente o que está comendo sem precisar digitar nada. 📸
                  </motion.div>
                )}
              </div>
            )}

            {/* PERGUNTA 7 — PESO ATUAL E META */}
            {currentStep === 7 && (
              <div className="flex flex-col gap-5 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  {/* Peso Atual */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-sm font-semibold text-[#1A1A2E]" htmlFor="current-weight-input">
                      Peso atual (kg)
                    </label>
                    <input
                      id="current-weight-input"
                      type="number"
                      placeholder="80"
                      className={`h-15 w-full bg-white border rounded-2xl text-center font-mono text-[28px] font-bold text-[#1A1A2E] outline-none transition-all input-no-spinners ${
                        validationErrors.peso_atual
                          ? 'border-red-500 focus:border-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.15)]'
                          : 'border-[#E5E7EB] focus:border-[#7B6FE8] focus:shadow-[0_0_0_3px_rgba(123,111,232,0.15)]'
                      }`}
                      value={quizData.peso_atual}
                      maxLength={3}
                      onChange={(e) => {
                        const val = e.target.value.slice(0, 3);
                        setValidationErrors(p => {
                          const n = { ...p };
                          delete n.peso_atual;
                          return n;
                        });
                        handleFieldChange('peso_atual', val);
                      }}
                    />
                    {validationErrors.peso_atual && (
                      <span className="text-[12px] font-medium text-red-500">{validationErrors.peso_atual}</span>
                    )}
                  </div>

                  {/* Peso Meta */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-sm font-semibold text-[#1A1A2E]" htmlFor="target-weight-input">
                      Peso desejado (kg)
                    </label>
                    <input
                      id="target-weight-input"
                      type="number"
                      placeholder="70"
                      className={`h-15 w-full bg-white border rounded-2xl text-center font-mono text-[28px] font-bold text-[#1A1A2E] outline-none transition-all input-no-spinners ${
                        validationErrors.peso_meta
                          ? 'border-red-500 focus:border-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.15)]'
                          : 'border-[#E5E7EB] focus:border-[#7B6FE8] focus:shadow-[0_0_0_3px_rgba(123,111,232,0.15)]'
                      }`}
                      value={quizData.peso_meta}
                      maxLength={3}
                      onChange={(e) => {
                        const val = e.target.value.slice(0, 3);
                        setValidationErrors(p => {
                          const n = { ...p };
                          delete n.peso_meta;
                          return n;
                        });
                        handleFieldChange('peso_meta', val);
                      }}
                    />
                    {validationErrors.peso_meta && (
                      <span className="text-[12px] font-medium text-red-500">{validationErrors.peso_meta}</span>
                    )}
                  </div>
                </div>

                {/* Card do Objetivo e Calorias (Slide-Up) */}
                {resultadosCalcs && !validationErrors.peso_atual && !validationErrors.peso_meta && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm text-left flex flex-col gap-3.5"
                  >
                    <span className="text-sm font-extrabold text-[#1A1A2E] flex items-center gap-1.5">
                      🎯 Seu objetivo: perder <span className="font-mono text-base font-extrabold text-[#7B6FE8]">{pesoDif}kg</span>
                    </span>

                    <div className="flex flex-col gap-2.5 text-xs text-[#4B5563] font-medium">
                      <p className="leading-relaxed flex items-start gap-2">
                        <span className="text-[#7B6FE8] select-none mt-0.5">📸</span>
                        <span>
                          Fotografando suas refeições, você pode chegar lá em <span className="font-bold text-[#1A1A2E] font-mono">{semanasMeta} semanas</span> de forma saudável.
                        </span>
                      </p>
                      <p className="leading-relaxed flex items-start gap-2">
                        <span className="text-[#7B6FE8] select-none mt-0.5">🔥</span>
                        <span>
                          Sua meta calórica diária calculada: <span className="font-extrabold text-[#7B6FE8] text-[13px] font-mono">~{resultadosCalcs.caloriasAlvo} kcal/dia</span>.
                        </span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* PERGUNTA 8 — MAIOR MEDO / OBJEÇÃO */}
            {currentStep === 8 && question?.options && (
              <div className="flex flex-col gap-3.5 mt-2">
                {question.options.map(opt => (
                  <QuizOption
                    key={opt.id}
                    option={opt}
                    selected={quizData.maior_medo === opt.label}
                    onClick={() => handleFieldChange('maior_medo', opt.label)}
                  />
                ))}

                {/* Insight do Maior Medo */}
                {quizData.maior_medo && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4.5 rounded-2xl bg-[#EEECFF] border border-[#7B6FE8]/30 mt-2 text-left"
                  >
                    <p className="text-sm font-semibold text-[#1A1A2E] leading-relaxed">
                      {question.options.find(o => o.label === quizData.maior_medo)?.insight}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* PERGUNTA 9 — COMPROMETIMENTO FOTO */}
            {currentStep === 9 && question?.options && (
              <div className="flex flex-col gap-5 mt-2">
                {/* SVG de Câmera Animada no Centro */}
                <div className="flex justify-center py-4">
                  <div className="w-24 h-24 rounded-full bg-[#EEECFF] flex items-center justify-center relative btn-pulse-glow shadow-md">
                    <Camera className="w-11 h-11 text-[#7B6FE8]" />
                  </div>
                </div>

                <div className="flex flex-col gap-3.5">
                  {question.options.map(opt => (
                    <QuizOption
                      key={opt.id}
                      option={opt}
                      selected={quizData.comprometimento_foto === opt.label}
                      onClick={() => handleFieldChange('comprometimento_foto', opt.label)}
                    />
                  ))}
                </div>

                {/* Insight de comprometimento */}
                {quizData.comprometimento_foto && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4.5 rounded-2xl bg-[#EEECFF] border border-[#7B6FE8]/30 mt-2 text-left"
                  >
                    <p className="text-sm font-semibold text-[#1A1A2E] leading-relaxed">
                      {question.options.find(o => o.label === quizData.comprometimento_foto)?.insight}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {/* PERGUNTA 10 — EMAIL (captura de lead) */}
            {currentStep === 10 && (
              <div className="flex flex-col gap-5 mt-2">
                {/* Preview Card */}
                <div className="p-5.5 rounded-3xl border border-[#7B6FE8]/30 bg-gradient-to-r from-[#EEECFF] to-[#EEECFF]/40 text-left flex flex-col gap-3.5 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#7B6FE8]">
                    📊 SEU PLANO CALÓRICO PREPARADO
                  </span>
                  <div className="flex flex-col gap-1.5 text-xs text-[#1A1A2E] font-semibold">
                    <div className="flex justify-between font-mono">
                      <span>Meta Diária:</span>
                      <span className="text-[#7B6FE8]">~{resultadosCalcs?.caloriasAlvo || 1700} kcal/dia</span>
                    </div>
                    <div className="flex justify-between font-mono">
                      <span>Meta de Peso:</span>
                      <span>Perder {pesoDif || 10}kg em {semanasMeta || 12} sem.</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded w-fit border border-green-200 mt-1">
                      Scanner IA incluso ✅
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-left relative">
                  <label className="text-sm font-semibold text-[#1A1A2E]" htmlFor="lead-email-input">
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="lead-email-input"
                      type="email"
                      placeholder="seu@email.com"
                      className={`h-14 pl-12 pr-4 w-full bg-white border rounded-2xl font-medium text-[#1A1A2E] placeholder:text-[#9CA3AF] outline-none transition-all ${
                        validationErrors.email
                          ? 'border-red-500 focus:border-red-500 shadow-[0_0_0_2px_rgba(239,68,68,0.15)]'
                          : 'border-[#E5E7EB] focus:border-[#7B6FE8] focus:shadow-[0_0_0_3px_rgba(123,111,232,0.15)]'
                      }`}
                      value={quizData.email}
                      onChange={(e) => {
                        const val = e.target.value;
                        setValidationErrors(p => {
                          const n = { ...p };
                          delete n.email;
                          return n;
                        });
                        handleFieldChange('email', val);
                      }}
                    />
                  </div>
                  {validationErrors.email && (
                    <span className="text-[12px] font-medium text-red-500">{validationErrors.email}</span>
                  )}
                </div>

                {/* Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer text-left py-1">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-1 w-4 h-4 text-[#7B6FE8] border-gray-300 rounded focus:ring-[#7B6FE8]"
                  />
                  <span className="text-[13px] text-[#4B5563] font-medium select-none">
                    Aceito receber dicas e novidades do UniSlim.
                  </span>
                </label>

                {/* Privacy note */}
                <div className="flex items-center justify-center gap-2 p-3 bg-slate-100 rounded-xl text-[11px] text-[#9CA3AF]">
                  <span>🔒 Privado e seguro. Sem spam.</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </QuizShell>
  );
}
