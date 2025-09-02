import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import logo from './logo.jpg';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({ onLogin, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Bem-vindo, ${data.name}!`);
        onLogin(email, password);
        setEmail('');
        setPassword('');
      } else {
        setMessage(data.message || 'Email e/ou senha incorretos');
      }
    } catch {
      setMessage('Erro de conexão com o servidor');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logo} alt="Logo CodePlay" className="h-8 w-8 rounded" />
            <CardTitle className="text-primary text-2xl font-bold">CodePlay</CardTitle>
          </div>
          <CardDescription>
            Entre na sua conta para acessar os desafios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {message && (
              <div className="mt-4 mx-auto w-full flex justify-center">
                <div
                  className={`px-4 py-2 rounded text-center font-semibold
                    ${message.startsWith('Bem-vindo')
                      ? 'border-2 border-green-600 text-green-700 bg-green-50'
                      : 'border-2 border-red-600 text-red-700 bg-red-50'}
                  `}
                  style={{ maxWidth: '300px' }}
                >
                  {message}
                </div>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-muted-foreground">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-primary hover:underline"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}