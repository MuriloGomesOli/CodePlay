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
  onCodeChange?: (code: string) => void;

  // SQL opcional — só funcionam no jogo de banco de dados
  onTableCreate?: (data: { tableName: string; columns: string[] }) => void;
  onInsertRow?: (data: { tableName: string; row: any }) => void;
  onSqlExecute?: () => void;

  onSaveProgress?: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  welcomeText,
  instructionText,
  codeExample,
  hintText,
  mainButtonText = 'CODEPLAY',
  onNext,
  onCodeChange,
  onTableCreate,
  onInsertRow,
  onSqlExecute,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [code, setCode] = useState(codeExample);
  const [textHeight, setTextHeight] = useState<number | undefined>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* ===== altura dinâmica ===== */
  const adjustHeight = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    setTextHeight(textareaRef.current.scrollHeight);
  };

  useEffect(() => adjustHeight(), [code]);

  /* ===== números das linhas ===== */
  const lineNumbers = useMemo(() => {
    return Array.from({ length: code.split('\n').length }, (_, i) => i + 1);
  }, [code]);

  /* ===== atualizar código digitado ===== */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    onCodeChange?.(e.target.value);
  };

  /* ===========================================================
     BOTÃO PRINCIPAL → detecta SQL OU apenas chama onNext
  ============================================================ */
  const handleMainButton = () => {
    const sql = code.trim();

    /* ------ CREATE TABLE ------ */
    const createRegex = /CREATE\s+TABLE\s+([a-zA-Z0-9_]+)\s*\(([\s\S]+?)\);?/i;
    const c = sql.match(createRegex);

    if (c) {
      const tableName = c[1];
      const columns = c[2]
        .split(',')
        .map((x) => x.trim().split(/\s+/)[0])
        .filter(Boolean);

      onTableCreate?.({ tableName, columns });
      onSqlExecute?.();

      alert(`Tabela "${tableName}" criada!`);
      return;
    }

    /* ------ INSERT INTO ------ */
    const insertRegex =
      /INSERT\s+INTO\s+([a-zA-Z0-9_]+)\s*\(([\s\S]+?)\)\s*VALUES\s*\(([\s\S]+?)\);?/i;
    const i = sql.match(insertRegex);

    if (i) {
      const tableName = i[1];
      const cols = i[2].split(',').map((t) => t.trim());
      const vals = i[3]
        .split(',')
        .map((v) => v.trim().replace(/^'|'$/g, ''));

      const row: any = {};
      cols.forEach((c, index) => (row[c] = vals[index] ?? ''));

      onInsertRow?.({ tableName, row });
      onSqlExecute?.();

      alert('Linha inserida!');
      return;
    }

    /* ------ não é SQL → fluxo normal ------ */
    onNext?.();
  };

  return (
    <div className={styles.codeCard}>
      
      <div className={styles.welcomeSection}>
        <img src={codeLogo} className={styles.codeLogo} />
        <p className={styles.welcomeText}>{welcomeText}</p>
      </div>

      <div
        className={styles.instruction}
        dangerouslySetInnerHTML={{ __html: instructionText }}
      />

      <div className={styles.editorArea}>
        <div className={styles.lineNumbersContainer} style={{ height: textHeight }}>
          {lineNumbers.map((n) => (
            <span key={n} className={styles.lineNumber}>
              {n}
            </span>
          ))}
        </div>

        <textarea
          ref={textareaRef}
          value={code}
          className={styles.codeTextarea}
          onChange={handleChange}
          onInput={adjustHeight}
          style={{ height: textHeight }}
        />
      </div>

      <div className={styles.hintSection}>
        {showHint && hintText && (
          <>
            <div
              className={styles.hintBox}
              dangerouslySetInnerHTML={{ __html: hintText }}
            />
            <div className={styles.arrow} />
          </>
        )}

        <div className={styles.buttonLine}>
          {hintText && (
            <button
              className={`${styles.actionButton} ${styles.hintButton}`}
              onClick={() => setShowHint((s) => !s)}
            >
              {showHint ? 'OCULTAR' : 'DICA'}
            </button>
          )}

          <button
            className={`${styles.actionButton} ${styles.codePlayButton}`}
            onClick={handleMainButton}
          >
            {mainButtonText}
          </button>
        </div>
      </div>

    </div>
  );
};

export default CodeEditor;
