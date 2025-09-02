import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [appState, setAppState] = useState('login');
  const [user, setUser] = useState(null);

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
      />
    );
  }

  // Fallback - nunca deve chegar aqui
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Carregando...</p>
    </div>
  );
}
