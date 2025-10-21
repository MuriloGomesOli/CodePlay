import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';
import Jogo from './components/games/front-game/jogoBase';
import JogoFront2 from './components/games/front-game/jogoFront2';
import JogoFront3 from './components/games/front-game/jogoFront3';




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

  // Quando um exercício for iniciado, abrir a tela do jogo
  const handleStartExercise = (exercise) => {
  console.log('[App] iniciar exercício', exercise?.id ?? exercise);

  // Abre o jogo correspondente com base no ID do exercício
  switch (exercise.id) {
    case 1:
      setAppState('jogo1'); // A fazenda da Galinha
      break;
    case 2:
      setAppState('jogo2'); // Todo List com React
      break;
    case 3:
      setAppState('jogo3'); // Dashboard Avançado
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
  jogo1: <Jogo />,
  jogo2: <JogoFront2 />,
  jogo3: <JogoFront3 />,
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
