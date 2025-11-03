// src/components/GameView.tsx
import React from 'react';
import styles from '../../styles/jogo.module.css';

interface GameViewProps {
  falaPersonagem: string;        // Texto da fala do personagem
  fundo: string;                 // Imagem de fundo (cenário)
  personagem: string;            // Imagem do personagem principal
  extra?: string;                // Elemento extra opcional (sol, árvore, etc.)
  userStyle?: string;            // CSS digitado pelo usuário
}

const GameView: React.FC<GameViewProps> = ({ falaPersonagem, fundo, personagem, extra, userStyle }) => {
  return (
    <div className={styles.gameCard} style={{ position: 'relative', minHeight: '100px' }}>
  {userStyle && <style>{userStyle}</style>}

  {extra && <img src={extra} alt="Extra" className="sol" style={{ position: 'relative' }} />}
  <img src={fundo} alt="Cenário" className={styles.farm} />
  <img src={personagem} alt="Personagem" className="galinha" style={{ position: 'absolute' }} />

  <div className={styles.speechBubble}>{falaPersonagem}</div>
  </div>

  );
};

export default GameView;
