import React from 'react';
import UserProfile from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import Fazenda from '../../../assets/fazenda.png';
import '../../../index.css'
import '../../../global.d.ts'
// Usando CSS Modules para evitar conflitos de estilo
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <UserProfile
        userName="Lola"
        userTitle="Programadora Iniciante"
        avatarSrc="/assets/Lola.png"
        skills={['CSS', 'Flexbox']}
        module={1}
        level={1}
        onProfileClick={() => console.log('Abrir perfil')}
        onMenuClick={() => console.log('Abrir menu')}
        onLogoutClick={() => console.log('Sair do jogo')}
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
  );
};

export default App;