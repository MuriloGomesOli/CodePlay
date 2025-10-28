// src/components/GameHeader.tsx
import React from 'react';
import { Button } from './button';
import { LogOut } from 'lucide-react';
import { Badge } from './badge';

interface GameHeaderProps {
  userName: string;
  userAvatar?: string;
  onLogout: () => void;
  currentModule: 'frontend' | 'backend' | 'database';
  level: string;
  activeModules?: { frontend?: boolean; backend?: boolean; database?: boolean };
  onModuleChange?: (module: 'frontend' | 'backend' | 'database') => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  userName,
  userAvatar,
  onLogout,
  currentModule,
  level,
  activeModules = { frontend: true, backend: true, database: true },
  onModuleChange,
}) => {
  const modules = [
    { key: 'frontend', label: 'Front-End' },
    { key: 'backend', label: 'Back-End' },
    { key: 'database', label: 'Banco de Dados' },
  ];

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        background: '#FFF7F3',
        borderBottom: '1px solid #f0d0d0',
        borderRadius: '0 0 10px 10px',
      }}
    >
      {/* Lado esquerdo: usuário e avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {userAvatar && (
          <img
            src={userAvatar}
            alt="Avatar"
            style={{ width: 40, height: 40, borderRadius: '50%' }}
          />
        )}
        <span style={{ fontWeight: 'bold', color: '#333' }}>{userName}</span>
      </div>

      {/* Lado central: módulos */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {modules.map((mod) => {
          if (activeModules[mod.key as keyof typeof activeModules]) {
            return (
              <Badge
                key={mod.key}
                variant={currentModule === mod.key ? 'secondary' : 'outline'}
                style={{ cursor: onModuleChange ? 'pointer' : 'default' }}
                onClick={() => onModuleChange?.(mod.key as any)}
              >
                {mod.label}
              </Badge>
            );
          }
          return null;
        })}
      </div>

      {/* Lado direito: nível e botão sair */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Badge variant="destructive">Nível {level}</Badge>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </header>
  );
};

export default GameHeader;
