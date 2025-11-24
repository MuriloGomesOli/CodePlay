// src/components/ui/GameView.tsx
import React, { useState } from 'react';
import styles from '../../styles/jogo.module.css';

interface TableRow {
  [key: string]: string | number;
}

interface GameViewProps {
  falaPersonagem: string;
  fundo?: string;
  personagem?: string;
  extra?: string;
  userStyle?: string;

  apiResult?: any[];
  tableData?: TableRow[];

  /* GAME DE BANCO */
  title?: string;
  description?: string;
  feedback?: string;
  module?: "frontend" | "backend" | "database";  // ← ADICIONADO!
}

const GameView: React.FC<GameViewProps> = ({
  falaPersonagem,
  fundo,
  personagem,
  extra,
  userStyle,

  apiResult,
  tableData,

  title,
  description,
  feedback,
  module, // ← RECEBIDO AQUI!
}) => {

  const [showApi, setShowApi] = useState(false);

  return (
    <div className={styles.gameCard} style={{ position: "relative" }}>

      {/* ----------------- GAME DE FRONTEND ----------------- */}
      {userStyle && <style>{userStyle}</style>}

      {fundo && (
        <img
          src={fundo}
          alt="Cenário"
          className={styles.farm}
          style={{ position: "absolute", zIndex: 1 }}
        />
      )}

      {extra && (
        <img
          src={extra}
          alt="Extra"
          className="sol"
          style={{ position: "absolute", zIndex: 2 }}
        />
      )}

      {personagem && (

        <img
          src={personagem}
          alt="Personagem"
          className="galinha casa"
          style={{ zIndex: 3 }}
        />
      )}

      <div className={styles.speechBubble}>{falaPersonagem}</div>

      {/* ----------------- GAME DE BACKEND ----------------- */}


      {apiResult && (
        <>
          <button className={styles.showApiButton} onClick={() => setShowApi(!showApi)}>
            {showApi ? 'Ocultar JSON' : 'JSON'}
          </button>

          {showApi && (
            <div className={styles.apiResponseBox}>
              <h5>localhost:3000/docs</h5>
              <h4>Resposta da Rota</h4>
              <pre>{JSON.stringify(apiResult, null, 2)}</pre>
            </div>
          )}
        </>
      )}

      {/* ----------------- GAME DE BANCO DE DADOS ----------------- */}
      {module === "database" && (
        <div className={styles.dbGameCard}>

          <h2 className={styles.dbTitle}>{title}</h2>
          <p className={styles.dbDescription}>{description}</p>

          {feedback && <div className={styles.dbFeedback}>{feedback}</div>}

          {tableData && tableData.length > 0 ? (
            <div className={styles.apiResponseBox}>
              <h3>Resultado da sua tabela:</h3>

              <table className={styles.dbTable}>
                <thead>
                  <tr>
                    {Object.keys(tableData[0]).map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((value, j) => (
                        <td key={j}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          ) : (
            <p className={styles.dbHint}>
              📌 Digite um comando SQL no editor para gerar sua tabela!
            </p>
          )}
        </div>
      )}

    </div>
  );
};

export default GameView;
