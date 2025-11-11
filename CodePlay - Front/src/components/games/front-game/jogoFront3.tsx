// src/components/App.tsx
import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css';
import '../../../global.d.ts';
import Fazenda from '../../../assets/fazenda.png';
import Celeiro from '../../../assets/celeiro.png';
import Personagem from '../../../assets/Lola.png';
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('frontend');
  const [userCode, setUserCode] = useState('');
  const [showResult, setShowResult] = useState(false);

  // ✅ Função de verificação do código CSS do aluno
  const handleCheckCode = (input: string) => {
    const hasFlexWrap = /flex-wrap:\s*wrap/.test(input);
    const hasGap = /gap:\s*\d+px/.test(input);
    const hasAlignContent = /align-content:\s*space-between/.test(input);

    if (hasFlexWrap && hasGap && hasAlignContent) {
      alert("✅ Celeiro montado com sucesso! O layout agora é responsivo!");
      setShowResult(true);
    } else {
      alert("👀 Lembre-se de usar flex-wrap: wrap;, gap: (algum valor em px) e align-content: space-between;");
      setShowResult(false);
    }
  };

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
          title="🧩 Nível 3 — Monte o Celeiro Responsivo"
          description="Objetivo: criar um layout flexível que se adapte ao espaço do celeiro."
          context="Os itens do celeiro precisam se ajustar automaticamente quando o espaço muda. Você vai usar propriedades do Flexbox para criar um layout responsivo."
          objective={
            <>
              <strong>Exemplo de código esperado:</strong><br />
              <code>.celeiro {"{"}</code><br />
              &nbsp;&nbsp;<code>display: flex;</code><br />
              &nbsp;&nbsp;<code>flex-wrap: wrap;</code><br />
              &nbsp;&nbsp;<code>gap: 10px;</code><br />
              &nbsp;&nbsp;<code>align-content: space-between;</code><br />
              <code>{"}"}</code><br /><br />

              <strong>Explicação:</strong><br />
              O <code>display: flex</code> organiza os itens lado a lado.<br />
              O <code>flex-wrap: wrap</code> faz os elementos quebrarem linha quando o espaço acaba.<br />
              O <code>gap</code> define o espaçamento entre eles.<br />
              O <code>align-content</code> controla a distribuição vertical quando há várias linhas.<br /><br />

              <strong>Verificação:</strong><br />
              — Usa <code>flex-wrap: wrap;</code><br />
              — Define <code>gap</code> com um valor em <code>px</code><br />
              — Usa <code>align-content: space-between;</code><br />
            </>
          }
          module="Front-end"
          level={3}
        />

        <CodeEditor
          welcomeText="🏗️ Hora de deixar o celeiro flexível!"
          instructionText="
            Crie uma classe <code>.celeiro</code> que utilize <code>display: flex</code>,  
            <code>flex-wrap: wrap</code>, <code>gap</code> e <code>align-content</code> para um layout adaptável."
          codeExample={".celeiro {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-content: space-between;\n}"}
          hintText="
            💡 <strong>Dica:</strong><br/>
            — Use <code>display: flex;</code><br/>
            — Adicione <code>flex-wrap: wrap;</code><br/>
            — Use <code>gap</code> para o espaçamento<br/>
            — Finalize com <code>align-content: space-between;</code>"
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)}
        />

        <GameView
          falaPersonagem={showResult ? "Celeiro organizado! 🌾 Tudo se encaixa perfeitamente!" : "Monte o celeiro com Flexbox para deixá-lo responsivo!"}
          fundo={Fazenda}
          personagem={Personagem}
          extra={Celeiro}
          userStyle={userCode}
        />
      </div>
    </>
  );
};

export default App;
