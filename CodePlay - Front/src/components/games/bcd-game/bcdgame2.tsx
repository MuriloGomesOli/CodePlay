import React from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import '../../../index.css'
import '../../../global.d.ts'
import Fazenda from '../../../assets/fazenda.png'
import Personagem from '../../../assets/lola.png'
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
        module="Banco de Dados"
        level={2}
      />
 
      <CodeEditor
        welcomeText="Muito bem! Você passou do nível anterior. Agora é hora de atualizar informações no banco de dados!"
        instructionText="Escreva um comando SQL para atualizar a quantidade de um produto no estoque. Lembre-se de usar UPDATE, SET e WHERE."
        codeExample="UPDATE produtos
SET quantidade = 10
WHERE nome = 'Leite';"
        hintText="Dica: Use SET para alterar o valor e WHERE para escolher qual produto mudar."
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
  );
};

export default App;