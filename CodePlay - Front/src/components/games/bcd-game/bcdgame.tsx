import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import '../../../index.css'
import '../../../global.d.ts'
import GameHeader from '../../ui/GameHeader.tsx';
import Fazenda from '../../../assets/fazenda.png'
import Personagem from '../../../assets/lola.png'
import Extra from '../../../assets/sol.png'
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('database');

  return (
  <>
    {/* Cabeçalho fixo no topo */}
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
        objective="Use propriedades como top, left, bottom e right para ajustar o layout."
        module="Banco de Dados"
        level={1}
      />
      <CodeEditor
        welcomeText="Bem-vindo ao Code Play! Use comandos de CSS para montar a fazenda."
        instructionText="Escreva um comando SQL para criar a tabela de animais. Certifique-se de definir as colunas corretamente."
        codeExample="CREATE TABLE animais ("
        hintText="Lembre: id, nome e tipo precisam estar na tabela."
        mainButtonText="CONFRIMAR"
        onNext={() => console.log('Próximo passo!')}
/>
      <GameView 
        falaPersonagem="Olá! Vamos montar minha fazenda juntos?"
        fundo= {Fazenda}
        personagem={Personagem}
        extra={Extra}
      />
    </div>
  </>
);
} 
export default App;