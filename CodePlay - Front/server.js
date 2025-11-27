import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'codeplay',
});

// Função para conectar
function conectarBanco() {
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        console.error('❌ Erro ao conectar ao banco de dados MySQL:', err);
        reject(err);
      } else {
        console.log('✅ Conexão estabelecida com o banco de dados MySQL');
        resolve();
      }
    });
  });
}

// Rota de registro
app.post('/api/register', (req, res) => {
  const { name, email, password, age, gender, location, avatar } = req.body;

  connection.query(
    'INSERT INTO users (name, email, password, age, gender, location, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, email, password, age, gender, location, avatar],
    (err, result) => {
      if (err) {
        console.error('❌ ERRO DETALHADO AO CADASTRAR:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Email já cadastrado' });
        }
        return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
      }

      const userId = result.insertId;

      // Após cadastrar, buscamos o usuário completo para retornar igual o login
      connection.query(
        'SELECT id, name, email, avatar FROM users WHERE id = ?',
        [userId],
        (err2, results) => {
          if (err2) {
            console.error('❌ Erro ao buscar usuário após cadastro:', err2);
            return res.status(500).json({ message: 'Erro ao buscar usuário' });
          }

          const user = results[0];

          res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
          });
        }
      );
    }
  );
});


// Rota de login — agora também retorna o avatar
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  connection.query(
    'SELECT id, name, avatar FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error('❌ Erro no login:', err);
        return res.status(500).json({ message: 'Erro no servidor' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Email ou senha incorretos' });
      }

      // ✅ Envia nome + avatar
      const user = results[0];
      res.json({ id: user.id, name: user.name, avatar: user.avatar });
    }
  );
});

// Rota de atualização de perfil
app.put('/api/update-profile', (req, res) => {
  const { id, name, avatar } = req.body;

  if (!id || !name || !avatar) {
    return res.status(400).json({ message: 'Dados incompletos' });
  }

  connection.query(
    'UPDATE users SET name = ?, avatar = ? WHERE id = ?',
    [name, avatar, id],
    (err, result) => {
      if (err) {
        console.error('❌ Erro ao atualizar perfil:', err);
        return res.status(500).json({ message: 'Erro ao atualizar perfil' });
      }

      res.json({ message: 'Perfil atualizado com sucesso!', name, avatar });
    }
  );
});

// Rota de Progresso
app.post("/progress", (req, res) => {
  const { user_id, game_id } = req.body;

  if (!user_id || !game_id) {
    return res.status(400).json({ error: "user_id e game_id são obrigatórios" });
  }

  const sql = "INSERT INTO user_progress (user_id, game_id) VALUES (?, ?)";

  connection.query(sql, [user_id, game_id], (err, result) => {
    if (err) {
      console.error("Erro ao salvar progresso:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }

    res.json({
      message: "Progresso salvo com sucesso!",
      progressId: result.insertId
    });
  });
});


// Inicialização do servidor
async function startServer() {
  try {
    await conectarBanco();
  } catch (error) {
    console.warn('⚠️ AVISO: Não foi possível conectar ao banco de dados.');
    console.warn('⚠️ O servidor iniciará em modo LIMITADO (Login/Cadastro não funcionarão).');
    console.warn(`⚠️ Erro: ${error.message}`);
  }

  // Inicia o servidor Express de qualquer maneira
  app.listen(3001, () => {
    console.log('🚀 Servidor backend rodando na porta 3001');
  });
}

startServer();
