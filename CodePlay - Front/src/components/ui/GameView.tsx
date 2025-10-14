// src/components/GameView.tsx
import React from 'react';
import styles from '../../styles/jogo.module.css';

// Importe as imagens existentes no projeto
import farmImage from '../../assets/fazenda.png';
import chickenImage from '../../assets/Lola.png';
import sunImage from '../../assets/sol.png';

const GameView: React.FC = () => {
  return (
    <div className={styles.gameCard}>
      <img src={sunImage} alt="Sol" className={styles.sun} />
      <img src={farmImage} alt="Fazenda" className={styles.farm} />
      <img src={chickenImage} alt="Galinha Lola" className={styles.chicken} />
      <div className={styles.speechBubble}>
        Olá! Sou a Galinha Lola. Vamos montar minha fazenda juntos?
      </div>
    </div>
  );
};

export default GameView;