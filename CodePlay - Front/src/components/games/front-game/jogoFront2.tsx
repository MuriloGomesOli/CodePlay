import React, {useState} from 'react';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css'
import '../../../global.d.ts'
import Fazenda from '../../../assets/fazenda.png'
import Fazendeiro from '../../../assets/fazendeiro.png'
import Trator from '../../../assets/trator.png'
import styles from '../../../styles/jogo.module.css';
import ExerciseInfo from '../../ui/UserProfile';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('frontend');

  return (
  <>
    {/* Cabeçalho fixo no topo */}
    <GameHeader
      onLogout={() => console.log('Usuário saiu')}
      currentModule={currentModule}
      level="2"
      onModuleChange={setCurrentModule}
    />

    <div className={styles.appContainer}>
      <ExerciseInfo
        title="Desafio: Montando a Fazenda com CSS"
        description="Neste desafio, você vai aprender a controlar o posicionamento de elementos usando CSS."
        context="Os elementos da fazenda estão desorganizados. Você precisa posicioná-los corretamente na tela."
        objective="Use propriedades como top, left, bottom e right para ajustar o layout."
        module="Front-end"
        level={2}
      />
      <CodeEditor
        welcomeText="🐮 Bem-vindo ao Nível 2 do Code Play! Hora de dar vida à fazenda com movimento e estilo."
        instructionText="Escreva um comando para aprender sobre movimentos e montar a fazenda. Use <code>position</code> diferente de <code>static</code>."
        codeExample="/* Exemplo de comando CSS */"
        hintText="top: 10px;<br/>left: 5px;<br/>bottom: 20px;<br/>right: 5px;"
        mainButtonText="CONFRIMAR"
        onNext={() => console.log('Próximo passo!')}
/>
      <GameView 
        falaPersonagem="Olá! Vamos montar minha fazenda juntos?"
        fundo= {Fazenda}
        personagem={Fazendeiro}
        extra={Trator}
      />
    </div>
  </>
);
} 

export default App;