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
  containerClass?: string; // Nova prop para wrapper container
  customContent?: React.ReactNode; // Nova prop para conteúdo customizado (ex: animais no celeiro)

  apiResult?: any[];
  tableData?: TableRow[];
  tableColumns?: string[]; // Nova prop para colunas da tabela

  /* GAME DE BANCO */
  title?: string;
  description?: string;
  feedback?: string;
  module?: "frontend" | "backend" | "database";
}

const GameView: React.FC<GameViewProps> = ({
  falaPersonagem,
  fundo,
  personagem,
  extra,
  userStyle,
  containerClass,
  customContent,

  apiResult,
  tableData,
  tableColumns,

  title,
  description,
  feedback,
  module,
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

      {/* Conteúdo customizado (ex: animais no celeiro) */}
      {customContent && (
        <div style={{ position: "absolute", zIndex: 2, width: '100%', height: '100%', top: 0, left: 0 }}>
          {customContent}
        </div>
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
        containerClass ? (
          <div className={containerClass} style={{ position: "absolute", width: "100%", height: "100%", zIndex: 3 }}>
            <img
              src={personagem}
              alt="Personagem"
              className="casa-img"
            />
          </div>
        ) : (
          <img
            src={personagem}
            alt="Personagem"
            className="galinha casa"
            style={{ zIndex: 3 }}
          />
        )
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
                    {tableColumns ? (
                      tableColumns.map((col) => <th key={col}>{col}</th>)
                    ) : (
                      Object.keys(tableData[0]).map((col) => <th key={col}>{col}</th>)
                    )}
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
