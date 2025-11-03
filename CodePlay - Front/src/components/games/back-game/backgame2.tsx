import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css';
import '../../../global.d.ts';
import Fazenda from '../../../assets/fazenda.png';
import Personagem from '../../../assets/Lola.png';
import Extra from '../../../assets/sol.png';
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('backend');
  const [userCode, setUserCode] = useState(''); // guarda o código digitado pelo usuário

  // Função de validação do código
  const handleCheckCode = (input: string) => {
    const hasAppPost = /app\.post/.test(input);
    const hasReqBody = /req\.body/.test(input);
    const hasResJson = /res\.json/.test(input);

    if (hasAppPost && hasReqBody && hasResJson) {
      alert("✅ Rota criada com sucesso! Produto cadastrado corretamente.");
    } else {
      alert("⚠️ Verifique se você usou app.post, req.body e res.json corretamente.");
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
          description="Neste desafio, você vai criar uma rota POST para cadastrar produtos."
          context="O usuário enviará informações de um produto, e seu servidor deve armazená-las e responder com uma mensagem de confirmação."
          objective={`
      <>
      - Use app.post para criar a rota
      - Utilize req.body para receber os dados do produto<br/>
      - Retorne uma resposta usando res.json com uma mensagem de confirmação e o produto cadastrado          `}
          module="Back-end"
          level={2}
        />

        <CodeEditor
          welcomeText="💻 Vamos criar a rota POST para cadastrar produtos."
          instructionText="Escreva a rota usando <code>app.post('/produtos', ...)</code> e retorne o produto com uma mensagem de confirmação."
          codeExample={`app.post('/produtos', (req: Request, res: Response) => {\n  const produto = req.body;\n  res.json({ mensagem: 'Produto adicionado!', produto });\n});`}
          hintText="Lembre-se de tipar req e res: (req: Request, res: Response)."
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)}
        />

        <GameView
          falaPersonagem="Vamos cadastrar os produtos da fazenda!"
          fundo={Fazenda}
          personagem={Personagem}
          extra={Extra}
        />
      </div>
    </>
  );
};

export default App;
