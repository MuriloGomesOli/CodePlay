import React from 'react';
import UserProfile from './ui/UserProfile';
import CodeEditor from './ui/CodeEditor';
import GameView from './ui/GameView';
import '../../src/index.css'


// Usando CSS Modules para evitar conflitos de estilo
import styles from '../styles/jogo.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <UserProfile />
      <CodeEditor />
      <GameView />
    </div>
  );
};

export default App;