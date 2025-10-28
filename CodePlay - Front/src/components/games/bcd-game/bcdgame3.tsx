import React from 'react';
import ExerciseInfo from '../../ui/UserProfile';
import CodeEditor from '../../ui/CodeEditor';
import GameView from '../../ui/GameView';
import '../../../index.css'
import '../../../global.d.ts'
import Fazenda from '../../../assets/fazenda.png'
import Personagem from '../../../assets/lola.png'
import Extra from '../../../assets/sol.png'
// Usando CSS Modules para evitar conflitos de estilo
import styles from '../../../styles/jogo.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <ExerciseInfo
        title="Desafio: Montando a Fazenda com CSS"
        description="Neste desafio, você vai aprender a controlar o posicionamento de elementos usando CSS."
        context="Os elementos da fazenda estão desorganizados. Você precisa posicioná-los corretamente na tela."
        objective="Use propriedades como top, left, bottom e right para ajustar o layout."
        module="Banco de Dados"
        level={3}
      />

      <CodeEditor
        welcomeText="Excelente trabalho até aqui! Agora vamos integrar o banco de dados ao código usando Prisma."
      instructionText="Escreva um comando usando Prisma Client para buscar todos os registros da tabela 'animal' e exibi-los no console."
      codeExample="import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const animais = await prisma.animal.findMany();
console.log(animais);"
hintText="Dica: lembre-se de criar a instância do Prisma antes de fazer a consulta."
mainButtonText="CONFIRMAR"
onNext={() => console.log('Próximo passo!')}
/>
      <GameView 
        falaPersonagem="Olá! Vamos montar minha fazenda juntos?"
        fundo= {Fazenda}
        personagem={Personagem}
        extra={Extra}
      />
    </div>
  );
};

export default App;