// src/components/GameView.tsx
import React from 'react';
import styles from '../../styles/jogo.module.css';

interface GameViewProps {
  falaPersonagem: string;        // Texto da fala do personagem
  fundo: string;                 // Imagem de fundo (cenário)
  personagem: string;            // Imagem do personagem principal
  extra?: string;                // Elemento extra opcional (sol, árvore, etc.)
}

const GameView: React.FC<GameViewProps> = ({ falaPersonagem, fundo, personagem, extra }) => {
  return (
    <div className={styles.gameCard}>
      {extra && <img src={extra} alt="Extra" className={styles.extraImage} />}
      <img src={fundo} alt="Cenário" className={styles.farm} />
      <img src={personagem} alt="Personagem" className={styles.chicken} />
      <div className={styles.speechBubble}>{falaPersonagem}</div>
    </div>
  );
};

export default GameView;
