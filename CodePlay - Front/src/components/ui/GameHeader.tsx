import React from 'react';
import { Button } from './button';
import { LogOut } from 'lucide-react';
import { Badge } from './badge';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/jogo.module.css';

interface GameHeaderProps {
  userName: string;
  userAvatar?: string;
  currentModule: 'frontend' | 'backend' | 'database';
  level: string;
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
      <div className={styles.leftSection}>
        {userAvatar && <img src={userAvatar} alt="Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />}
        <span className={styles.userName}>{userName}</span>
      </div>

      <div className={styles.centerSection}>
        <Badge variant="secondary" className={styles.badgeModule}>
          {moduleLabels[currentModule]}
        </Badge>
      </div>

      <div className={styles.rightSection}>
        <Badge variant="destructive">Nível {level}</Badge>
        <Button variant="outline" size="sm" className={styles.logoutButton} onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </header>
  );
};

export default GameHeader;
