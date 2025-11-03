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
  const [userCode, setUserCode] = useState(''); // Guarda o CSS digitado pelo usuário

  // Função de validação (opcional)
  const handleCheckCode = (input: string) => {
    const hasGalinha = /\.galinha/.test(input);
    const hasSol = /\.sol/.test(input);
    const hasPxValues = /\d+px/.test(input);

    if (hasGalinha && hasSol && hasPxValues) {
      alert("🐥 A fazenda está ficando linda! Você moveu tudo com precisão.");
    } else {
      alert("👀 Lembre-se de usar '.galinha', '.sol' e valores em px (ex: 20px).");
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
        <ExerciseInfo
          title="Desafio: Montando a Fazenda com CSS"
          description="Neste desafio, você vai aprender a controlar o posicionamento de elementos usando CSS."
          context="Os elementos da fazenda estão desorganizados. Você precisa posicioná-los corretamente na tela."
          objective={
            <>
              <strong>Seletores:</strong><br/>
              <code>.galinha</code> - move a galinha na fazenda<br/>
              <code>.sol</code> - move o sol no céu<br/><br/>
              <strong>Propriedades:</strong><br/>
              <code>top</code> - distância do topo do container<br/>
              <code>left</code> - distância da esquerda do container<br/>
              <code>right</code> - distância da direita do container<br/>
              <code>bottom</code> - distância da base do container<br/><br/>
              <strong>Objetivo:</strong><br/>
              Use as propriedades acima para posicionar cada elemento corretamente. Utilize valores em <code>px</code> e não esqueça do ponto no seletor.
            </>
          }
          module="Front-end"
          level={1}
        />

        <CodeEditor
          welcomeText="🐮 Bem-vindo ao Code Play! Vamos organizar os elementos da fazenda."
          instructionText="Escreva comandos CSS para mover os elementos. Use seletores como <code>.galinha</code> e <code>.sol</code> com valores em <code>px</code>."
          codeExample={".galinha { top: 200px; left: 200px; width:30%;}; "}
          hintText="Lembre-se: use unidades em 'px' e seletores corretos para cada elemento."
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)} // Atualiza userCode em tempo real
        />

        <GameView
          falaPersonagem="Olá! Vamos montar minha fazenda juntos?"
          fundo={Fazenda}
          personagem={Personagem}
          extra={Extra}
          userStyle={userCode} // Aplica o CSS digitado pelo usuário
        />
      </div>
    </>
  );
};

export default App;
