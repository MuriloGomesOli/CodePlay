import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';

import Jogo from './components/games/front-game/jogoBase';
import JogoFront2 from './components/games/front-game/jogoFront2';
import JogoFront3 from './components/games/front-game/jogoFront3';

import BackGame1 from './components/games/back-game/backgame1';
import BackGame2 from './components/games/back-game/backgame2';
import BackGame3 from './components/games/back-game/backgame3';

import BcdGame1 from './components/games/bcd-game/bcdgame';
import BcdGame2 from './components/games/bcd-game/bcdgame2';
import BcdGame3 from './components/games/bcd-game/bcdgame3';
//----------------------------------------------------------------------------------------


export default function App() {
  console.log('[App] render start');
  // Em ambiente de desenvolvimento (Vite) abrir direto no dashboard com um usuário mock
  const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
  const [appState, setAppState] = useState(isDev ? 'dashboard' : 'login');
  const [user, setUser] = useState(isDev ? { name: 'Programador', email: 'dev@example.com' } : null);

  const handleLogin = (email, password) => {
    const mockUser = {
      name: 'Desenvolvedor',
      email: email,
    };
    setUser(mockUser);
    setAppState('dashboard');
  };

  const handleRegister = (name, email, password) => {
    const newUser = {
      name: name,
      email: email,
    };
    setUser(newUser);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('login');
  };

  const handleStartExercise = (exercise) => {
  console.log('[App] iniciar exercício', exercise?.id ?? exercise);

  switch (exercise.id) {
    // FRONT-END
    case 1:
      setAppState('jogoFront1');
      break;
    case 2:
      setAppState('jogoFront2');
      break;
    case 3:
      setAppState('jogoFront3');
      break;

    // BACK-END
    case 4:
      setAppState('jogoBack1');
      break;
    case 5:
      setAppState('jogoBack2');
      break;
    case 6:
      setAppState('jogoBack3');
      break;

    // BANCO DE DADOS
    case 7:
      setAppState('jogoBcd1');
      break;
    case 8:
      setAppState('jogoBcd2');
      break;
    case 9:
      setAppState('jogoBcd3');
      break;

    default:
      console.warn('Nenhum jogo vinculado a este exercício:', exercise);
      break;
  }
};


  const switchToRegister = () => setAppState('register');
  const switchToLogin = () => setAppState('login');

  if (appState === 'login') {
    return (
      <LoginForm
        onLogin={handleLogin}
        onSwitchToRegister={switchToRegister}
      />
    );
  }

  if (appState === 'register') {
    return (
      <RegisterForm
        onRegister={handleRegister}
        onSwitchToLogin={switchToLogin}
      />
    );
  }

  if (appState === 'dashboard' && user) {
    return (
      <Dashboard
        user={user}
  onLogout={handleLogout}
  onStartExercise={handleStartExercise}
      />
    );
  }

  const games = {
  // FRONT-END
  jogoFront1: <Jogo />,
  jogoFront2: <JogoFront2 />,
  jogoFront3: <JogoFront3 />,

  // BACK-END
  jogoBack1: <BackGame1 />,
  jogoBack2: <BackGame2 />,
  jogoBack3: <BackGame3 />,

  // BANCO DE DADOS
  jogoBcd1: <BcdGame1 />,
  jogoBcd2: <BcdGame2 />,
  jogoBcd3: <BcdGame3 />,
};

if (user && games[appState]) {
  return games[appState];
}


  // Fallback - nunca deve chegar aqui
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Carregando...</p>
    </div>
  );
}
