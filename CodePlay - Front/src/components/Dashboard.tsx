import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

// Avatar padrão
import vacaDefault from '../assets/avatars/vaca.png';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface Exercise {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: 'frontend' | 'backend' | 'bancodados';
}

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onStartExercise: (exercise: Exercise) => void;
}

const exercises: Exercise[] = [
  { id: 1, title: 'Nível 1: Flexbox Básico', description: 'Aprenda os fundamentos do Flexbox organizando elementos na fazenda.', tags: ['HTML', 'CSS', 'Flexbox'], category: 'frontend' },
  { id: 2, title: 'Nível 2: Flexbox Avançado', description: 'Domine propriedades avançadas do Flexbox com desafios complexos.', tags: ['CSS', 'Flexbox', 'Layout'], category: 'frontend' },
  { id: 3, title: 'Nível 3: Grid de Animais', description: 'Crie layouts responsivos usando CSS Grid na fazenda.', tags: ['CSS', 'Grid', 'Responsive'], category: 'frontend' },
  { id: 4, title: 'Nível 1: Rotas Express', description: 'Construa APIs RESTful com Express.js para gerenciar a fazenda.', tags: ['Node.js', 'Express', 'API'], category: 'backend' },
  { id: 5, title: 'Nível 2: Cadastro de Animais', description: 'Implemente CRUD completo para gerenciar animais da fazenda.', tags: ['Express', 'CRUD', 'Validação'], category: 'backend' },
  { id: 6, title: 'Nível 3: Proteja o Celeiro (JWT)', description: 'Aprenda autenticação e autorização com JWT.', tags: ['JWT', 'Auth', 'Security'], category: 'backend' },
  { id: 7, title: 'Nível 1: SQL Básico', description: 'Aprenda comandos SQL fundamentais para consultar dados.', tags: ['SQL', 'SELECT', 'Database'], category: 'bancodados' },
  { id: 8, title: 'Nível 2: Relacionamentos', description: 'Domine JOINs e relacionamentos entre tabelas.', tags: ['SQL', 'JOIN', 'Relations'], category: 'bancodados' },
  { id: 9, title: 'Nível 3: Chaves Estrangeiras', description: 'Aprenda a criar e gerenciar relacionamentos com Foreign Keys.', tags: ['SQL', 'Foreign Key', 'Constraints'], category: 'bancodados' }
];

const categoryLabels = {
  frontend: '🎨 Front-end',
  backend: '⚙️ Back-end',
  bancodados: '🗄️ Banco de Dados'
};

export function Dashboard({ user, onLogout, onLoginClick, onStartExercise }: DashboardProps) {
  const [activeCategory, setActiveCategory] = useState<'frontend' | 'backend' | 'bancodados'>('frontend');
  const navigate = useNavigate();

  const filteredExercises = exercises.filter(ex => ex.category === activeCategory);

  const avatarUrl = user?.avatar ? new URL(`../assets/avatars/${user.avatar}.png`, import.meta.url).href : vacaDefault;

  return (
    <div className="dashboardContainer">
      <header className="dashboardHeader">
        <div className="headerContent">
          {user ? (
            <div className="headerUser" onClick={() => navigate('/profile')}>
              <img src={avatarUrl} alt={user.name} className="avatar" />
              <span className="textMuted">{user.name}</span>
            </div>
          ) : <div className="headerPlaceholder"></div>}
          <div className="headerLogo">CODEPLAY</div>
          <div className="headerActions">
            {user ? (
              <button className="headerBtn" onClick={onLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Sair
              </button>
            ) : (
              <button className="headerBtn" onClick={onLoginClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                Entrar
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="mainContent">
        <div className="moduleSelectionWrapper">
          <div className="moduleSelectionBox">
            <h3 className="moduleSelectionTitle">📚 Escolha o Módulo:</h3>
            <div className="moduleButtonsContainer">
              {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`moduleButton ${activeCategory === cat ? 'active' : ''}`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="exerciseGrid">
          {filteredExercises.map(exercise => (
            <div key={exercise.id} className="exerciseCard">
              <h3 className="exerciseTitle">{exercise.title}</h3>
              <p className="exerciseDescription">{exercise.description}</p>
              <div className="tagList">
                {exercise.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <button className="cardBtn" onClick={() => onStartExercise(exercise)}>Iniciar Desafio</button>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé */}
      <footer className="dashboardFooter">
        <div className="footerContent">
          <div>
            <h4 className="footerBrandTitle">CODEPLAY</h4>
            <p className="footerText">
              Uma plataforma interativa desenvolvida para transformar o aprendizado de programação em uma jornada divertida e envolvente. Nossa missão é tornar o código acessível a todos através da gamificação.
            </p>
          </div>
          <div>
            <h4 className="footerSectionTitle">Sobre a Criação</h4>
            <p className="footerText">
              Desenvolvido com paixão por educação e tecnologia. Cada desafio foi cuidadosamente planejado para ensinar conceitos reais de desenvolvimento de software, do básico ao avançado, em um ambiente seguro e amigável.
            </p>
          </div>
          <div>
            <h4 className="footerSectionTitle">Tecnologias</h4>
            <div className="footerTechList">
              {['React', 'TypeScript', 'Node.js', 'Gamification', 'Education'].map(tech => (
                <span key={tech} className="footerTechTag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="footerCopyright">
          © 2024 CodePlay. Todos os direitos reservados. Feito com 🧡 para desenvolvedores.
        </div>
      </footer>
    </div>
  );
}
