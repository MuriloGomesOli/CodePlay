import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';

// 🔹 Mapa de jogos (import dinâmico)
const gamesMap = {
  frontend: {
    jogoBase: () => import('./components/games/front-game/jogoBase.tsx'),
    jogoFront2: () => import('./components/games/front-game/jogoFront2.tsx'),
    jogoFront3: () => import('./components/games/front-game/jogoFront3.tsx'),
  },
  backend: {
    backgame1: () => import('./components/games/back-game/backgame1.tsx'),
    backgame2: () => import('./components/games/back-game/backgame2.tsx'),
    backgame3: () => import('./components/games/back-game/backgame3.tsx'),
  },
  bancodados: { // 👈 nome padronizado, sem hífen
    bcdgame: () => import('./components/games/bcd-game/bcdgame.tsx'),
    bcdgame2: () => import('./components/games/bcd-game/bcdgame2.tsx'),
    bcdgame3: () => import('./components/games/bcd-game/bcdgame3.tsx'),
  },
};

// 🔹 Componente que carrega o jogo dinamicamente
function GameLoader() {
  const { modulo, nivel } = useParams();
  const [GameComponent, setGameComponent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!gamesMap[modulo] || !gamesMap[modulo][nivel]) {
      setError('❌ Módulo ou jogo inválido');
      return;
    }

    gamesMap[modulo][nivel]()
      .then((mod) => setGameComponent(() => mod.default))
      .catch((err) => {
        console.error(err);
        setError('🚫 Erro ao carregar o jogo');
      });
  }, [modulo, nivel]);

  if (error) return <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>{error}</h2>;
  if (!GameComponent) return <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>⏳ Carregando jogo...</h2>;

  return <GameComponent />;
}

// 🔹 App principal
export default function App() {
  const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
  const [user, setUser] = useState(isDev ? { name: 'Programador', email: 'dev@example.com' } : null);
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    setUser({ name: 'Desenvolvedor', email });
    navigate('/');
  };

  const handleRegister = (name, email, password) => {
    setUser({ name, email });
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleStartExercise = (exercise) => {
    // mapeia ID do exercício para módulo/nivel
    const maps = {
      1: '/games/frontend/jogoBase',
      2: '/games/frontend/jogoFront2',
      3: '/games/frontend/jogoFront3',
      4: '/games/backend/backgame1',
      5: '/games/backend/backgame2',
      6: '/games/backend/backgame3',
      7: '/games/bancodados/bcdgame',
      8: '/games/bancodados/bcdgame2',
      9: '/games/bancodados/bcdgame3',
    };

    const path = maps[exercise.id];
    if (path) navigate(path);
    else alert('Desafio não encontrado!');
  };

  return (
    <Routes>
      {/* Login e registro */}
      {!user ? (
        <>
          <Route
            path="/"
            element={<LoginForm onLogin={handleLogin} onSwitchToRegister={() => navigate('/register')} />}
          />
          <Route
            path="/register"
            element={<RegisterForm onRegister={handleRegister} onSwitchToLogin={() => navigate('/')} />}
          />
        </>
      ) : (
        <>
          {/* Dashboard e jogos */}
          <Route
            path="/"
            element={<Dashboard user={user} onLogout={handleLogout} onStartExercise={handleStartExercise} />}
          />
          <Route path="/games/:modulo/:nivel" element={<GameLoader />} />
        </>
      )}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
