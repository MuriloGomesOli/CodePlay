import React from 'react';
import { Button } from './button';
import { LogOut } from 'lucide-react';
import { Badge } from './badge';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/jogo.module.css';
import vacaDefault from '../../assets/avatars/vaca.png';

interface GameHeaderProps {
  userName: string;
  userAvatar?: string;
  currentModule: 'frontend' | 'backend' | 'database';
  level: string;
  onLogout?: () => void;
  activeModules?: { frontend?: boolean; backend?: boolean; database?: boolean };
  onModuleChange?: (module: 'frontend' | 'backend' | 'database') => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  userName,
  userAvatar,
  currentModule,
  level,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => navigate('/dashboard');

  const moduleLabels: Record<typeof currentModule, string> = {
    frontend: 'Front-End',
    backend: 'Back-End',
    database: 'Banco de Dados',
  };

  return (
    <header className={styles.header}>
      {/* 🧍 Seção esquerda: avatar + nome */}
      <div className={styles.leftSection}>
        <img
          src={userAvatar || vacaDefault}
          alt="Avatar do usuário"
          className={styles.userAvatar}
        />
        <span className={styles.userName}>{userName}</span>
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
