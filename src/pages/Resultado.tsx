import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Sparkles, Clock, ArrowRight, ShieldCheck, Heart, Camera, Cpu, BarChart3, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { calcularResultados } from '../utils/quizCalculations';
import '../styles/quiz.css';

export default function Resultado() {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<any>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos padrão

  // Carregar dados salvos no localStorage
  useEffect(() => {
    const saved = localStorage.getItem('unislim_quiz');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuizData(parsed);
      } catch (e) {
        console.error('Erro ao ler dados do localStorage:', e);
      }
    } else {
      navigate('/quiz');
    }
  }, [navigate]);

  // Tratar o confetti ao carregar a página
  useEffect(() => {
    if (quizData) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 999 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#7B6FE8', '#A78BFA', '#FFFFFF'] });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#7B6FE8', '#A78BFA', '#FFFFFF'] });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [quizData]);

  // Tratar timer regressivo persistente no localStorage
  useEffect(() => {
    const savedEndTime = localStorage.getItem('unislim_timer_end');
    let endTime: number;

    if (savedEndTime) {
      endTime = parseInt(savedEndTime, 10);
      const remaining = Math.round((endTime - Date.now()) / 1000);
      if (remaining <= 0) {
        endTime = Date.now() + 15 * 60 * 1000;
        localStorage.setItem('unislim_timer_end', endTime.toString());
        setTimeLeft(900);
      } else {
        setTimeLeft(remaining);
      }
    } else {
      endTime = Date.now() + 15 * 60 * 1000;
      localStorage.setItem('unislim_timer_end', endTime.toString());
      setTimeLeft(900);
    }

    const timer = setInterval(() => {
      const remaining = Math.round((endTime - Date.now()) / 1000);
      if (remaining <= 0) {
        const newEndTime = Date.now() + 15 * 60 * 1000;
        localStorage.setItem('unislim_timer_end', newEndTime.toString());
        setTimeLeft(900);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F0F8]">
        <div className="w-8 h-8 border-4 border-[#7B6FE8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Resultados dos cálculos
  const res = calcularResultados({
    genero: quizData.genero,
    objetivo: quizData.objetivo,
    peso_atual: parseFloat(quizData.peso_atual) || 80,
    peso_meta: parseFloat(quizData.peso_meta) || 70
  });

  const pesoAtualVal = parseFloat(quizData.peso_atual) || 80;
  const pesoMetaVal = parseFloat(quizData.peso_meta) || 70;

  // Obter texto de dor mapeado da Pergunta 3
  const getDorLabel = () => {
    const label = quizData.maior_problema || '';
    if (label.includes('Não sei quantas calorias')) return 'não sabe quantas calorias está comendo';
    if (label.includes('muito trabalhoso')) return 'acha contar calorias manualmente muito trabalhoso e cansativo';
    if (label.includes('peso não sai')) return 'sente que come bem mas o peso simplesmente não sai';
    if (label.includes('consistência')) return 'não consegue manter consistência no controle da alimentação';
    if (label.includes('Não sei por onde')) return 'está perdida(o) e sem saber por onde começar';
    return 'sente dificuldades em mensurar o que consome';
  };

  const getDorPercent = () => {
    const label = quizData.maior_problema || '';
    if (label.includes('Não sei quantas calorias')) return 92;
    if (label.includes('muito trabalhoso')) return 96;
    if (label.includes('peso não sai')) return 89;
    if (label.includes('consistência')) return 94;
    return 91;
  };

  // Gráfico de projeção semanal
  const generateChartData = () => {
    const data = [];
    const diff = pesoAtualVal - pesoMetaVal;
    
    // Marcos: Semana 0, 2, 4, 8, 12
    const marcos = [0, 2, 4, 8, 12];
    
    marcos.forEach(sem => {
      // Perda estimada com UniSlim: linear e saudável até a meta
      const perdaSlim = Math.min(diff, sem * 0.75);
      const pesoSlim = Number((pesoAtualVal - perdaSlim).toFixed(1));

      // Sem controle: peso flutua e sobe
      let pesoSemPlano = pesoAtualVal;
      if (sem === 2) pesoSemPlano = Number((pesoAtualVal - 0.8).toFixed(1));
      else if (sem === 4) pesoSemPlano = Number((pesoAtualVal + 0.4).toFixed(1));
      else if (sem === 8) pesoSemPlano = Number((pesoAtualVal - 0.2).toFixed(1));
      else if (sem === 12) pesoSemPlano = Number((pesoAtualVal + 1.5).toFixed(1));

      data.push({
        name: `Sem. ${sem}`,
        "Com UniSlim": pesoSlim,
        "Sem controle": pesoSemPlano
      });
    });

    return data;
  };

  const chartData = generateChartData();

  // Formatar tempo regressivo (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckout = () => {
    setCheckoutLoading(true);
    setTimeout(() => {
      const checkoutUrl = import.meta.env.VITE_CHECKOUT_URL || 'https://ggcheckout.app/checkout/v4/Br2R1mcuHL2DdLjmtrwq';
      window.location.href = checkoutUrl;
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F8] text-[#4B5563] antialiased">
      
      {/* ── SEÇÃO 1 — HERO RESULTADO ── */}
      <section className="bg-gradient-to-br from-[#1A1A2E] to-[#2D1B69] text-white py-16 sm:py-24 px-4 relative overflow-hidden text-center">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#7B6FE8]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-[#A78BFA]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-xl mx-auto flex flex-col items-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7B6FE8]/25 border border-[#7B6FE8]/40 mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#EEECFF]">
              🎉 Seu perfil calórico está pronto!
            </span>
          </div>

          <h1 className="text-3xl sm:text-[40px] font-extrabold tracking-tight leading-tight mb-5 max-w-lg">
            Você pode perder até <span className="text-[#A78BFA] font-mono">{res.perdaTotal}kg</span> <br className="hidden sm:inline" />
            fotografando suas refeições
          </h1>

          <p className="text-[15px] sm:text-base text-slate-300 font-medium leading-relaxed mb-10 max-w-md">
            Sem dietas restritivas. Sem planilhas confusas. Sem digitar nada. <br />
            Apenas uma simples foto por refeição.
          </p>

          {/* Card Resumo do Perfil (Glassmorphism) */}
          <div className="w-full text-left result-glass-card rounded-3xl p-6 sm:p-7 flex flex-col gap-4.5 border border-white/10 shadow-2xl">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <span className="font-extrabold text-[13px] tracking-wider text-[#A78BFA] uppercase flex items-center gap-2">
                📸 Seu perfil de scanner
              </span>
              <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-0.5 rounded text-slate-200">
                Análise de IA
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Meta</span>
                <span className="text-base font-extrabold text-white font-mono">Perder {res.perdaTotal} kg</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimativa</span>
                <span className="text-base font-extrabold text-white font-mono">{res.semanas} semanas</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Alvo diário</span>
                <span className="text-base font-extrabold text-[#A78BFA] font-mono">~{res.caloriasAlvo} kcal/dia</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Método Principal</span>
                <span className="text-base font-extrabold text-white">Scanner IA por Foto</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Precisão do Scanner</span>
                <span className="text-base font-extrabold text-green-400 font-mono">~95% por prato</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Faixa de IMC ideal</span>
                <span className="text-base font-extrabold text-white font-mono">22.0 (Saudável)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 2 — COMO FUNCIONA (demo visual) ── */}
      <section className="py-16 px-4 bg-white border-b border-[#E5E7EB]/60">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] tracking-tight leading-tight text-center mb-10">
            Como o UniSlim funciona para você
          </h2>

          <div className="flex flex-col gap-6 w-full">
            {/* Passo 1 */}
            <div className="p-5.5 rounded-2xl border border-[#E5E7EB] bg-white flex items-start gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 rounded-2xl bg-[#7B6FE8]/10 text-[#7B6FE8] flex items-center justify-center flex-shrink-0 text-xl font-bold font-mono">
                1
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-extrabold text-[#1A1A2E] text-base flex items-center gap-1.5">
                  📸 Fotografe
                </span>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Aponte a câmera para qualquer refeição. Café da manhã, almoço, jantar ou lanche. Sem complicação.
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="p-5.5 rounded-2xl border border-[#E5E7EB] bg-white flex items-start gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 rounded-2xl bg-[#7B6FE8]/10 text-[#7B6FE8] flex items-center justify-center flex-shrink-0 text-xl font-bold font-mono">
                2
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-extrabold text-[#1A1A2E] text-base flex items-center gap-1.5">
                  🤖 A IA analisa
                </span>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Em 3 segundos nossa inteligência artificial identifica cada alimento no prato e calcula suas calorias e macronutrientes.
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="p-5.5 rounded-2xl border border-[#E5E7EB] bg-white flex items-start gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
              <div className="w-12 h-12 rounded-2xl bg-[#7B6FE8]/10 text-[#7B6FE8] flex items-center justify-center flex-shrink-0 text-xl font-bold font-mono">
                3
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-extrabold text-[#1A1A2E] text-base flex items-center gap-1.5">
                  📊 Você sabe tudo
                </span>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Acompanhe em tempo real suas proteínas, carboidratos, gorduras e veja o impacto exato na sua meta diária de emagrecimento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 3 — ESPELHO DA DOR ── */}
      <section className="py-16 px-4 bg-[#F6F7FB] border-b border-[#E5E7EB]/60">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#7B6FE8]/10 text-[#7B6FE8] flex items-center justify-center mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] tracking-tight leading-tight mb-4 max-w-md">
            Sabemos que controlar a comida não deveria ser um fardo
          </h2>
          <p className="text-[15px] sm:text-base text-[#4B5563] leading-relaxed mb-6">
            Você nos contou que hoje seu maior desafio é que você <span className="font-semibold text-[#1A1A2E]">{getDorLabel()}</span>.
          </p>
          <div className="p-5 bg-white border border-[#E5E7EB] rounded-2xl text-left flex gap-4 w-full shadow-sm">
            <span className="text-2xl select-none flex-shrink-0">🚀</span>
            <div>
              <p className="text-sm font-semibold text-[#1A1A2E] leading-normal mb-1">
                A Solução pelo Scanner:
              </p>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Cerca de <span className="font-extrabold text-[#7B6FE8] text-sm font-mono">{getDorPercent()}%</span> dos nossos usuários relataram ter solucionado exatamente essa barreira logo nos primeiros 7 dias apenas tirando fotos das refeições.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 4 — PROVA DO PRODUTO (exemplos reais) ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] tracking-tight leading-tight text-center mb-2">
            O que você vai descobrir sobre sua comida
          </h2>
          <p className="text-sm text-[#4B5563] text-center leading-relaxed mb-10 max-w-sm">
            Veja exemplos de como a IA reconhece instantaneamente as calorias e macronutrientes:
          </p>

          <div className="flex flex-col gap-5 w-full">
            {/* Exemplo 1 */}
            <div className="p-5 rounded-2xl border border-[#E5E7EB] bg-white flex flex-col gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.01)] text-left">
              <div className="flex justify-between items-center border-b border-[#E5E7EB]/50 pb-2">
                <span className="text-xs font-bold text-[#1A1A2E] flex items-center gap-1.5">
                  📸 Café da manhã típico
                </span>
                <span className="font-mono text-sm font-extrabold text-[#7B6FE8]">520 kcal</span>
              </div>
              <p className="text-xs text-[#4B5563]">Pão francês, 1 ovo cozido e café com leite.</p>
              <div className="flex gap-4 text-[11px] font-mono font-semibold text-slate-500">
                <span>Prot: 22g</span>
                <span>•</span>
                <span>Carbs: 58g</span>
                <span>•</span>
                <span>Gord: 18g</span>
              </div>
            </div>

            {/* Exemplo 2 */}
            <div className="p-5 rounded-2xl border border-[#E5E7EB] bg-white flex flex-col gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.01)] text-left">
              <div className="flex justify-between items-center border-b border-[#E5E7EB]/50 pb-2">
                <span className="text-xs font-bold text-[#1A1A2E] flex items-center gap-1.5">
                  📸 Almoço executivo
                </span>
                <span className="font-mono text-sm font-extrabold text-[#7B6FE8]">680 kcal</span>
              </div>
              <p className="text-xs text-[#4B5563]">Arroz, feijão carioca, peito de frango grelhado e salada com azeite.</p>
              <div className="flex gap-4 text-[11px] font-mono font-semibold text-slate-500">
                <span>Prot: 45g</span>
                <span>•</span>
                <span>Carbs: 72g</span>
                <span>•</span>
                <span>Gord: 24g</span>
              </div>
            </div>

            {/* Exemplo 3 */}
            <div className="p-5 rounded-2xl border border-[#E5E7EB] bg-white flex flex-col gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.01)] text-left">
              <div className="flex justify-between items-center border-b border-[#E5E7EB]/50 pb-2">
                <span className="text-xs font-bold text-[#1A1A2E] flex items-center gap-1.5">
                  📸 Lanche ou sobremesa saudável
                </span>
                <span className="font-mono text-sm font-extrabold text-[#7B6FE8]">310 kcal</span>
              </div>
              <p className="text-xs text-[#4B5563]">Iogurte grego natural, 1 colher de mel e granola.</p>
              <div className="flex gap-4 text-[11px] font-mono font-semibold text-slate-500">
                <span>Prot: 15g</span>
                <span>•</span>
                <span>Carbs: 42g</span>
                <span>•</span>
                <span>Gord: 9g</span>
              </div>
            </div>
          </div>

          <p className="text-sm font-semibold text-[#1A1A2E] text-center mt-8 italic flex items-center gap-1.5">
            Agora imagine saber isso de TODA refeição, todo dia, com uma simples foto. 📸
          </p>
        </div>
      </section>

      {/* ── SEÇÃO 5 — GRÁFICO DE PROJEÇÃO ── */}
      <section className="py-16 px-4 bg-[#F6F7FB]">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] tracking-tight leading-tight mb-3">
            Sua projeção fotografando suas refeições
          </h2>
          <p className="text-sm text-[#4B5563] leading-relaxed mb-10 max-w-md">
            O controle simples gera consistência. Veja a estimativa de perda de peso ao mapear os alimentos por foto contra a falta de controle.
          </p>

          <div className="w-full bg-white border border-[#E5E7EB] p-4.5 rounded-3xl shadow-sm h-[320px] sm:h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <YAxis domain={['dataMin - 3', 'dataMax + 3']} stroke="#94A3B8" fontSize={12} />
                <Tooltip />
                <Legend iconSize={10} iconType="circle" wrapperStyle={{ paddingTop: 10, fontSize: 13, fontWeight: 600 }} />
                <Line
                  type="monotone"
                  dataKey="Sem controle"
                  stroke="#94A3B8"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="Com UniSlim Scanner"
                  stroke="#7B6FE8"
                  strokeWidth={4.5}
                  dot={{ stroke: '#7B6FE8', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 6 — DEPOIMENTOS SOBRE O SCANNER ── */}
      <section className="py-16 px-4 bg-white border-b border-[#E5E7EB]/60">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] tracking-tight leading-tight text-center mb-3">
            O que dizem sobre o Scanner IA
          </h2>
          <p className="text-sm text-[#4B5563] text-center leading-relaxed mb-10">
            A forma mais simples de controle calórico do mercado.
          </p>

          <div className="flex flex-col gap-5 w-full">
            {/* Card 1 */}
            <div className="p-5.5 rounded-2xl bg-[#F6F7FB] border border-[#E5E7EB] flex flex-col gap-3 text-left">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#1A1A2E] text-[14.5px]">Ana, 29 anos — SP</span>
                <span className="text-green-600 font-extrabold font-mono text-xs">−8kg</span>
              </div>
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-[13px] text-[#4B5563] leading-relaxed italic">
                "Não acreditava que ia funcionar. Fotografei meu almoço e apareceu 780 kcal. Eu comia isso todo dia achando que era pouco!"
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5.5 rounded-2xl bg-[#F6F7FB] border border-[#E5E7EB] flex flex-col gap-3 text-left">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#1A1A2E] text-[14.5px]">Rafael, 35 anos — RJ</span>
                <span className="text-green-600 font-extrabold font-mono text-xs">−11kg</span>
              </div>
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-[13px] text-[#4B5563] leading-relaxed italic">
                "Finalmente parei de chutar as calorias. O scanner é preciso e rapidíssimo."
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5.5 rounded-2xl bg-[#F6F7FB] border border-[#E5E7EB] flex flex-col gap-3 text-left">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#1A1A2E] text-[14.5px]">Juliana, 26 anos — MG</span>
                <span className="text-green-600 font-extrabold font-mono text-xs">−6kg</span>
              </div>
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <p className="text-[13px] text-[#4B5563] leading-relaxed italic">
                "Nunca mais precisei pesquisar nada. Foto, resultado, pronto."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO 7 — OFERTA FINAL ── */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-md mx-auto flex flex-col items-center">
          
          <div className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-600 mb-6 animate-pulse">
            <span className="text-xs font-bold uppercase tracking-wider">⚡ Oferta especial</span>
          </div>

          {/* Countdown Timer */}
          <div className="bg-[#1A1A2E] rounded-3xl p-5 border border-white/5 mb-8 w-full max-w-[340px] flex flex-col items-center shadow-lg">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-[#7B6FE8]" /> Oferta expira em:
            </span>
            <span className="text-3xl font-extrabold text-[#7B6FE8] font-mono tracking-wider">
              {formatTime(timeLeft)}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] tracking-tight leading-tight mb-5 max-w-xs">
            Comece a fotografar suas refeições hoje
          </h2>

          {/* Card de Preço Promocional */}
          <div className="p-6.5 rounded-3xl border-2 border-[#7B6FE8] bg-white flex flex-col gap-4.5 shadow-xl w-full mb-8 relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#7B6FE8] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
              66% OFF
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-400 font-bold line-through mb-0.5">R$ 89,90/mês</span>
              <div className="flex items-baseline justify-center">
                <span className="text-[15px] font-bold text-[#1A1A2E] mr-1">R$</span>
                <span className="text-4xl font-black text-[#1A1A2E] tracking-tight font-mono">29,90</span>
                <span className="text-sm font-semibold text-slate-500 ml-1">/mês</span>
              </div>
              <span className="text-xs text-green-600 font-extrabold mt-1">
                Menos de R$ 1,00 por dia
              </span>
            </div>

            <hr className="border-[#E5E7EB]" />

            {/* Checklist */}
            <div className="flex flex-col gap-2.5 text-left text-xs font-semibold text-[#4B5563]">
              {[
                "Scanner IA por foto ilimitado",
                "Calorias e macros em 3 segundos",
                "Histórico de todas as refeições",
                "Meta calórica personalizada",
                "Gráficos de progresso diário e semanal",
                "800+ alimentos brasileiros no banco"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#EEECFF] text-[#7B6FE8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Botão CTA com Glow */}
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            type="button"
            className="w-full h-14 bg-gradient-to-r from-[#7B6FE8] to-[#6358D4] text-white rounded-full font-bold text-base flex items-center justify-center gap-2 hover:translate-y-[-1px] shadow-[0_8px_24px_rgba(123,111,232,0.5)] transition-all active:translate-y-[1.5px] btn-pulse-glow"
          >
            {checkoutLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Ativar meu scanner agora
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4 text-[12px] text-[#9CA3AF] font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4.5 h-4.5 text-[#22C55E]" />
            <span>🔒 Garantia de satisfação de 7 dias</span>
          </div>

        </div>
      </section>
    </div>
  );
}
