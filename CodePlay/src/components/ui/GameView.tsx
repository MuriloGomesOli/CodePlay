// src/components/GameView.tsx
import React from 'react';
import styles from '../../styles/jogo.module.css';

// Importe as imagens existentes no projeto
import farmImage from '../fazenda.png';
import chickenImage from '../Lola.png';
import sunImage from '../sol.png';

const GameView: React.FC = () => {
  return (
    <div className={styles.gameCard}>
      <img src={sunImage} alt="Sol" className={styles.sun} />
      <img src={farmImage} alt="Fazenda" className={styles.farm} />
      <img src={chickenImage} alt="Galinha Lola" className={styles.chicken} />
      <div className={styles.speechBubble}>
        frase esperada
      </div>
    </div>
  );
};

export default GameView;