import React, { useState } from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import GameHeader from '../../ui/GameHeader';
import '../../../index.css';
import '../../../global.d.ts';
import Fazenda from '../../../assets/fazenda.png';
import Personagem from '../../../assets/lola.png';
import Extra from '../../../assets/sol.png';
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<'frontend' | 'backend' | 'database'>('backend');
  const [userCode, setUserCode] = useState(''); // guarda o código do usuário

  // Função de validação
  const handleCheckCode = (input: string) => {
    const hasAppGet = /app\.get/.test(input);
    const hasRota = /['"]\/animais['"]/.test(input);
    const hasResJson = /res\.json\(/.test(input);

    if (hasAppGet && hasRota && hasResJson) {
      alert("✅ Parabéns! Você criou a rota corretamente.");
    } else {
      alert("👀 Verifique se você usou app.get, a rota '/animais' e res.json([...]).");
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
              &nbsp;&nbsp;<code>res.json(['Vaca', 'Cavalo', 'Galo']);</code><br/>
              <code>{"}"});</code><br/><br/>
              <strong>Verificação:</strong><br/>
              — app.get existe<br/>
              — Rota /animais<br/>
              — res.json é chamado
            </>
          }
          module="Back-end"
          level={1}
        />

        <CodeEditor
          welcomeText="💻 Hora de criar sua rota!"
          instructionText="Escreva um comando usando <code>app.get</code> para retornar a lista de animais. A rota deve ser <code>/animais</code> e usar <code>res.json</code>."
          codeExample={`app.get('/animais', (req, res) => {\n  res.json(['Vaca', 'Cavalo', 'Galo']);\n});`}
          hintText="Dica: lembre-se de criar a função callback com (req, res) e usar res.json([...])."
          mainButtonText="CONFIRMAR"
          onNext={() => handleCheckCode(userCode)}
          onCodeChange={(code) => setUserCode(code)}
        />

        <GameView
          falaPersonagem="Olá! Vamos criar a rota dos animais juntos?"
          fundo={Fazenda}
          personagem={Personagem}
          extra={Extra}
          userStyle={userCode} // só para exibir o código digitado
        />
      </div>
    </>
  );
};

export default App;
