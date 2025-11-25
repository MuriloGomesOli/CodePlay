// src/components/pages/DatabaseChallenge.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader.tsx';
import styles from '../../../styles/jogo.module.css';
import '../../../index.css';
import '../../../global.d.ts';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('database');
  const navigate = useNavigate();

  // ------------------ ESTADOS INICIAIS ------------------
  const initialColumns = ["id", "nome", "quantidade"];
  const initialRows = [
    { id: 1, nome: "Leite", quantidade: 5 },
    { id: 2, nome: "Ovos", quantidade: 12 },
    { id: 3, nome: "Farinha", quantidade: 8 }
  ];

  const [rows, setRows] = useState<any[]>(initialRows);
  const [tableData, setTableData] = useState<any[]>(initialRows);
  const [feedback, setFeedback] = useState<string>("");
  const [pendingSQL, setPendingSQL] = useState<string>("");

  // ------------------ PARSER SQL ------------------
  const handleSQL = (code: string) => {
    try {
      // Regex genérico para UPDATE: captura QUANTIDADE e NOME
      // Ex: UPDATE produtos SET quantidade = 10 WHERE nome = 'Leite';
      const updateMatch = code.match(
        /update\s+produtos\s+set\s+quantidade\s*=\s*(\d+)\s+where\s+nome\s*=\s*['"]?([^'"]+)['"]?/i
      );

      if (updateMatch) {
        const newQuantity = Number(updateMatch[1]);
        const targetName = updateMatch[2]; // ex: "Leite", "Ovos"

        // Verifica se o produto existe
        const productExists = rows.some(r => r.nome.toLowerCase() === targetName.toLowerCase());

        if (!productExists) {
          setFeedback(`❌ Produto "${targetName}" não encontrado na tabela.`);
          return;
        }

        // Lógica de Sucesso / Erro para o objetivo (Leite = 10)
        if (targetName.toLowerCase() === 'leite') {
          if (newQuantity === 10) {
            setFeedback("✅ Parabéns! Você atualizou o Leite para 10! Voltando para o início...");

            // Atualiza visualmente antes de sair
            const updatedRows = rows.map(row =>
              row.nome.toLowerCase() === "leite" ? { ...row, quantidade: newQuantity } : row
            );
            setRows(updatedRows);
            setTableData(updatedRows);

            setTimeout(() => {
              navigate('/');
            }, 2000);
            return;
          } else {
            setFeedback(`⚠️ Quase lá! Você definiu a quantidade como ${newQuantity}, mas o objetivo é 10.`);
          }
        }

        // Cria NOVO array de rows (imutável) para outros produtos ou atualização genérica
        const updatedRows = rows.map(row =>
          row.nome.toLowerCase() === targetName.toLowerCase()
            ? { ...row, quantidade: newQuantity }
            : { ...row }
        );

        // Atualiza o estado COM NOVA REFERÊNCIA
        setRows(updatedRows);
        setTableData(updatedRows); // React detecta mudança

        if (targetName.toLowerCase() !== 'leite') {
          setFeedback(`✅ Quantidade de "${targetName}" atualizada para ${newQuantity}!`);
        }
        return;
      }

      setFeedback(
        "❌ Comando incorreto. Tente:\nUPDATE produtos SET quantidade = 10 WHERE nome = 'Leite';"
      );
    } catch (error) {
      console.error(error);
      setFeedback("❌ Erro ao interpretar SQL.");
    }
  };

  return (
    <>
      {/* ------------------ HEADER ------------------ */}
      <GameHeader
        userName="Aluno(a)"
        onLogout={() => console.log('Usuário saiu')}
        currentModule={currentModule}
        level="2"
        onModuleChange={setCurrentModule}
      />

      <div className={styles.appContainer}>

        {/* ------------------ EXERCISE INFO ------------------ */}
        <ExerciseInfo
          title="Desafio: Atualizar quantidade do produto"
          description="Você verá uma tabela com produtos do estoque da fazenda. Seu objetivo é atualizar a quantidade do produto 'Leite'."
          context="A tabela de produtos já existe e possui os seguintes dados iniciais:"
          objective={
            <>
              <b>Objetivo:</b> aumentar a quantidade de <b>Leite</b> para <b>10</b>.<br /><br />
              <b>Passo a passo:</b><br />
              1️⃣ Use o comando <code>UPDATE</code>.<br />
              2️⃣ Use <code>SET</code> para definir a nova quantidade.<br />
              3️⃣ Use <code>WHERE</code> para especificar o produto.<br /><br />
              <b>Exemplo de comando correto:</b><br />
              <code>UPDATE produtos SET quantidade = (NOVA QUANTIDADE) WHERE nome = (NOME DA TABELA);</code>
            </>
          }
          module="Banco de Dados"
          level={2}
        />

        {/* ------------------ CODE EDITOR ------------------ */}
        <CodeEditor
          welcomeText="No segundo nível, você aprenderá a atualizar dados em uma tabela."
          instructionText="Crie um comando UPDATE para atualizar a quantidade do produto 'Leite' para 10."
          codeExample={`UPDATE`}
          hintText="Utilize SET para definir a nova quantidade e WHERE para especificar o produto."
          mainButtonText="CONFIRMAR"
          onNext={() => console.log('Próximo passo!')}
          onCodeChange={(code) => setPendingSQL(code)} // salva SQL digitado
          onSqlExecute={() => handleSQL(pendingSQL)} // executa SQL ao clicar CONFIRMAR
        />

        {/* ------------------ GAME VIEW ------------------ */}
        <GameView
          key={rows.map(r => r.quantidade).join(',')} // força re-render quando quantidade muda
          module="database"
          title="Estoque da Fazenda"
          description="A tabela abaixo mostra os produtos e suas quantidades. Atualize corretamente e veja a mudança ao vivo!"
          feedback={feedback}
          tableData={tableData}
          tableColumns={initialColumns}
          falaPersonagem="Vamos atualizar a quantidade do Leite!"
        />

      </div>
    </>
  );
};

export default App;
