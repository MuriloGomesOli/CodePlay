import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css';
import '../../../global.d.ts';
import Fazenda from '../../../assets/fazenda.png';
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('backend');
  const [userCode, setUserCode] = useState('');
  const [showJson, setShowJson] = useState(false);

  // ✅ Função de validação do código do aluno
  const handleCheckCode = (input: string) => {
    const hasJwtSign = /jwt\.sign/.test(input);
    const hasAppPostLogin = /app\.post\(['"]\/login['"]/.test(input);

    if (hasJwtSign && hasAppPostLogin) {
      alert("✅ Parabéns! Você gerou o token de login corretamente!");
      setShowJson(true);
    } else {
      alert("👀 Verifique se você criou a rota app.post('/login') e usou jwt.sign().");
      setShowJson(false);
    }
  };

  return (
    <>
      <GameHeader
        userName="Programador(a)"
        onLogout={() => console.log('Usuário saiu')}
        currentModule={currentModule}
        level="3"
        onModuleChange={setCurrentModule}
      />

      <div className={styles.appContainer}>
        <ExerciseInfo
          title="🧩 Nível 3 — Proteja o Celeiro (JWT)"
          description="Objetivo: gerar um token de login usando JSON Web Token (JWT)."
          context="Agora é hora de proteger o celeiro! Ao fazer login, o servidor deve gerar um token para o usuário 'Lola'. Esse token será usado depois para validar o acesso."
          objective={
            <>
              <strong>Exemplo de rota esperada:</strong><br />
              <code>const jwt = require('jsonwebtoken');</code><br />
              <code>app.post('/login', (req, res) =&gt; {"{"}</code><br />
              &nbsp;&nbsp;<code>const token = jwt.sign({"{ user: 'Lola' }"}, 'segredo');</code><br />
              &nbsp;&nbsp;<code>res.json({"{ token }"});</code><br />
              <code>{"}"});</code><br /><br />

              <strong>Explicação:</strong><br />
              Essa rota cria um token JWT para autenticação.  
              O método <code>jwt.sign()</code> gera o token com as informações do usuário e uma chave secreta.  
              O servidor responde com o token no formato JSON.<br /><br />

              <strong>Verificação:</strong><br />
              — A função <code>jwt.sign()</code> é usada<br />
              — A rota <code>app.post('/login')</code> foi criada<br />
            </>
          }
          module="Back-end"
          level={3}
        />

        <CodeEditor
          welcomeText="🔐 Proteja o celeiro!"
          instructionText="
            Crie uma rota POST chamada <code>/login</code> que gera um token JWT.  
            Use <code>jwt.sign()</code> para criar o token com <code>{ user: 'Lola' }</code> e a chave <code>'segredo'</code>."
          codeExample={`const jwt = require('jsonwebtoken');\n\napp.post('/login', (req, res) => {\n  const token = jwt.sign({ user: 'Lola' }, 'segredo');\n  res.json({ token });\n});`}
          hintText="
            💡 <strong>Dica:</strong><br/>
            — Importe o JWT com <code>require('jsonwebtoken')</code>.<br/>
            — Use <code>app.post('/login')</code>.<br/>
            — Gere o token com <code>jwt.sign()</code>.<br/>
            — Retorne o token usando <code>res.json()</code>."
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)}
        />

        <GameView
          falaPersonagem={showJson ? "Celeiro protegido! 🦊 Nenhum invasor vai entrar!" : "Crie a rota de login para gerar o token de acesso!"}
          apiResult={showJson ? [{ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }] : []}
        />
      </div>
    </>
  );
};

export default App;
