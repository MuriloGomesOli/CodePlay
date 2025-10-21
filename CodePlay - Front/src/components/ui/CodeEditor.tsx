// src/components/CodeEditor.tsx
import React, { useState, useMemo, useRef, useEffect } from 'react';
import styles from '../../styles/jogo.module.css';
import codeLogo from '../../assets/logo.png';

interface CodeEditorProps {
  welcomeText: string;
  instructionText: string;
  codeExample: string;
  hintText?: string;
  mainButtonText?: string;
  onNext?: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  welcomeText,
  instructionText,
  codeExample,
  hintText,
  mainButtonText = 'CODEPLAY',
  onNext,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [code, setCode] = useState(codeExample);
  const [textHeight, setTextHeight] = useState<number | undefined>(undefined);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ajusta altura do textarea conforme digita
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setTextHeight(textareaRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [code]);

  // Números de linha
  const lineNumbers = useMemo(() => {
    const lineCount = code.split('\n').length;
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  }, [code]);

  return (
    <div className={styles.codeCard}>
      {/* Seção de boas-vindas */}
      <div className={styles.welcomeSection}>
        <img src={codeLogo} alt="Code Play Logo" className={styles.codeLogo} />
        <p className={styles.welcomeText}>{welcomeText}</p>
      </div>

      <div className={styles.instruction} dangerouslySetInnerHTML={{ __html: instructionText }} />

      {/* Editor de código */}
      <div className={styles.editorArea} style={{ alignItems: 'flex-start' }}>
        {/* Números de linha */}
        <div className={styles.lineNumbersContainer} style={{ height: textHeight }}>
          {lineNumbers.map((number) => (
            <span key={number} className={styles.lineNumber}>
              {number}
            </span>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          className={styles.codeTextarea}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onInput={adjustHeight}
          style={{ height: textHeight }}
        ></textarea>
      </div>

      {/* Dica + botões */}
      <div className={styles.hintSection}>
        {showHint && hintText && (
          <>
            <div className={styles.hintBox} dangerouslySetInnerHTML={{ __html: hintText }} />
            <div className={styles.arrow}></div>
          </>
        )}
        <div className={styles.buttonLine} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          {hintText && (
            <button
              className={`${styles.actionButton} ${styles.hintButton}`}
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? 'OCULTAR' : 'DICA'}
            </button>
          )}
          <button
            className={`${styles.actionButton} ${styles.codePlayButton}`}
            onClick={onNext}
          >
            {mainButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
