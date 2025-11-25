// src/components/App.tsx
import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css';
import '../../../global.d.ts';
import Casa from '../../../assets/casa.png';
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('frontend');
  const [userCode, setUserCode] = useState('');

  const handleCheckCode = (input: string) => {
    const hasContainer = /\.casa\s*\{/.test(input);
    const hasDisplayFlex = /display\s*:\s*flex/.test(input);
    const hasJustify = /justify-content\s*:\s*center/.test(input);
    const hasAlign = /align-items\s*:\s*center/.test(input);

    if (hasContainer && hasDisplayFlex && hasJustify && hasAlign) {
      alert("🏡✨ Perfeito! A casa foi centralizada com Flexbox!");
    } else {
      alert("❗ Centralize a .casa usando display:flex, justify-content:center e align-items:center");
    }
  };


  return (
    <>
      <GameHeader
        userName="Programador(a)"
        onLogout={() => console.log('Usuário saiu')}
        currentModule={currentModule}
        level="2"
      />

      <div className={styles.appContainer}>
        <ExerciseInfo
          title="🧩 Nível 2 — Centralize a Casa"
          description="Agora você vai aprender o Flexbox básico!"
          context="A casa está fora do centro — e para piorar, é uma casa de cachorro completamente torta e deslocada, desafiando sua dignidade como dev. Centralizá-la é um ato de humanidade e de CSS."
          objective={
            <>
              <strong>Objetivo:</strong><br />
              Centralizar a <code>.casa</code> exatamente no meio da área do jogo.<br /><br />

              <strong>O aluno deve escrever:</strong><br />
              <code>.casa {"{"}</code><br />
              &nbsp;&nbsp;<code>display: flex;</code><br />
              &nbsp;&nbsp;<code>justify-content: center;</code><br />
              &nbsp;&nbsp;<code>align-items: center;</code><br />
              <code>{"}"}</code><br /><br />

              <strong>Aprendizado:</strong><br />
              Flexbox = alinhamento fácil, rápido e salvador de layouts perdidos. 🎯
            </>
          }
          module="Front-end"
          level={2}
        />

        <CodeEditor
          welcomeText="🏡 Centralize a Casa do cachorro!"
          instructionText="Use Flexbox para centralizar qualquer elemento. Inclusive casas de cachorro revoltadas."
          codeExample={
            ".casa {\n" +
            "\n" +
            "\n" +
            "}\n" +
            ".casa-img {\n" +
            "  width: 200px;\n" +
            "  height: auto;\n" +
            "}\n"
          }
          hintText="DICA: justify-content e align-items trabalham juntos — tipo uma dupla sertaneja do CSS."
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)}
        />

        <GameView
          falaPersonagem="Coloque a casa bem no centro!"
          fundo={null}
          personagem={Casa}
          extra={undefined}
          userStyle={userCode}
          containerClass="casa"
        />
      </div>
    </>
  );
};

export default App;