import { useState } from 'react';
import '../styles/dashboard.css';
import '../index.css';
import { Button } from './ui/button.js';
import Logo from './Logo.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.js';
import { Badge } from './ui/badge.js';
import { LogOut, Database, Palette, Monitor, LogIn } from 'lucide-react';
import React from 'react';

interface DashboardProps {
  user: {
    name: string;
    email: string;
    avatar?: string; // ✅ adicionamos o avatar aqui
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
  { id: 9, title: 'Integração (Prisma)', description: 'Buscar dados de animais usando ORM Prisma.', difficulty: 'Difícil', technologies: ['MySQL', 'Prisma'] },
];

function ExerciseCard({ exercise, onStart }: { exercise: Exercise; onStart?: (ex: Exercise) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow dashboard-card">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{exercise.title}</CardTitle>
          <Badge
            className={`badge-difficulty ${
              exercise.difficulty === 'Fácil'
                ? 'easy'
                : exercise.difficulty === 'Médio'
                ? 'medium'
                : 'hard'
            }`}
          >
            {exercise.difficulty}
          </Badge>
        </div>
        <CardDescription>{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {exercise.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <Button className="w-full" onClick={() => onStart?.(exercise)}>
            {exercise.completed ? 'Revisar' : 'Iniciar Desafio'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Dashboard({ user, onLogout, onLoginClick, onStartExercise }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* 🔹 Cabeçalho */}
      <header className="dashboard-header bg-card border-b shadow-sm">
        <div className="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Marca */}
            <div className="flex items-center space-x-3 brand">
              <Logo />
              <button
                style={{ all: 'unset', cursor: 'pointer' }}
                onClick={() => window.location.reload()}
              >
                <h1>CodePlay</h1>
              </button>
            </div>

            {/* Ações (login / logout) */}
            <div className="flex items-center space-x-4 actions">
              {user ? (
                <div className="flex items-center space-x-2">
                  {/* ✅ Mostra o avatar do usuário */}
                  {user.avatar && (
                    <img
                      src={`http://localhost:5000/uploads/${user.avatar}`} // ou o caminho do seu back-end
                      alt="Avatar do usuário"
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                  )}
                  <span className="text-muted-foreground">Olá, {user.name}!</span>
                </div>
              ) : (
                <span className="text-muted-foreground">Olá!</span>
              )}

              {/* Se não tiver usuário → mostra botão "Faça login" */}
              {!user && (
                <Button variant="outline" size="sm" onClick={onLoginClick}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Faça login
                </Button>
              )}

              {/* Se tiver usuário → mostra botão de logout */}
              {user && (
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="page-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="dashboard-title">Desafios de Programação</h2>
          <p className="dashboard-subtitle">
            Escolha uma categoria e comece a praticar suas habilidades!
          </p>
        </div>

        {/* Abas */}
        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="frontend" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Front-End</span>
            </TabsTrigger>
            <TabsTrigger value="backend" className="flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span>Back-End</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Banco de Dados</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="frontend">
            <div className="exercise-grid">
              {frontendExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} onStart={onStartExercise} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backend">
            <div className="exercise-grid">
              {backendExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} onStart={onStartExercise} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="database">
            <div className="exercise-grid">
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
