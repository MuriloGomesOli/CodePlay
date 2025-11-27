import React from 'react';
import { Button } from './ui/button.js';
import Logo from './Logo.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.js';
import { Badge } from './ui/badge.js';
import { LogOut, Database, Palette, Monitor, LogIn } from 'lucide-react';
import '../styles/dashboard.css';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onLogout: () => void;
  onLoginClick?: () => void;
  onStartExercise?: (exercise: Exercise) => void;
}

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  technologies: string[];
  completed?: boolean;
}

// ==============================
// EXERCÍCIOS
// ==============================
const frontendExercises: Exercise[] = [
  { id: 1, title: 'A Fazenda da Galinha', description: 'Ajude a Galinha Lola a montar sua fazenda.', difficulty: 'Fácil', technologies: ['CSS'] },
  { id: 2, title: 'Anime a Fazenda', description: 'Desenvolva animações para os elementos da fazenda.', difficulty: 'Fácil', technologies: ['CSS'] },
  { id: 3, title: 'Monte o Celeiro Responsivo', description: 'Criar layout adaptável', difficulty: 'Difícil', technologies: ['React', 'Tailwind'] },
];

const backendExercises: Exercise[] = [
  { id: 4, title: 'Rota dos Animais', description: 'Crie uma rota GET que retorne uma lista de animais.', difficulty: 'Fácil', technologies: ['Node.js', 'JavaScript'] },
  { id: 5, title: 'Cadastro de Produtos', description: 'Implemente uma rota POST que receba um produto e retorne uma confirmação.', difficulty: 'Médio', technologies: ['Node.js', 'Express'] },
  { id: 6, title: 'Proteja o Celeiro (JWT)', description: 'Crie uma rota POST /login que gere um token JWT para autenticação.', difficulty: 'Difícil', technologies: ['Node.js', 'jsonwebtoken'] },
];

const databaseExercises: Exercise[] = [
  { id: 7, title: 'Criar Tabela', description: 'Montar tabela de animais com colunas id, nome e tipo.', difficulty: 'Fácil', technologies: ['MySQL', 'SQL'] },
  { id: 8, title: 'Atualizar Estoque', description: 'Atualizar a quantidade de produtos usando UPDATE.', difficulty: 'Médio', technologies: ['SQL'] },
  { id: 9, title: 'Criar uma Database', description: 'Realizar o inicio de uma criação completa de um banco de dados', difficulty: 'Difícil', technologies: ['MySQL'] },
];

// ==============================
// COMPONENTE CARD
// ==============================
function ExerciseCard({ exercise, onStart }: { exercise: Exercise; onStart?: (ex: Exercise) => void }) {
  return (
    <Card className="dashboardCard">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="cardTitle">{exercise.title}</CardTitle>
          <Badge
            className={`badgeDifficulty ${exercise.difficulty === 'Fácil'
              ? 'easy'
              : exercise.difficulty === 'Médio'
                ? 'medium'
                : 'hard'
              }`}
          >
            {exercise.difficulty}
          </Badge>
        </div>
        <CardDescription className="cardDesc">{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {exercise.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
          <Button className="dashboardBtn" onClick={() => onStart?.(exercise)}>
            {exercise.completed ? 'Revisar' : 'Iniciar Desafio'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ==============================
// COMPONENTE DASHBOARD
// ==============================
export function Dashboard({ user, onLogout, onLoginClick, onStartExercise }: DashboardProps) {
  return (
    <div className="minScreen">

      {/* HEADER COM 3 COLUNAS (ESQ → LOGO → DIREITA) */}
      <header className="dashboardHeader">
        <div className="headerGrid">

          {/* Coluna ESQUERDA — usuário */}
          <div className="headerUser">
            {user?.avatar && (
              <img
                src={new URL(`../assets/avatars/${user.avatar}.png`, import.meta.url).href}
                alt="Avatar do usuário"
                className="avatar"
              />
            )}
            <span className="textMuted">
              {user ? `Olá, ${user.name}` : 'Olá, Programador'}
            </span>
          </div>

          {/* Coluna CENTRAL — Logo */}
          <div className="headerLogo">
            <Logo />
          </div>

          {/* Coluna DIREITA — botão */}
          <div className="headerActions">
            {!user && onLoginClick && (
              <Button className="headerBtn" variant="outline" size="sm" onClick={onLoginClick}>
                <LogIn className="h-4 w-4" /> Faça login
              </Button>
            )}
            {user && (
              <Button className="headerBtn" variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" /> Sair
              </Button>
            )}
          </div>

        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="pageContainer py-8">
        <Tabs defaultValue="frontend">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="frontend" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Front-End</span>
            </TabsTrigger>
            <TabsTrigger value="backend" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span>Back-End</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Banco de Dados</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="frontend">
            <div className="exerciseGrid">
              {frontendExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} onStart={onStartExercise} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backend">
            <div className="exerciseGrid">
              {backendExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} onStart={onStartExercise} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="database">
            <div className="exerciseGrid">
              {databaseExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} onStart={onStartExercise} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default Dashboard;