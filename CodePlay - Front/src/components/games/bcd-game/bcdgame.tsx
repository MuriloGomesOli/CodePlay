import React from 'react';
import UserProfile from '../../ui/UserProfile';
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
  );
};

export default App;