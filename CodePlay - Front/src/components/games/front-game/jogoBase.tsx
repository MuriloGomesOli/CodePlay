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
              <strong>O que você deve fazer:</strong><br />
              Posicionar dois elementos da fazenda usando CSS:<br />
              — <code>.galinha</code><br />
              — <code>.sol</code><br /><br />

              <strong>Como funciona:</strong><br />
              Para mover qualquer elemento na tela, você precisa usar:<br />
              — <code>position: absolute;</code><br />
              — <code>top</code>, <code>left</code>, <code>right</code> ou <code>bottom</code><br />
              — Sempre usando valores em <code>px</code><br /><br />

              <strong>Dicas importantes:</strong><br />
              — Sem <code>position: absolute;</code> o elemento NÃO se move.<br />
              — Sempre use <code>px</code> (ex: <code>30px</code>).<br />
              — Verifique se escreveu o seletor corretamente (<code>.galinha</code> e <code>.sol</code>).<br />
              — Se algo sumir atrás do cenário, use <code>z-index</code>.<br /><br />

              <strong>Checklist antes de confirmar:</strong><br />
              ✔ Usei <code>.galinha</code> e <code>.sol</code><br />
              ✔ Coloquei <code>position: absolute;</code><br />
              ✔ Usei <code>top</code>/<code>left</code>/<code>right</code> em <code>px</code><br />
              ✔ Não deixei erros de sintaxe
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
          falaPersonagem="Organize os elementos na fazenda!"
          fundo={Fazenda}
          personagem={Personagem}
          extra={Extra}
          userStyle={userCode} // CSS aplicado no cenário
        />


      </div>
    </>
  );
};

export default App;