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
    const hasJustifyContent = /justify-content\s*:\s*center/.test(input);

    if (hasCeleiro && hasDisplayFlex && hasFlexWrap && hasGap && hasJustifyContent) {
      alert("✅ Celeiro montado com sucesso! Os animais estão organizados e centralizados!");
      setShowResult(true);
    } else {
      alert("👀 Lembre-se de usar .celeiro com display: flex;, flex-wrap: wrap;, gap: (valor px) e justify-content: center;");
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
          description="Objetivo: criar um layout flexível que organize os animais em 3 colunas e 2 linhas, centralizados."
          context="Os animais precisam se ajustar automaticamente dentro do celeiro. Use Flexbox para organizar e centralizar os avatares."
          objective={
            <>
              <strong>Exemplo de código esperado:</strong><br />
              <code>.celeiro {"{"}</code><br />
              &nbsp;&nbsp;<code>display: flex;</code><br />
              &nbsp;&nbsp;<code>flex-wrap: wrap;</code><br />
              &nbsp;&nbsp;<code>gap: 10px;</code><br />
              &nbsp;&nbsp;<code>justify-content: center;</code><br />
              <code>{"}"}</code><br /><br />

              <strong>Explicação:</strong><br />
              O <code>display: flex</code> organiza os animais lado a lado.<br />
              O <code>flex-wrap: wrap</code> permite que quebrem linha.<br />
              O <code>gap</code> define o espaçamento.<br />
              O <code>justify-content: center</code> centraliza os itens.<br /><br />

              <strong>Verificação:</strong><br />
              — Usa <code>flex-wrap: wrap;</code><br />
              — Define <code>gap</code><br />
              — Usa <code>justify-content: center;</code><br />
            </>
          }
          module="Front-end"
          level={3}
        />

        <CodeEditor
          welcomeText="🏗️ Hora de organizar os animais!"
          instructionText="
            Crie uma classe <code>.celeiro</code> com <code>display: flex</code>,  
            <code>flex-wrap: wrap</code>, <code>gap</code> e <code>justify-content: center</code> para organizar os avatares."
          codeExample={".celeiro {\n\n\n\n\n}"}
          hintText="
            💡 <strong>Dica:</strong><br/>
            — Use <code>display: flex;</code><br/>
            — Adicione <code>flex-wrap: wrap;</code><br/>
            — Use <code>justify-content: center;</code> para alinhar ao centro<br/>
            — Não esqueça do <code>gap</code>!"
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)}
        />

        <GameView
          falaPersonagem={showResult ? "Celeiro organizado! 🌾 Os animais estão felizes!" : "Use Flexbox para organizar e centralizar os animais!"}
          fundo={Fazenda}
          personagem={Vaca}
          userStyle={userCode}
          customContent={
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div className="celeiro" style={showResult ? {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
                width: '290px',
                height: 'auto'
              } : { width: '290px' }}>
                {animais.map((animal, index) => (
                  <img key={index} src={animal} alt="Animal" style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid white'
                  }} />
                ))}
              </div>
            </div>
          }
        />
      </div>
    </>
  );
};

export default App;
