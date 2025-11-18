import React, { useEffect, useState } from 'react';
import { Button } from './button';
import { LogOut } from 'lucide-react';
import { Badge } from './badge';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/jogo.module.css';

// Avatar padrão caso não encontre o do usuário
import vacaDefault from '../../assets/avatars/vaca.png';

interface UserData {
  name: string;
  avatar?: string;
}

interface GameHeaderProps {
  currentModule: 'frontend' | 'backend' | 'database';
  level: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({ currentModule, level }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => navigate('/dashboard');

  const moduleLabels = {
    frontend: 'Front-End',
    backend: 'Back-End',
    database: 'Banco de Dados',
  };

  // resolve avatar automaticamente
  const avatarUrl =
    user?.avatar
      ? new URL(`../../assets/avatars/${user.avatar}.png`, import.meta.url).href
      : vacaDefault;

  return (
    <header className={styles.header}>
      {/* 🧍 Seção esquerda: avatar + nome */}
      <div className={styles.leftSection}>
        <img
          src={avatarUrl}
          alt="Avatar do usuário"
          className={styles.userAvatar}
        />
        <span className={styles.userName}>
          {user?.name || "Carregando..."}
        </span>
      </div>

      {/* 🎯 Seção central: módulo ativo */}
      <div className={styles.centerSection}>
        <Badge variant="secondary" className={styles.badgeModule}>
          {moduleLabels[currentModule]}
        </Badge>
      </div>

      {/* ⚙️ Seção direita: nível + botão de sair */}
      <div className={styles.rightSection}>
        <Badge variant="destructive">Nível {level}</Badge>

        <Button
          variant="outline"
          size="sm"
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </header>
  );
};

export default GameHeader;
