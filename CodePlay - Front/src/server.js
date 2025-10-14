import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'codeplay',
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados Mysql:', err);
    return;
  }
  console.log('Conexão estabelecida com o banco de dados Mysql');
});

// Rota para cadastrar usuário
app.post('/api/register', (req, res) => {
  const { name, email, password, age, gender, location, reason, referral } = req.body;
  connection.query(
  'INSERT INTO users (name, email, password, age, gender, location, reason, referral) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  [name, email, password, age, gender, location, reason, referral],
  (err, result) => {
    if (err) {
      console.error('❌ ERRO DETALHADO AO CADASTRAR:', err); // <-- Adicione este log
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }
      return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
    console.log('✅ Usuário cadastrado com sucesso, ID:', result.insertId);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  }
  );
});

// Rota para buscar todos os usuários (opcional)
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Erro ao executar a query:', err);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
      return;
    }
    res.json(results);
  });
});


// Verifica login do usuário
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  connection.query(
    'SELECT name FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro no servidor' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Email ou senha incorretos' });
      }
      // Aqui retorna o nome do usuário
      res.json({ name: results[0].name });
    }
  );
});

app.listen(3001, () => {
  console.log('Servidor backend rodando na porta 3001');
});