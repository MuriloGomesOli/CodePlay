import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css';
import '../../../global.d.ts';
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('database');
  const [userCode, setUserCode] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [fazendeirosData, setFazendeirosData] = useState<any[]>([]);
  const [plantacoesData, setPlantacoesData] = useState<any[]>([]);

  const steps = [
    {
      step: 1,
      title: '1️⃣ Criar o Banco de Dados',
      instruction: 'Crie um banco de dados chamado "fazenda".',
      objective: 'Criar o banco de dados principal onde guardaremos informações sobre fazendeiros e suas plantações.',
      example: 'CREATE DATABASE fazenda;',
      hint: 'Use CREATE DATABASE seguido do nome.',
      validation: (code: string) => {
        const clean = code.toLowerCase().replace(/\s+/g, ' ');
        return clean.includes('create') && clean.includes('database') && clean.includes('fazenda');
      },
      successMessage: '✅ Banco criado!',
      tableToShow: null
    },
    {
      step: 2,
      title: '2️⃣ Criar Tabela de Fazendeiros',
      instruction: 'Crie a tabela "fazendeiros" com id (chave primária) e nome.',
      objective: 'Criar a primeira tabela com uma chave primária. A chave primária (PRIMARY KEY) identifica cada fazendeiro de forma única.',
      example: 'CREATE TABLE fazendeiros (\n    id INT PRIMARY KEY,\n    nome VARCHAR(50)\n);',
      hint: 'Use PRIMARY KEY para criar um identificador único.',
      validation: (code: string) => {
        console.log('--- DEBUG PASSO 2 ---');
        console.log('Código original:', code);

        const clean = code.toLowerCase().replace(/\s+/g, ' ').trim();
        console.log('Código limpo:', clean);

        const hasCreate = clean.includes('create');
        const hasTable = clean.includes('table');
        const hasFazendeiros = clean.includes('fazendeiros');
        const hasId = clean.includes('id');
        const hasPrimaryKey = clean.includes('primary') && clean.includes('key');
        const hasNome = clean.includes('nome');

        console.log('Checklist:');
        console.log('- CREATE:', hasCreate);
        console.log('- TABLE:', hasTable);
        console.log('- FAZENDEIROS:', hasFazendeiros);
        console.log('- ID:', hasId);
        console.log('- PRIMARY KEY:', hasPrimaryKey);
        console.log('- NOME:', hasNome);

        const result = hasCreate && hasTable && hasFazendeiros && hasId && hasPrimaryKey && hasNome;
        console.log('RESULTADO:', result);

        return result;
      },
      successMessage: '✅ Tabela de fazendeiros criada!',
      tableToShow: 'fazendeiros',
      onSuccess: () => {
        setFazendeirosData([
          { id: '—', nome: '(tabela criada, aguardando dados...)' }
        ]);
      }
    },
    {
      step: 3,
      title: '3️⃣ Criar Tabela de Plantações',
      instruction: 'Crie a tabela "plantacoes" com id, cultura, area e fazendeiro_id (chave estrangeira).',
      objective: 'Criar uma tabela com CHAVE ESTRANGEIRA (FOREIGN KEY). A coluna fazendeiro_id vai conectar cada plantação ao seu fazendeiro. Isso cria um relacionamento entre as tabelas!',
      example: 'CREATE TABLE plantacoes (\n    id INT PRIMARY KEY,\n    cultura VARCHAR(50),\n    area VARCHAR(20),\n    fazendeiro_id INT,\n    FOREIGN KEY (fazendeiro_id) REFERENCES fazendeiros(id)\n);',
      hint: 'Use FOREIGN KEY para criar o relacionamento com a tabela fazendeiros.',
      validation: (code: string) => {
        const clean = code.toLowerCase().replace(/\s+/g, ' ');
        return clean.includes('create') &&
          clean.includes('table') &&
          clean.includes('plantacoes') &&
          clean.includes('fazendeiro_id') &&
          clean.includes('foreign') &&
          clean.includes('key') &&
          clean.includes('references') &&
          clean.includes('fazendeiros');
      },
      successMessage: '✅ Tabela com chave estrangeira criada!',
      tableToShow: 'plantacoes',
      onSuccess: () => {
        setPlantacoesData([
          { id: '—', cultura: '(tabela criada, aguardando dados...)', area: '—', fazendeiro_id: '—' }
        ]);
      }
    },
    {
      step: 4,
      title: '4️⃣ Inserir Fazendeiros',
      instruction: 'Insira dois fazendeiros: João (id 1) e Maria (id 2).',
      objective: 'Adicionar fazendeiros na tabela. Precisamos inserir os fazendeiros primeiro, antes de suas plantações.',
      example: 'INSERT INTO fazendeiros (id, nome)\nVALUES\n(1, \'João\'),\n(2, \'Maria\');',
      hint: 'Use INSERT INTO com os valores de id e nome.',
      validation: (code: string) => {
        const clean = code.toLowerCase();
        return clean.includes('insert') &&
          clean.includes('fazendeiros') &&
          (clean.includes('joão') || clean.includes('joao')) &&
          clean.includes('maria');
      },
      successMessage: '✅ Fazendeiros cadastrados!',
      tableToShow: 'fazendeiros',
      onSuccess: () => {
        setFazendeirosData([
          { id: 1, nome: 'João' },
          { id: 2, nome: 'Maria' }
        ]);
      }
    },
    {
      step: 5,
      title: '5️⃣ Inserir Plantações',
      instruction: 'Insira duas plantações: Milho do João (fazendeiro_id 1) e Soja da Maria (fazendeiro_id 2).',
      objective: 'Adicionar plantações conectadas aos fazendeiros. A chave estrangeira garante que cada plantação pertence a um fazendeiro válido!',
      example: 'INSERT INTO plantacoes (id, cultura, area, fazendeiro_id)\nVALUES\n(1, \'Milho\', \'10 hectares\', 1),\n(2, \'Soja\', \'15 hectares\', 2);',
      hint: 'O fazendeiro_id deve corresponder ao id de um fazendeiro existente.',
      validation: (code: string) => {
        const clean = code.toLowerCase();
        return clean.includes('insert') &&
          clean.includes('plantacoes') &&
          clean.includes('milho') &&
          clean.includes('soja');
      },
      successMessage: '🎉 Parabéns! Você aprendeu sobre chaves estrangeiras!',
      tableToShow: 'plantacoes',
      onSuccess: () => {
        setPlantacoesData([
          { id: 1, cultura: 'Milho', area: '10 hectares', fazendeiro_id: 1 },
          { id: 2, cultura: 'Soja', area: '15 hectares', fazendeiro_id: 2 }
        ]);
      }
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleCheckCode = () => {
    console.log('Botão clicado! Validando passo:', currentStep);
    console.log('Código atual:', userCode);

    if (currentStepData.validation(userCode)) {
      console.log('Validação PASSOU!');
      setFeedback(currentStepData.successMessage);

      if (currentStepData.onSuccess) {
        currentStepData.onSuccess();
      }

      setTimeout(() => {
        if (currentStep < steps.length) {
          setCurrentStep(currentStep + 1);
          setUserCode('');
          setFeedback('');
        }
      }, 1500);
    } else {
      console.log('Validação FALHOU!');
      setFeedback('❌ Tente novamente. Veja o exemplo!');
    }
  };

  const getTableData = () => {
    if (currentStepData.tableToShow === 'fazendeiros') {
      return {
        columns: ['id', 'nome'],
        data: fazendeirosData
      };
    }
    if (currentStepData.tableToShow === 'plantacoes') {
      return {
        columns: ['id', 'cultura', 'area', 'fazendeiro_id'],
        data: plantacoesData
      };
    }
    return { columns: [], data: [] };
  };

  const tableInfo = getTableData();

  return (
    <>
      <GameHeader
        userName="Programador(a)"
        onLogout={() => console.log('Usuário saiu')}
        currentModule={currentModule}
        level="3"
        onModuleChange={setCurrentModule}
      />

      <div className={styles.appContainer}>
        <ExerciseInfo
          title="🌾 Relacionamentos em Banco de Dados"
          description={`Passo ${currentStep} de ${steps.length}: ${currentStepData.title}`}
          context="Aprenda a conectar tabelas usando chaves estrangeiras!"
          objective={currentStepData.objective}
          module="Banco de Dados"
          level={3}
        />

        <CodeEditor
          welcomeText={`${currentStepData.title}`}
          instructionText={currentStepData.instruction}
          codeExample={currentStepData.example}
          hintText={`💡 ${currentStepData.hint}`}
          mainButtonText="CONFIRMAR"
          onNext={handleCheckCode}
          onSqlExecute={handleCheckCode}
          onCodeChange={(code) => setUserCode(code)}
        />

        <GameView
          module="database"
          title={currentStepData.tableToShow ? `Tabela: ${currentStepData.tableToShow}` : 'Banco de Dados'}
          description={
            currentStepData.tableToShow
              ? `Visualize a tabela "${currentStepData.tableToShow}"`
              : 'Complete os passos!'
          }
          feedback={feedback}
          tableData={tableInfo.data}
          falaPersonagem={
            currentStep === steps.length && plantacoesData.length > 0 && plantacoesData[0].id !== '—'
              ? "🎉 Você dominou chaves estrangeiras!"
              : `Passo ${currentStep}/${steps.length}`
          }
        />
      </div>
    </>
  );
};

export default App;