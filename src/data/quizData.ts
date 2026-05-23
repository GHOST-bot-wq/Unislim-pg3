export interface QuizOptionType {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  insight?: string;
}

export interface QuestionType {
  id: number;
  chip: string;
  headline: string;
  subtext: string;
  type: 'select' | 'grid-select' | 'inputs-weight-only' | 'calorie-quiz' | 'email';
  options?: QuizOptionType[];
  validationRules?: any;
}

export const QUIZ_QUESTIONS: QuestionType[] = [
  {
    id: 1,
    chip: "Vamos começar 👋",
    headline: "Para quem vamos criar seu perfil?",
    subtext: "Homens e mulheres têm necessidades calóricas diferentes.",
    type: 'select',
    options: [
      { id: 'masculino', label: "Masculino", icon: "👨" },
      { id: 'feminino', label: "Feminino", icon: "👩" }
    ]
  },
  {
    id: 2,
    chip: "Seu objetivo 🎯",
    headline: "O que você quer conquistar?",
    subtext: "Seja honesto — seu plano será calibrado para isso.",
    type: 'select',
    options: [
      { id: 'emagrecer', label: "Perder peso e gordura", sublabel: "Quero emagrecer de forma inteligente", icon: "🔥" },
      { id: 'musculo', label: "Perder peso e ganhar músculo", sublabel: "Quero recomposição corporal", icon: "💪" },
      { id: 'manter', label: "Manter o peso atual", sublabel: "Quero comer melhor sem perder ou ganhar", icon: "⚡" },
      { id: 'comer_melhor', label: "Simplesmente comer melhor", sublabel: "Quero entender o que estou colocando no corpo", icon: "🌱" }
    ]
  },
  {
    id: 3,
    chip: "Sua realidade 💬",
    headline: "Qual é o seu maior problema hoje?",
    subtext: "Isso é o que mais sabota quem quer emagrecer.",
    type: 'select',
    options: [
      {
        id: 'calorias_desconhecidas',
        label: "Não sei quantas calorias estou comendo",
        sublabel: "Como sem ter ideia do que estou ingerindo",
        icon: "😩",
        insight: "Você não está sozinho(a). 87% das pessoas subestimam suas calorias em até 40%. 😮"
      },
      {
        id: 'trabalhoso',
        label: "Já tentei apps mas é muito trabalhoso",
        sublabel: "Pesquisar e digitar cada alimento é cansativo",
        icon: "📱",
        insight: "É exatamente por isso que o UniSlim existe. Uma foto resolve tudo em 3 segundos. 📸"
      },
      {
        id: 'estagnado',
        label: "Como bem mas o peso não sai",
        sublabel: "Acho que estou comendo certo mas não funciona",
        icon: "🍕",
        insight: "Muitas vezes o problema está em alimentos 'saudáveis' que têm mais calorias do que parecem."
      },
      {
        id: 'consistencia',
        label: "Não tenho consistência no controle",
        sublabel: "Começo a controlar mas abandono em dias",
        icon: "🎯",
        insight: "Quanto mais simples o método, mais você mantém. Foto > digitar sempre."
      },
      {
        id: 'sem_rumo',
        label: "Não sei por onde começar",
        sublabel: "Quero mudar mas não sei como de verdade",
        icon: "🤷",
        insight: "Comece pelo mais fácil: apenas fotografe suas refeições para ter clareza total. 📸"
      }
    ]
  },
  {
    id: 4,
    chip: "Sua história 📖",
    headline: "Você já usou algum app para controlar calorias?",
    subtext: "Queremos entender o que não funcionou antes.",
    type: 'select',
    options: [
      { id: 'nunca', label: "Nunca usei nenhum app", sublabel: "Essa seria minha primeira tentativa" },
      {
        id: 'abandonei',
        label: "Já usei mas abandonei",
        sublabel: "Era muito complicado ou trabalhoso",
        insight: "A principal razão de abandono em apps de dieta é ter que digitar manualmente cada alimento. Com foto isso acaba."
      },
      { id: 'inconstante', label: "Uso às vezes mas sem consistência", sublabel: "Uso quando lembro, mas não é hábito" },
      { id: 'regular', label: "Uso regularmente", sublabel: "Já tenho o hábito, quero algo melhor" }
    ]
  },
  {
    id: 5,
    chip: "Teste rápido 🧠",
    headline: "Você sabe quantas calorias tem uma refeição típica?",
    subtext: "Dê o seu palpite sobre o prato abaixo.",
    type: 'calorie-quiz',
    options: [
      { id: '350', label: "350 kcal" },
      { id: '520', label: "520 kcal" },
      { id: '680', label: "680 kcal" }, // correta
      { id: '850', label: "850 kcal" }
    ]
  },
  {
    id: 6,
    chip: "Sua rotina 🍽️",
    headline: "Quantas vezes você come por dia?",
    subtext: "Isso define sua meta calórica diária.",
    type: 'grid-select',
    options: [
      { id: '1-2', label: "1–2 refeições" },
      { id: '3', label: "3 refeições" },
      { id: '4-5', label: "4–5 refeições" },
      { id: '6+', label: "+6 refeições" }
    ]
  },
  {
    id: 7,
    chip: "Seus dados ⚖️",
    headline: "Qual é o seu peso atual e sua meta?",
    subtext: "Calculamos sua meta calórica diária com base nisso.",
    type: 'inputs-weight-only',
    validationRules: {
      peso_atual: { min: 30, max: 300, erro: 'Peso deve ser entre 30kg e 300kg' },
      peso_meta: { min: 30, erro: 'Peso meta deve ser menor que seu peso atual' }
    }
  },
  {
    id: 8,
    chip: "Seja honesto(a) 💭",
    headline: "O que mais te preocupa ao tentar emagrecer?",
    subtext: "Queremos resolver isso de verdade.",
    type: 'select',
    options: [
      { id: 'tempo', label: "Não tenho tempo para acompanhar tudo", insight: "Com foto leva 3 segundos. Menos tempo que qualquer outro método." },
      { id: 'frustracao', label: "Já tentei antes e não funcionou", insight: "O problema nunca foi você — foi o método. Ver calorias reais muda tudo." },
      { id: 'complicado', label: "É muito complicado contar calorias", insight: "Com IA você para de contar. Só fotografa. O app conta por você." },
      { id: 'dinheiro', label: "Não quero gastar dinheiro e abandonar", insight: "Por isso temos garantia de 7 dias. Se não gostar, devolvemos 100%." },
      { id: 'manter', label: "Tenho medo de não conseguir manter", insight: "Quanto mais simples, mais você mantém. Uma foto é mais simples que qualquer dieta." }
    ]
  },
  {
    id: 9,
    chip: "Quase lá! 🏁",
    headline: "Você consegue fotografar suas refeições todo dia?",
    subtext: "É literalmente tudo que precisamos de você.",
    type: 'select',
    options: [
      { id: 'sim_tudo', label: "Sim, consigo fotografar toda refeição", sublabel: "Estou comprometido(a) com minha saúde", insight: "Perfeito! Uma foto por refeição é tudo que você precisa. O resto a IA faz. 🤖" },
      { id: 'tentar_maioria', label: "Vou tentar fotografar a maioria", sublabel: "Farei o possível dentro da minha rotina", insight: "Mesmo fotografando 70% das refeições você terá uma visão clara do seu consumo." },
      { id: 'simples_possivel', label: "Quero que seja o mais simples possível", sublabel: "Quanto menos etapas, melhor", insight: "Entendemos. O UniSlim foi feito exatamente para ser a forma mais simples possível." }
    ]
  },
  {
    id: 10,
    chip: "Último passo 🎉",
    headline: "Para onde enviamos seu plano calórico?",
    subtext: "Sua meta de calorias diárias calculada especialmente para você.",
    type: 'email'
  }
];
