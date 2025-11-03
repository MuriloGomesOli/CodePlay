import React, {useState} from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css'
import '../../../global.d.ts'
import Fazenda from '../../../assets/fazenda.png'
import Personagem from '../../../assets/lola.png'
import Extra from '../../../assets/sol.png'
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('frontend');

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
        module="Front-end"
        level={3}
      />

      <CodeEditor
        welcomeText="Bem-vindo ao Code Play! Use comandos de CSS para montar a fazenda."
        instructionText="Escreva um comando para aprender sobre movimentos e montar a fazenda. Use <code>position</code> diferente de <code>static</code>."
        codeExample="/* Exemplo de comando CSS */"
        hintText="top: 10px;<br/>left: 5px;<br/>bottom: 20px;<br/>right: 5px;"
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
};

export default App;