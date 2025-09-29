import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';
import Jogo from './components/jogoBase';

export default function App() {
  console.log('[App] render start');
  // Em ambiente de desenvolvimento (Vite) abrir direto no dashboard com um usuário mock
  const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
  const [appState, setAppState] = useState(isDev ? 'dashboard' : 'login');
  const [user, setUser] = useState(isDev ? { name: 'Dev', email: 'dev@example.com' } : null);

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
    setAppState('jogo');
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

  if (appState === 'jogo' && user) {
    return <Jogo />;
  }

  // Fallback - nunca deve chegar aqui
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Carregando...</p>
    </div>
  );
}
