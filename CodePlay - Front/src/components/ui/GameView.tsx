import React, { useState } from 'react';
import styles from '../../styles/jogo.module.css';

interface GameViewProps {
  falaPersonagem: string;
  fundo?: string;
  personagem?: string;   // agora opcional
  extra?: string;        // opcional
  userStyle?: string;
  apiResult?: string[];
}

const GameView: React.FC<GameViewProps> = ({
  falaPersonagem,
  fundo,
  personagem,
  extra,
  userStyle,
  apiResult,
}) => {
  const [showApi, setShowApi] = useState(false);

  return (
   <div className={styles.gameCard} style={{ position: 'relative', minHeight: '100px' }}>
      {userStyle && <style>{userStyle}</style>}

      {/* Fundo e elementos visuais */}
      <img src={fundo} alt="Cenário" className={styles.farm} />
      {extra && <img src={extra} alt="Extra" className={styles.sol} />}
      {personagem && <img src={personagem} alt="Personagem" className={styles.galinha} />}

      {/* Fala do personagem */}
      <div className={styles.speechBubble}>{falaPersonagem}</div>

      {/* Botão para mostrar ou ocultar JSON */}
      {apiResult && (
        <button
          className={styles.showApiButton}
          onClick={() => setShowApi(!showApi)}
        >
          {showApi ? ' Ocultar JSON' : 'JSON'}
        </button>
      )}

      {/* Caixa com o resultado da rota */}
      {showApi && apiResult && (
        <div className={styles.apiResponseBox}>
          <h4> Resposta da Rota /animais</h4>
          <pre>{JSON.stringify(apiResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GameView;
