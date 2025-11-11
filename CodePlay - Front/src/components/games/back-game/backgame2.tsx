import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css';
import '../../../global.d.ts';
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('backend');
  const [userCode, setUserCode] = useState('');
  const [showJson, setShowJson] = useState(false);

  // ✅ Função de validação do código do aluno
  const handleCheckCode = (input: string) => {
    const hasAppPost = /app\.post/.test(input);
    const hasRota = /['"]\/produtos['"]/.test(input);
    const hasReqBody = /req\.body/.test(input);
    const hasResJson = /res\.json\(/.test(input);

    if (hasAppPost && hasRota && hasReqBody && hasResJson) {
      alert("✅ Parabéns! Você criou a rota POST corretamente.");
      setShowJson(true);
    } else {
      alert("👀 Verifique se você usou app.post, a rota '/produtos', req.body e res.json().");
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
        <ExerciseInfo
          title="🧩 Nível 2 — Cadastro de Produtos"
          description="Objetivo: criar uma rota POST para cadastrar produtos."
          context="Agora você vai criar uma rota no Express que recebe um produto e retorna uma mensagem de sucesso com o produto enviado."
          objective={
            <>
              <strong>Exemplo de rota esperada:</strong><br />
              <code>app.post('/produtos', (req, res) =&gt; {"{"}</code><br />
              &nbsp;&nbsp;<code>const produto = req.body;</code><br />
              &nbsp;&nbsp;<code>res.json({"{ mensagem: 'Produto adicionado!', produto }"});</code><br />
              <code>{"}"});</code><br /><br />

              <strong>Explicação:</strong><br />
              Essa rota usa o método <code>POST</code> do Express para cadastrar um novo produto.  
              O produto vem no corpo da requisição (<code>req.body</code>) e o servidor responde com uma mensagem confirmando o cadastro.<br /><br />

              <strong>Verificação:</strong><br />
              — A função <code>app.post</code> é usada<br />
              — A rota <code>/produtos</code> foi criada<br />
              — O <code>req.body</code> é utilizado<br />
              — A resposta usa <code>res.json()</code><br />
            </>
          }
          module="Back-end"
          level={2}
        />

        <CodeEditor
          welcomeText="🛒 Vamos cadastrar um produto!"
          instructionText="
            Crie uma rota POST no Express chamada <code>/produtos</code>.  
            Ela deve pegar o <code>req.body</code> e responder com <code>res.json()</code> mostrando a mensagem e o produto."
          codeExample={`app.post('/produtos', (req, res) => {\n  const produto = req.body;\n  res.json({ mensagem: 'Produto adicionado!', produto });\n});`}
          hintText="
            💡 <strong>Dica:</strong><br/>
            — Use <code>app.post</code>.<br/>
            — Acesse o corpo da requisição com <code>req.body</code>.<br/>
            — Use <code>res.json()</code> para retornar a resposta."
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)}
        />

        <GameView
          falaPersonagem={showJson ? "Perfeito! O produto foi cadastrado com sucesso! 🎉" : "Crie sua rota POST para ver o resultado!"}
          apiResult={showJson ? [{ mensagem: 'Produto adicionado!', produto: { nome: 'Cenoura', preco: 2.5 } }] : []}
        />
      </div>
    </>
  );
};

export default App;
