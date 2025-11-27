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

  // ---------------------------------------------------------
  //                    PASSO A PASSO DO JOGO
  // ---------------------------------------------------------

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
        const clean = code.toLowerCase().replace(/\s+/g, ' ').trim();
        return (
          clean.includes('create table') &&
          clean.includes('fazendeiros') &&
          clean.includes('id') &&
          clean.includes('primary key') &&
          clean.includes('nome')
        );
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
      objective:
        'Criar uma tabela com CHAVE ESTRANGEIRA (FOREIGN KEY). A coluna fazendeiro_id conecta cada plantação ao seu fazendeiro.',
      example:
        'CREATE TABLE plantacoes (\n    id INT PRIMARY KEY,\n    cultura VARCHAR(50),\n    area VARCHAR(20),\n    fazendeiro_id INT,\n    FOREIGN KEY (fazendeiro_id) REFERENCES fazendeiros(id)\n);',
      hint: 'Use FOREIGN KEY para criar o relacionamento.',
      validation: (code: string) => {
        const clean = code.toLowerCase().replace(/\s+/g, ' ');
        return (
          clean.includes('create table') &&
          clean.includes('plantacoes') &&
          clean.includes('fazendeiro_id') &&
          clean.includes('foreign key') &&
          clean.includes('references') &&
          clean.includes('fazendeiros')
        );
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
      objective:
        'Adicionar fazendeiros na tabela. Precisamos inseri-los antes de criar as plantações.',
      example:
        "INSERT INTO fazendeiros (id, nome)\nVALUES\n(1, 'João'),\n(2, 'Maria');",
      hint: 'Use INSERT INTO com id e nome.',
      validation: (code: string) => {
        const clean = code.toLowerCase();
        return (
          clean.includes('insert') &&
          clean.includes('fazendeiros') &&
          (clean.includes('joão') || clean.includes('joao')) &&
          clean.includes('maria')
        );
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
      instruction: 'Insira Milho (fazendeiro 1) e Soja (fazendeiro 2).',
      objective: 'Adicionar plantações conectadas aos fazendeiros.',
      example:
        "INSERT INTO plantacoes (id, cultura, area, fazendeiro_id)\nVALUES\n(1, 'Milho', '10 hectares', 1),\n(2, 'Soja', '15 hectares', 2);",
      hint: 'O fazendeiro_id deve existir na tabela fazendeiros.',
      validation: (code: string) => {
        const clean = code.toLowerCase();
        return clean.includes('insert') && clean.includes('plantacoes') && clean.includes('milho') && clean.includes('soja');
      },
      successMessage: '🌾 Plantações cadastradas!',
      tableToShow: 'plantacoes',
      onSuccess: () => {
        setPlantacoesData([
          { id: 1, cultura: 'Milho', area: '10 hectares', fazendeiro_id: 1 },
          { id: 2, cultura: 'Soja', area: '15 hectares', fazendeiro_id: 2 }
        ]);
      }
    },

    // ---------------------------------------------------------
    //                     PASSO FINAL EXTRA
    // ---------------------------------------------------------
    {
      step: 6,
      title: '6️⃣ Visualização Final',
      instruction: 'Veja o resultado completo das relações!',
      objective:
        'Agora você pode visualizar as tabelas "fazendeiros" e "plantacoes" juntas para confirmar o relacionamento.',
      example: '',
      hint: 'Observe como fazendeiro_id conecta uma plantação ao fazendeiro.',
      validation: () => true, // passa automaticamente
      successMessage: '',
      tableToShow: 'final'
    }
  ];

  const currentStepData = steps[currentStep - 1];

  // ---------------------------------------------------------
  //                 LÓGICA DE VALIDAÇÃO
  // ---------------------------------------------------------

  const handleCheckCode = () => {
    if (currentStepData.validation(userCode)) {
      setFeedback(currentStepData.successMessage);

      if (currentStepData.onSuccess) currentStepData.onSuccess();

      setTimeout(() => {
        if (currentStep < steps.length) {
          setCurrentStep(currentStep + 1);
          setUserCode('');
          setFeedback('');
        }
      }, 1500);
    } else {
      setFeedback('❌ Tente novamente. Confira o exemplo do passo.');
    }
  };

  // ---------------------------------------------------------
  //            SISTEMA DE VISUALIZAÇÃO DE TABELAS
  // ---------------------------------------------------------

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

    // --------------- PASSO FINAL: VISUALIZAR TUDO ---------------
    if (currentStepData.tableToShow === 'final') {
      return {
        columns: ['Tabela', 'Conteúdo'],
        data: [
          {
            Tabela: 'fazendeiros',
            Conteúdo: JSON.stringify(fazendeirosData, null, 2)
          },
          {
            Tabela: 'plantacoes',
            Conteúdo: JSON.stringify(plantacoesData, null, 2)
          }
        ]
      };
    }

    return { columns: [], data: [] };
  };

  const tableInfo = getTableData();

  // ---------------------------------------------------------
  //                     INTERFACE DO JOGO
  // ---------------------------------------------------------

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
          welcomeText={currentStepData.title}
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
          title={
            currentStepData.tableToShow
              ? `Tabela: ${currentStepData.tableToShow}`
              : 'Banco de Dados'
          }
          description={
            currentStepData.tableToShow
              ? `Visualize a tabela "${currentStepData.tableToShow}".`
              : 'Complete os passos!'
          }
          feedback={feedback}
          tableData={tableInfo.data}
          tableColumns={tableInfo.columns}
          falaPersonagem={
            currentStep === steps.length
              ? "🎉 Parabéns! Você concluiu todas as etapas!"
              : `Passo ${currentStep}/${steps.length}`
          }
        />
      </div>
    </>
  );
};

export default App;
