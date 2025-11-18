// src/components/App.tsx
import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css';
import '../../../global.d.ts';
import Fazenda from '../../../assets/fazenda.png';
import Personagem from '../../../assets/Lola.png';
import Extra from '../../../assets/sol.png';
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('frontend');
  const [userCode, setUserCode] = useState('');

  // ---------------------------
  //  Função de validação básica
  // ---------------------------
  const handleCheckCode = (input: string) => {
    const hasGalinha = /\.galinha/.test(input);
    const hasSol = /\.sol/.test(input);
    const hasPxValues = /\d+px/.test(input);

    if (hasGalinha && hasSol && hasPxValues) {
      alert("🐥 A fazenda está ficando linda! Você moveu tudo com precisão.");
    } else {
      alert("👀 Use '.galinha', '.sol' e valores em px (ex: 20px).");
    }
  };

  return (
    <>
      {/* -----------------------------------------
          Header do Game
      ------------------------------------------ */}
      <GameHeader
        userName="Programador(a)"
        onLogout={() => console.log('Usuário saiu')}
        currentModule={currentModule}
        level="1"
      />

      {/* -----------------------------------------
          Layout principal
      ------------------------------------------ */}
      <div className={styles.appContainer}>

        {/* -------- Coluna da esquerda: info -------- */}
        <ExerciseInfo
          title="Desafio: Montando a Fazenda com CSS"
          description="Aprenda a posicionar elementos usando CSS."
          context="A fazenda está bagunçada, organize os elementos!"
          objective={
            <>
              <strong>Seletores:</strong><br />
              <code>.galinha</code> — controla a galinha<br />
              <code>.sol</code> — controla o sol<br /><br />

              <strong>Propriedades:</strong><br />
              <code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code><br /><br />

              <strong>Objetivo:</strong><br />
              Use valores em <code>px</code> e seletores corretos.
            </>
          }
          module="Front-end"
          level={1}
        />

        {/* -------- Coluna do meio: Editor -------- */}
        <CodeEditor
          welcomeText="🐮 Bem-vindo ao Code Play!"
          instructionText="Use seletores CSS como .galinha e .sol."
          codeExample={
            ".galinha {\n" +
            "  position: absolute;\n" +
            "  top: 200px;\n" +
            "  left: 100px;\n" +
            "  width: 180px;\n" +
            "  height: auto;\n" +
            "}\n\n"
          }
          hintText="Sempre use px."
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)}
        />

        {/* -------- Coluna da direita: GameView -------- */}
        <GameView
          title="Tabela de Animais"
          description="Use SQL para criar a tabela e adicionar registros."
          tableData={[
            { id: 1, nome: "Galinha", tipo: "Ave" },
            { id: 2, nome: "Vaca", tipo: "Mamífero" }
          ]}
          feedback="✔ Tabela criada com sucesso!"
        />

      </div>
    </>
  );
};

export default App;