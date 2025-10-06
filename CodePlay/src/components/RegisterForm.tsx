import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import '../../src/index.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface RegisterFormProps {
  onRegister?: (name: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [reason, setReason] = useState('');
  const [referral, setReferral] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          age,
          gender,
          location,
          reason,
          referral,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Conta criada com sucesso!');
        if (onRegister) onRegister(name, email, password);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAge('');
        setGender('');
        setLocation('');
        setReason('');
        setReferral('');
      } else {
        alert(data.message || 'Erro ao criar conta');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-primary">CodePlay</CardTitle>
          <CardDescription>
            Crie sua conta e comece a praticar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Idade</Label>
              <Input
                id="age"
                type="number"
                placeholder="Sua idade"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Sexo</Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full border rounded px-2 py-1"
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Local onde mora</Label>
              <Input
                id="location"
                type="text"
                placeholder="Cidade/Estado"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
           <div className="space-y-2">
              <Label htmlFor="referral">Onde conheceu o site?</Label>
              <Input
                id="referral"
                type="text"
                placeholder="Indicação, redes sociais, etc."
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando...' : 'Criar Conta'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-muted-foreground">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary hover:underline"
              >
                Faça login
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}