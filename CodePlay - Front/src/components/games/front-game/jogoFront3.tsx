// src/components/App.tsx
import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css';
import '../../../global.d.ts';
import Fazenda from '../../../assets/fazenda.png';
// Importando os animais
import Vaca from '../../../assets/avatars/vaca.png';
import Porco from '../../../assets/avatars/porco.png';
import Ovelha from '../../../assets/avatars/ovelha.png';
import Pinto from '../../../assets/avatars/pinto.png';
import Bode from '../../../assets/avatars/bode.png';
import Auau from '../../../assets/avatars/auau.png';

import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('frontend');
  const [userCode, setUserCode] = useState('');
  const [showResult, setShowResult] = useState(false);

  // ✅ Função de verificação do código CSS do aluno
  const handleCheckCode = (input: string) => {
    const hasCeleiro = /\.celeiro\s*\{/.test(input);
    const hasDisplayFlex = /display\s*:\s*flex/.test(input);
    const hasFlexWrap = /flex-wrap\s*:\s*wrap/.test(input);
    const hasGap = /gap\s*:\s*\d+px/.test(input);
    const hasAlignContent = /align-content\s*:\s*space-between/.test(input);

    if (hasCeleiro && hasDisplayFlex && hasFlexWrap && hasGap && hasAlignContent) {
      alert("✅ Celeiro montado com sucesso! O layout agora é responsivo!");
      setShowResult(true);
    } else {
      alert("👀 Lembre-se de usar .celeiro com display: flex;, flex-wrap: wrap;, gap: (algum valor em px) e align-content: space-between;");
      setShowResult(false);
    }
  };

  // Lista de animais para exibir no celeiro
  const animais = [Vaca, Porco, Ovelha, Pinto, Bode, Auau];

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
          context="Os animais precisam se ajustar automaticamente dentro do celeiro. Você vai usar propriedades do Flexbox para criar um layout responsivo."
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
              O <code>display: flex</code> organiza os animais lado a lado.<br />
              O <code>flex-wrap: wrap</code> faz os animais quebrarem linha quando o espaço acaba.<br />
              O <code>gap</code> define o espaçamento entre eles.<br />
              O <code>align-content</code> controla a distribuição vertical.<br /><br />

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
          welcomeText="🏗️ Hora de organizar os animais!"
          instructionText="
            Crie uma classe <code>.celeiro</code> que utilize <code>display: flex</code>,  
            <code>flex-wrap: wrap</code>, <code>gap</code> e <code>align-content</code> para organizar os animais."
          codeExample={".celeiro {\n\n\n\n\n}"}
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
          falaPersonagem={showResult ? "Celeiro organizado! 🌾 Os animais estão felizes!" : "Use Flexbox para organizar os animais no celeiro!"}
          fundo={Fazenda}
          personagem={Vaca}
          userStyle={userCode}
          customContent={
            <div className="celeiro" style={showResult ? { display: 'flex', flexWrap: 'wrap', gap: '10px', alignContent: 'space-between', width: '100%', height: '100%' } : {}}>
              {animais.map((animal, index) => (
                <img key={index} src={animal} alt="Animal" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              ))}
            </div>
          }
        />
      </div>
    </>
  );
};

export default App;
