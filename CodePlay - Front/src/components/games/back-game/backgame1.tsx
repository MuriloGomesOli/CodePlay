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
  const [showJson, setShowJson] = useState(false); // controla exibição do JSON

  // Função de validação
  const handleCheckCode = (input: string) => {
    const hasAppGet = /app\.get/.test(input);
    const hasRota = /['"]\/animais['"]/.test(input);
    const hasResJson = /res\.json\(/.test(input);

    if (hasAppGet && hasRota && hasResJson) {
      alert("✅ Parabéns! Você criou a rota corretamente.");
      setShowJson(true); // exibe o JSON
    } else {
      alert("👀 Verifique se você usou app.get, a rota '/animais' e res.json([...]).");
      setShowJson(false); // esconde se estiver errado
    }
  };

  return (
    <>
      <GameHeader
        userName="Programador(a)"
        onLogout={() => console.log('Usuário saiu')}
        currentModule={currentModule}
        level="1"
        onModuleChange={setCurrentModule}
      />

      <div className={styles.appContainer}>
        <ExerciseInfo
          title="🧩 Nível 1 — Rota dos Animais"
          description="Objetivo: criar uma rota GET que retorne os animais da fazenda."
          context="Você precisa criar uma rota no Express para listar os animais: Vaca, Cavalo e Galo."
          objective={
            <>
              <strong>Exemplo de rota esperada:</strong><br/>
              <code>app.get('/animais', (req, res) =&gt; {"{"}</code><br/>
              &nbsp;&nbsp;<code>res.json(['Coloque', 'os', 'animais pedidos']);</code><br/>
              <code>{"}"});</code><br/><br/>

              <strong>Explicação:</strong><br/>
              Este desafio ensina como criar uma rota no <code>Express</code> que responde a uma requisição <code>GET</code>.  
              Ao acessar <code>/animais</code>, o servidor retorna uma lista dos animais da fazenda no formato JSON.<br/><br/>

              <strong>Verificação:</strong><br/>
              — A função <code>app.get</code> é usada<br/>
              — A rota <code>/animais</code> foi criada<br/>
              — A resposta usa <code>res.json()</code> para retornar os animais<br/>
            </>
          }
          module="Back-end"
          level={1}
        />

        <CodeEditor
          welcomeText="💻 Hora de criar sua rota!"
          instructionText="
            Crie uma rota GET no Express que devolve uma lista de animais da fazenda. 🐮🐔🐴  
            A rota deve ser <code>/animais</code> e usar <code>res.json</code> para enviar a resposta."
          codeExample={`app.get('/', (req, res) => {\n  res.json(['', '', '']);\n});`}
          hintText="
            💡 <strong>Dica:</strong><br/>
            — Use <code>(req, res)</code> como parâmetros.<br/>
            — Use <code>res.json()</code> para enviar os dados.<br/>
            — A rota deve ser <code>/animais</code>."
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)}
        />

        <GameView
          falaPersonagem={showJson ? "Parabéns! Sua rota /animais funcionou!" : "Crie sua rota para ver o resultado!"}
          apiResult={showJson ? ['Vaca', 'Cavalo', 'Galo'] : []} // mostra o JSON só se acertar
        />
      </div>
    </>
  );
}

export default App;
