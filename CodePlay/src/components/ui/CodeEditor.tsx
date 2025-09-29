// src/components/CodeEditor.tsx
import React from 'react';
import styles from '../../styles/jogo.module.css';

// Ícone do logo de código (ex: SVG ou imagem)
// Ajuste o caminho do logo do editor — se não existir, usar um placeholder
let codeLogo = '';
try {
  // Tenta importar um logo local (se existir)
  codeLogo = require('../code-logo.png');
} catch (e) {
  // fallback: manter string vazia para não quebrar o build
  codeLogo = '';
}

const CodeEditor: React.FC = () => {
  const codeExample = `print("frase esperada")`;

  return (
    <div className={styles.codeCard}>
      <div className={styles.welcomeSection}>
        <img src={codeLogo} alt="Code Play Logo" className={styles.codeLogo} />
        <p className={styles.welcomeText}>
          Bem-vindo ao Code Play<br/>
          Use comandos simples de Python para mover os personagens e completar o objetivo de cada nível.
        </p>
      </div>

      <div className={styles.instruction}>
        Escreva um print para que a Lola dê bom dia à fazenda.<br/>
        Dica: use aspas para colocar o texto da fala.
      </div>

      <div className={styles.editorArea}>
        <span className={styles.lineNumber}>1</span>
        <textarea
          className={styles.codeTextarea}
          defaultValue={codeExample} // Para mostrar o exemplo inicial
        ></textarea>
      </div>

      <div className={styles.hintSection}>
        <div className={styles.hintBox}>
          Use print("frase esperada")
        </div>
        <div className={styles.arrow}></div> {/* A seta */}
        <div className={styles.buttonGroup}>
            <button className={`${styles.actionButton} ${styles.hintButton}`}>DICA</button>
            <button className={`${styles.actionButton} ${styles.nextButton}`}>PROX...</button>
        </div>
      </div>

      <button className={styles.codePlayButton}>CODEPLAY</button>
    </div>
  );
};

export default CodeEditor;