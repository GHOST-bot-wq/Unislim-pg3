const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Ler o arquivo .env
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnvVar = (name) => {
  const match = envContent.match(new RegExp(`^${name}=(.*)$`, 'm'));
  return match ? match[1].trim() : null;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

console.log('🔗 URL do Supabase:', supabaseUrl);
console.log('🔑 Chave Anon (formatada):', supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'Nula');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Erro: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não encontradas no .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('\n--- 1. Testando inserção na tabela "leads" ---');
  const testEmail = `teste_${Date.now()}@test.com`;
  
  const leadData = {
    email: testEmail,
    genero: 'Feminino',
    objetivo: 'Emagrecimento acelerado',
    maior_dor: 'Doces e ansiedade',
    maior_problema: 'Doces e ansiedade',
    tentativas: 'Dietas restritivas',
    refeicoes_dia: 3,
    conhecimento_calorias: 'Pouco',
    peso_atual: 80,
    peso_meta: 65,
    maior_medo: 'Efeito sanfona',
    comprometimento_foto: 'Sim, 100%',
    imc: 28.5,
    calorias_meta: 1600,
    semanas_estimadas: 12
  };

  const { data: insertData, error: insertError } = await supabase
    .from('leads')
    .insert(leadData)
    .select();

  if (insertError) {
    console.error('❌ Erro ao inserir lead:', insertError);
  } else {
    console.log('✅ Lead inserido com sucesso!');
    console.log(JSON.stringify(insertData, null, 2));
  }

  console.log('\n--- 2. Testando leitura da tabela "leads" ---');
  const { data: selectData, error: selectError } = await supabase
    .from('leads')
    .select('*')
    .limit(1);

  if (selectError) {
    console.error('❌ Erro ao ler leads:', selectError);
    console.log('💡 Dica: Se a inserção funcionou mas a leitura falhou, as políticas de RLS podem estar configuradas para permitir apenas INSERT (o que é ideal para tabelas de leads de landing page).');
  } else {
    console.log('✅ Leitura de leads concluída com sucesso!');
    console.log(`Qtd de registros retornados: ${selectData ? selectData.length : 0}`);
  }
}

testConnection();
