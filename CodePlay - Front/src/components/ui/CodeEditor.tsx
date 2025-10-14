import React, { useState } from 'react';
import styles from '../../styles/jogo.module.css';

let codeLogo = '';
try {
  codeLogo = require('../code-logo.png');
} catch {
  codeLogo = '';
}

const CodeEditor: React.FC = () => {
  const [showHint, setShowHint] = useState(false); // controla a visibilidade da dica

  const codeExample = `/* Exemplo de comando CSS */`;

  return (
    <div className={styles.codeCard}>
      {/* Seção de boas-vindas */}
      <div className={styles.welcomeSection}>
        <img src={codeLogo} alt="Code Play Logo" className={styles.codeLogo} />
        <p className={styles.welcomeText}>
          Bem-vindo ao Code Play<br/>
          Use comandos simples de CSS para criar a fazenda por completo.
        </p>
      </div>

      {/* Instrução principal */}
      <div className={styles.instruction}>
        Escreva um comando para aprender sobre movimentos e montar a fazenda.<br/>
        Usadas com <code>position</code> diferente de <code>static</code>.
      </div>

      {/* Área do editor de código */}
      <div className={styles.editorArea}>
        <span className={styles.lineNumber}>1</span>
        <textarea
          className={styles.codeTextarea}
          defaultValue={codeExample}
        ></textarea>
      </div>

      {/* Dica + botões */}
      <div className={styles.hintSection}>
        {/* Mostra a dica apenas se showHint for true */}
        {showHint && (
          <>
            <div className={styles.hintBox}>
              top: 10px;<br/>
              bottom: 20px;<br/>
              left: 15px;<br/>
              right: 5px;
            </div>
            <div className={styles.arrow}></div>
          </>
        )}

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.actionButton} ${styles.hintButton}`}
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? 'OCULTAR' : 'DICA'}
          </button>

          <button className={`${styles.actionButton} ${styles.nextButton}`}>
            PROXIMO
          </button>
        </div>
      </div>

      {/* Botão principal */}
      <button className={styles.codePlayButton}>CODEPLAY</button>
    </div>
  );
};

export default CodeEditor;
