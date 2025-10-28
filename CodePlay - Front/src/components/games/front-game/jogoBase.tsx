import React from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import '../../../index.css';
import '../../../global.d.ts';
import Fazenda from '../../../assets/fazenda.png'
import Personagem from '../../../assets/Lola.png'
import Extra from '../../../assets/sol.png'
// Usando CSS Modules para evitar conflitos de estilo
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  return (
   <div className={styles.appContainer}>
      <ExerciseInfo
        title="Desafio: Montando a Fazenda com CSS"
        description="Neste desafio, você vai aprender a controlar o posicionamento de elementos usando CSS."
        context="Os elementos da fazenda estão desorganizados. Você precisa posicioná-los corretamente na tela."
        objective="Use propriedades como top, left, bottom e right para ajustar o layout."
        module="Front-end"
        level={1}
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
        fundo={Fazenda}
        personagem={Personagem}
        extra={Extra}
      />
    </div>
  );
};

export default App;