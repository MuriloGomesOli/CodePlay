import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import '../../../index.css';
import '../../../global.d.ts';
import GameHeader from '../../ui/GameHeader.tsx';
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('database');

  // ESTADOS DO BANCO
  const [tableName, setTableName] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string>("");

  // NOVOS estados para enviar ao GameView
  const [tableColumns, setTableColumns] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  // Armazena o SQL digitado
  const [pendingSQL, setPendingSQL] = useState<string>("");

  // ------------------ PARSER SQL ------------------
  const handleSQL = (code: string) => {
    try {
      // ------------------ CREATE TABLE ------------------
      const createMatch = code.match(/create table\s+(\w+)\s*\(([\s\S]*?)\)/i);

      if (createMatch) {
        const name = createMatch[1];
        const colsRaw = createMatch[2]
          .split(',')
          .map((c) => c.trim().split(/\s+/)[0]);

        setTableName(name);
        setColumns(colsRaw);
        setRows([]); // tabela começa vazia

        // Atualizar visualmente a tabela na GameView
        setTableColumns(colsRaw);
        setTableData([]); // tabela vazia

        setFeedback(`Tabela "${name}" criada com colunas: ${colsRaw.join(', ')}`);

        return; // evita tentar INSERT antes de CREATE
      }

      // ------------------ INSERT INTO ------------------
      const insertMatches = [...code.matchAll(/insert into\s+(\w+)\s*(\(([\s\S]*?)\))?\s*values\s*\(([\s\S]*?)\)/gi)];

      let newRows: any[] = [];

      for (const match of insertMatches) {
        const insertTable = match[1];
        const insertCols = match[3]?.split(',').map((c) => c.trim()) || columns;
        const insertValues = match[4]
          .split(',')
          .map((v) => v.trim().replace(/['"]/g, ''));

        if (!tableName || insertTable.toLowerCase() !== tableName.toLowerCase()) continue;

        let row: any = {};
        insertCols.forEach((col, i) => {
          row[col] = insertValues[i];
        });

        // AUTO_INCREMENT
        if (columns.includes("id") && !row["id"]) {
          row["id"] = rows.length + newRows.length + 1;
        }

        newRows.push(row);
      }

      if (newRows.length > 0) {
        const updatedRows = [...rows, ...newRows];
        setRows(updatedRows);

        // Atualizar GameView
        setTableData(updatedRows);

        setFeedback(`Foram inseridas ${newRows.length} novas linhas.`);
      } else {
        setFeedback("Nenhum INSERT válido encontrado.");
      }

    } catch (error) {
      console.error(error);
      setFeedback("Erro ao interpretar SQL.");
    }
  };

  return (
    <>
      <GameHeader
        userName="Programador(a)"
        onLogout={() => console.log('Usuário saiu')}
        currentModule={currentModule}
        level="1"
        onModuleChange={setCurrentModule}
      />

      <div className={styles.appContainer}>

        {/* Info inicial */}
        <ExerciseInfo
          title="Desafio: Criar a tabela de animais"
          description="Neste desafio, você vai aprender a criar uma tabela no banco de dados usando SQL."
          context="O sistema precisa armazenar informações sobre animais. Para isso, você deverá criar uma tabela chamada 'animais'."
          objective={
            <>
              <strong>O que você deve fazer:</strong><br />
              Criar uma tabela chamada <code>animais</code> usando o comando <code>CREATE TABLE</code>.<br /><br />

              <strong>A tabela precisa ter:</strong><br />
              • <code>id</code> — número inteiro, chave primária e Auto Increment<br />
              • <code>nome</code> — texto até 50 caracteres<br />
              • <code>tipo</code> — texto até 50 caracteres<br /><br />

              <strong>Explicação rápida:</strong><br />
              — <code>PRIMARY KEY</code> garante que cada animal tenha um identificador único.<br />
              — <code>AUTO_INCREMENT</code> faz o MySQL gerar os IDs automaticamente (1, 2, 3…).<br /><br />

              Depois de criar a tabela, você poderá inserir animais com:<br />
              <code>INSERT INTO animais (nome, tipo) VALUES ('Galinha Lola', 'Ave');</code><br />
              (Mas o foco deste passo é apenas a criação da tabela.)
            </>

          }
          module="Banco de Dados"
          level={1}
        />

        {/* Code Editor */}
        <CodeEditor
          welcomeText="Bem-vindo ao Code Play! Escreva seus comandos SQL abaixo."
          instructionText="Crie uma tabela usando CREATE TABLE. Depois, insira dados usando INSERT INTO."
          codeExample={`... TABLE animais (\n  ... INT AUTO_INCREMENT PRIMARY KEY,\n  ... VARCHAR(50),\n  ... VARCHAR(50)\n); \n`}
          hintText="Lembre: id, nome e tipo precisam estar na tabela."
          mainButtonText="CONFIRMAR"
          onNext={() => console.log('Próximo passo!')}
          onCodeChange={(code) => setPendingSQL(code)} // salva SQL digitado
          onSqlExecute={() => handleSQL(pendingSQL)} // executa SQL ao clicar CONFIRMAR
        />

        {/* Game View */}
        <GameView
          module="database"
          title="Sua Tabela SQL"
          description="O que você escrever no editor aparece abaixo."
          feedback={feedback}
          tableData={tableData}
          tableColumns={tableColumns}
        />
      </div>
    </>
  );
};

export default App;
