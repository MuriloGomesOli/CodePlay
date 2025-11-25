import React, { useState, useEffect } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css';
import '../../../global.d.ts';
import styles from '../../../styles/jogo.module.css';

interface JogoBaseProps {
  user: { id: string };
  gameId: string;
}

export default function JogoBase({ user, gameId }: JogoBaseProps) {
  const [currentModule, setCurrentModule] =
    useState<'frontend' | 'backend' | 'database'>('backend');

  const [userCode, setUserCode] = useState('');
  const [showJson, setShowJson] = useState(false);

  // SALVAR PROGRESSO
  useEffect(() => {
    window.salvarProgresso = async () => {
      await fetch('http://localhost:5000/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          game_id: gameId,
        }),
      });
    };
  }, [user.id, gameId]);

  // VALIDAR CÓDIGO DO ALUNO
  const handleCheckCode = (input: string) => {
    const hasPost = /app\.post\s*\(/.test(input);
    const hasRoute = /['"]\/produtos['"]/.test(input);
    const hasBody = /req\.body/.test(input);
    const hasResJson = /res\.json\s*\(/.test(input);

    if (hasPost && hasRoute && hasBody && hasResJson) {
      alert('✅ Parabéns! Você criou a rota POST corretamente.');
      setShowJson(true);
    } else {
      alert(
        '👀 Verifique se você usou: app.post, a rota /produtos, req.body e res.json(...).'
      );
      setShowJson(false);
    }
  };

  return (
    <>
      <GameHeader
        userName="Programador(a)"
        onLogout={() => console.log('Usuário saiu')}
        currentModule={currentModule}
        level="2"
        onModuleChange={setCurrentModule}
      />

      <div className={styles.appContainer}>
        {/* EXERCÍCIO */}
        <ExerciseInfo
          title="🧩 Nível 2 — Adicionando Produtos"
          description="Objetivo: criar uma rota POST que receba um produto e devolva uma mensagem."
          context="Neste desafio, você vai aprender a enviar dados do cliente para o servidor usando o req.body."
          objective={
            <>
              <strong>O que você vai fazer agora?</strong>
              <br />
              Criar uma rota <code>POST</code> no Express que recebe um produto com{' '}
              <code>req.body</code> e devolve uma confirmação com <code>res.json()</code>.
              <br />
              <br />

              <strong>Estrutura básica:</strong>
              <br />

              <code>app.post('/produtos', (req, res) =&gt; &#123;</code>
              <br />
              &nbsp;&nbsp;
              <code>const produto = req.body;</code>
              <br />
              &nbsp;&nbsp;
              <code>res.json(&#123; mensagem: 'Produto adicionado!', produto &#125;);</code>
              <br />
              <code>&#125;);</code>
            </>
          }
          module="Back-end"
          level={2}
        />

        {/* EDITOR */}
        <CodeEditor
          welcomeText="💻 Agora você vai criar uma rota POST!"
          instructionText="Crie uma rota POST que receba um produto e responda com uma mensagem JSON."
          codeExample={`app.post('/produtos', (req, res) => {\n  const produto = req.body;\n  res.json({ mensagem: 'Produto adicionado!', produto });\n});`}
          hintText="💡 Use req.body para pegar os dados enviados e res.json() para devolver uma resposta."
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)}
        />

        {/* GAME VIEW */}
        <GameView
          falaPersonagem={
            showJson
              ? 'Produto recebido com sucesso! 📦'
              : 'Crie a rota POST para adicionar produtos!'
          }
          apiResult={
            showJson
              ? [{ mensagem: 'Produto adicionado!', produto: { nome: 'Leite' } }]
              : []
          }
        />
      </div>
    </>
  );
}
