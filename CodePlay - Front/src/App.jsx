import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';
import ProfilePage from './components/ProfilePage';

// Mapa dos jogos
const gamesMap = {
  frontend: {
    jogoBase: () => import('./components/games/front-game/jogoBase'),
    jogoFront2: () => import('./components/games/front-game/jogoFront2'),
    jogoFront3: () => import('./components/games/front-game/jogoFront3'),
  },
  backend: {
    backgame1: () => import('./components/games/back-game/backgame1'),
    backgame2: () => import('./components/games/back-game/backgame2'),
    backgame3: () => import('./components/games/back-game/backgame3'),
  },
  bancodados: {
    bcdgame: () => import('./components/games/bcd-game/bcdgame'),
    bcdgame2: () => import('./components/games/bcd-game/bcdgame2'),
    bcdgame3: () => import('./components/games/bcd-game/bcdgame3'),
  },
};

// Loader de jogo
function GameLoader({ user }) {
  const { modulo, nivel } = useParams();
  const [GameComponent, setGameComponent] = useState(null);
  const [error, setError] = useState('');

  const gameDbIds = {
    jogoBase: 1,
    jogoFront2: 2,
    jogoFront3: 3,
    backgame1: 4,
    backgame2: 5,
    backgame3: 6,
    bcdgame: 7,
    bcdgame2: 8,
    bcdgame3: 9,
  };

  const gameId = gameDbIds[nivel];

  useEffect(() => {
    if (!gamesMap[modulo] || !gamesMap[modulo][nivel]) {
      setError('❌ Módulo ou jogo inválido');
      return;
    }

    gamesMap[modulo][nivel]()
      .then((mod) => {
        setGameComponent(() => mod.default);
      })
      .catch(() => {
        setError('🚫 Erro ao carregar o jogo');
      });

  }, [modulo, nivel]);

  if (error) return <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>{error}</h2>;
  if (!GameComponent)
    return <h2 style={{ textAlign: 'center', marginTop: '3rem' }}>⏳ Carregando jogo...</h2>;

  return <GameComponent user={user} gameId={gameId} />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Carregar usuário salvo
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // Login
  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate('/');
  };

  // Registro
  const handleRegister = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigate('/');
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Abrir jogo
  const handleStartExercise = (exercise) => {
    if (!user) {
      alert("Você precisa estar logado para jogar!");
      navigate("/login");
      return;
    }

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
      {/* Dashboard */}
      <Route
        path="/"
        element={
          <Dashboard
            user={user}
            onLogout={handleLogout}
            onLoginClick={() => navigate('/login')}
            onStartExercise={handleStartExercise}
          />
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => navigate('/register')}
          />
        }
      />

      {/* Registro */}
      <Route
        path="/register"
        element={
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => navigate('/login')}
          />
        }
      />

      {/* Jogos */}
      <Route
        path="/games/:modulo/:nivel"
        element={<GameLoader user={user} />}
      />

      {/* Perfil */}
      <Route
        path="/profile"
        element={
          user ? <ProfilePage /> : <Navigate to="/login" />
        }
      />

      {/* Padrão */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
