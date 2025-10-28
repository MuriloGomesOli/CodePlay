// src/components/ui/ExerciseInfo.tsx
import React from 'react';
import styles from '../../styles/jogo.module.css';

interface ExerciseInfoProps {
  title: string; // Ex: "Desafio: Montando a Fazenda com CSS"
  description: string; // Explica o objetivo do exercício
  context: string; // Ex: "Você vai aprender sobre position: absolute e relative."
  objective: string; // Ex: "Seu objetivo é mover os elementos da fazenda para o lugar certo!"
  module: string; // Ex: "Front-end", "Back-end", "Banco de Dados"
  level: number; // Ex: 1, 2, 3...
}

const ExerciseInfo: React.FC<ExerciseInfoProps> = ({
  title,
  description,
  context,
  objective,
  module,
  level,
}) => {
  return (
    <div className={styles.exerciseInfoCard}>
      <div className={styles.infoHeader}>
        <div>
          <h2 className={styles.infoTitle}>{title}</h2>
          <p className={styles.infoModule}>
            {module} • Nível {level}
          </p>
        </div>
      </div>

      <div className={styles.infoBody}>
        <p className={styles.infoDescription}>{description}</p>
        <p className={styles.infoContext}><strong>Contexto:</strong> {context}</p>
        <p className={styles.infoObjective}><strong>Objetivo:</strong> {objective}</p>
      </div>
    </div>
  );
};

export default ExerciseInfo;
