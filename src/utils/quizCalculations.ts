export interface QuizAnswers {
  genero: string;
  objetivo: string;
  maior_problema: string;
  tentativas: string;
  refeicoes_dia: string;
  conhecimento_calorias: string;
  peso_atual: number;
  peso_meta: number;
  comprometimento: string;
  email: string;
}

export function calculateBMR(peso: number, altura: number, idade: number, genero: string): number {
  const gen = genero?.toLowerCase() || '';
  if (gen.includes('masc') || gen === 'masculino' || gen === '👨 Masculino') {
    return (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
  } else {
    return (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
  }
}

export function calculateTDEE(bmr: number): number {
  // Padrão moderado conforme especificação: bmr * 1.55
  return bmr * 1.55;
}

export function calculateDailyTarget(tdee: number): number {
  return Math.max(1200, Math.round(tdee - 500)); // Déficit saudável de 500 kcal
}

export function calculateWeeksToGoal(pesoAtual: number, pesoMeta: number): number {
  const diff = pesoAtual - pesoMeta;
  if (diff <= 0) return 4;
  return Math.ceil(diff / 0.75); // Perda saudável estimada em 0.75kg/semana
}

export function calculateBMI(peso: number, altura: number): number {
  const alturaM = altura / 100;
  return Number((peso / (alturaM * alturaM)).toFixed(1));
}

export function calculateArrivalDate(weeks: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + weeks * 7);
  return date;
}

export function formatArrivalDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

export function getBMICategory(bmi: number): { label: string; color: string; class: string } {
  if (bmi < 18.5) {
    return { label: 'Abaixo do peso', color: '#3B82F6', class: 'bg-blue-100 text-blue-800' };
  } else if (bmi < 25) {
    return { label: 'Peso saudável', color: '#22C55E', class: 'bg-green-100 text-green-800' };
  } else if (bmi < 30) {
    return { label: 'Sobrepeso', color: '#F59E0B', class: 'bg-yellow-100 text-yellow-800' };
  } else {
    return { label: 'Obesidade', color: '#EF4444', class: 'bg-red-100 text-red-800' };
  }
}

export function getGoalCategory(diff: number): { label: string; class: string; color: string } {
  if (diff <= 5) {
    return { label: 'Meta leve — alcançável em semanas! 🟢', class: 'bg-green-100 text-green-800 border-green-200', color: 'green' };
  } else if (diff <= 15) {
    return { label: 'Meta moderada — plano estruturado funciona. 🟡', class: 'bg-yellow-100 text-yellow-800 border-yellow-200', color: 'yellow' };
  } else if (diff <= 30) {
    return { label: 'Meta transformadora — consistência é tudo. 🔵', class: 'bg-blue-100 text-blue-800 border-blue-200', color: 'blue' };
  } else {
    return { label: 'Grande jornada — cada passo conta muito. 🟣', class: 'bg-purple-100 text-purple-800 border-purple-200', color: 'purple' };
  }
}

export interface QuizResults {
  imc: number;
  bmr: number;
  tdee: number;
  caloriasAlvo: number;
  semanas: number;
  dataMeta: string;
  imcClass: { label: string; color: string; class: string };
  perdaTotal: number;
  metaClass: { label: string; class: string; color: string };
}

export function calcularResultados(data: Partial<QuizAnswers>): QuizResults {
  const peso = Number(data.peso_atual) || 75;
  const pesoMeta = Number(data.peso_meta) || 65;
  const genero = data.genero || 'Feminino';

  // Altura inferida baseada no gênero
  const isMasc = genero.toLowerCase().includes('masc') || genero === 'Masculino';
  const alturaInferida = isMasc ? 175 : 165;

  // Idade padrão fixa (35 anos)
  const idadePadrao = 35;

  const imc = calculateBMI(peso, alturaInferida);
  const bmr = Math.round(calculateBMR(peso, alturaInferida, idadePadrao, genero));
  const tdee = Math.round(calculateTDEE(bmr));
  const caloriasAlvo = calculateDailyTarget(tdee);
  const semanas = calculateWeeksToGoal(peso, pesoMeta);
  const dataMeta = formatArrivalDate(calculateArrivalDate(semanas));
  const imcClass = getBMICategory(imc);
  const perdaTotal = Math.max(0, Number((peso - pesoMeta).toFixed(1)));
  const metaClass = getGoalCategory(perdaTotal);

  return {
    imc,
    bmr,
    tdee,
    caloriasAlvo,
    semanas,
    dataMeta,
    imcClass,
    perdaTotal,
    metaClass,
  };
}
