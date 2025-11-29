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
    <div style={{ minHeight: '100vh', background: '#fff5f0', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#db6627', padding: '12px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          {user ? (
            <div className="headerUser" onClick={() => navigate('/profile')}>
              <img src={avatarUrl} alt={user.name} className="avatar" />
              <span className="textMuted">{user.name}</span>
            </div>
          ) : <div style={{ width: '200px' }}></div>}
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

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 16px 16px', flex: 1, width: '100%', minHeight: '85vh' }}>
        <div style={{ marginBottom: '60px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #f0f0f0', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02)', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' }}>📚 Escolha o Módulo:</h3>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: '8px 16px', borderRadius: '8px',
                  border: activeCategory === cat ? '2px solid #db6627' : '1px solid #e0e0e0',
                  background: activeCategory === cat ? '#fff5f0' : 'white',
                  color: activeCategory === cat ? '#db6627' : '#555',
                  fontWeight: activeCategory === cat ? '600' : '500',
                  fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
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
      <footer style={{
        background: '#fff',
        borderTop: '1px solid #eee',
        padding: '40px 24px',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ color: '#db6627', fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', fontFamily: '"Press Start 2P", cursive', letterSpacing: '1px' }}>CODEPLAY</h4>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem' }}>
              Uma plataforma interativa desenvolvida para transformar o aprendizado de programação em uma jornada divertida e envolvente. Nossa missão é tornar o código acessível a todos através da gamificação.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#1a1a1a', fontSize: '1rem', fontWeight: '600', marginBottom: '16px' }}>Sobre a Criação</h4>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem' }}>
              Desenvolvido com paixão por educação e tecnologia. Cada desafio foi cuidadosamente planejado para ensinar conceitos reais de desenvolvimento de software, do básico ao avançado, em um ambiente seguro e amigável.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#1a1a1a', fontSize: '1rem', fontWeight: '600', marginBottom: '16px' }}>Tecnologias</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['React', 'TypeScript', 'Node.js', 'Gamification', 'Education'].map(tech => (
                <span key={tech} style={{ background: '#f5f5f5', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', color: '#555' }}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #f5f5f5', color: '#999', fontSize: '0.85rem' }}>
          © 2024 CodePlay. Todos os direitos reservados. Feito com 🧡 para desenvolvedores.
        </div>
      </footer>
    </div>
  );
}
