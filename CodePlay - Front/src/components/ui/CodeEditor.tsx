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
  onSaveProgress?: () => void; // ✅ opcional (salvar progresso)
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  welcomeText,
  instructionText,
  codeExample,
  hintText,
  mainButtonText = 'CODEPLAY',
  onNext,
  onCodeChange,
  onTableCreate?: (data: { tableName: string; columns: string[] }) => void;
  onInsertRow?: (data: { tableName: string; row: any }) => void;
  onSaveProgress, // ✅ recebido aqui também
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

  // Atualiza altura sempre que o código muda
  useEffect(() => {
    adjustHeight();
  }, [code]);

  // Calcula número de linhas
  const lineNumbers = useMemo(() => {
    const lineCount = code.split('\n').length;
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  }, [code]);

  // Lida com a mudança de código
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    onCodeChange?.(e.target.value);
  };

 handleMainButtonconst handleMainButton = () => {
  const sql = code.trim();

  /* ============================
      1. CAPTURAR CREATE TABLE
  ============================ */
  const createRegex = /CREATE\s+TABLE\s+([a-zA-Z0-9_]+)\s*\(([\s\S]+?)\);?/i;
  const createMatch = sql.match(createRegex);

  if (createMatch) {
    const tableName = createMatch[1];

    const columnsRaw = createMatch[2]
      .split(',')
      .map((col) => col.trim().split(/\s+/)[0])
      .filter((c) => c.length > 0);

    onTableCreate?.({
      tableName,
      columns: columnsRaw,
    });

    alert(`Tabela "${tableName}" criada com sucesso!`);
    return;
  }

  /* ============================
      2. CAPTURAR INSERT INTO
  ============================ */
  const insertRegex =
    /INSERT\s+INTO\s+([a-zA-Z0-9_]+)\s*\(([\s\S]+?)\)\s*VALUES\s*\(([\s\S]+?)\);?/i;

  const insertMatch = sql.match(insertRegex);

  if (insertMatch) {
    const tableName = insertMatch[1];
    const colNames = insertMatch[2].split(',').map((c) => c.trim());
    const rawValues = insertMatch[3]
      .split(',')
      .map((v) => v.trim().replace(/^'|'$/g, "")); // remove aspas

    const row: any = {};
    colNames.forEach((col, i) => {
      row[col] = rawValues[i] ?? "";
    });

    onInsertRow?.({
      tableName,
      row,
    });

    alert("Linha inserida com sucesso!");
    return;
  }

  alert("Nenhum comando SQL válido foi detectado.");
};

    // Se quiser salvar progresso toda vez que apertar CODEPLAY:
    // onSaveProgress?.();

    onNext?.();
  };

  return (
    <div className={styles.codeCard}>
      {/* Seção de boas-vindas */}
      <div className={styles.welcomeSection}>
        <img src={codeLogo} alt="Code Play Logo" className={styles.codeLogo} />
        <p className={styles.welcomeText}>{welcomeText}</p>
      </div>

      {/* Instruções */}
      <div
        className={styles.instruction}
        dangerouslySetInnerHTML={{ __html: instructionText }}
      />

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
          onChange={handleChange}
          onInput={adjustHeight}
          style={{ height: textHeight }}
        />
      </div>

      {/* Dica + botões */}
      <div className={styles.hintSection}>
        {showHint && hintText && (
          <>
            <div
              className={styles.hintBox}
              dangerouslySetInnerHTML={{ __html: hintText }}
            />
            <div className={styles.arrow}></div>
          </>
        )}

        <div
          className={styles.buttonLine}
          style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}
        >
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
            onClick={handleMainButton, onSqlExecute}
          >
            {mainButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
