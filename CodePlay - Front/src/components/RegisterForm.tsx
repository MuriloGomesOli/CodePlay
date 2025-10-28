import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Logo from './Logo.jsx';
import '../../src/index.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import '../styles/register.css';

// Import dinâmico de avatares
const avatarFiles = import.meta.glob('../assets/avatars/*.png', { eager: true });
const avatars = Object.keys(avatarFiles).map((path) => {
  const name = path.split('/').pop()?.replace('.png', '') || '';
  return {
    id: name,
    src: (avatarFiles[path] as any).default,
    alt: name.charAt(0).toUpperCase() + name.slice(1),
  };
});

interface RegisterFormProps {
  onRegister?: (name: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    location: '',
    reason: '',
    referral: '',
    avatar: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (id: string) => {
    setFormData(prev => ({ ...prev, avatar: id }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        alert('Conta criada com sucesso!');
        onRegister?.(formData.name, formData.email, formData.password);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          age: '',
          gender: '',
          location: '',
          reason: '',
          referral: '',
          avatar: '',
        });
      } else {
        alert(data.message || 'Erro ao criar conta');
      }
    } catch {
      alert('Erro de conexão com o servidor');
    }
    setLoading(false);
  };

  // Lista de campos do formulário para renderização dinâmica
  const fields = [
    { id: 'name', label: 'Nome Completo', type: 'text', placeholder: 'Seu Nome', required: true },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com', required: true },
    { id: 'password', label: 'Senha', type: 'password', placeholder: '••••••••', required: true, minLength: 6 },
    { id: 'confirmPassword', label: 'Confirmar Senha', type: 'password', placeholder: '••••••••', required: true, minLength: 6 },
    { id: 'age', label: 'Idade', type: 'number', placeholder: 'Sua idade', required: true, min: 1 },
    { id: 'location', label: 'Local onde mora', type: 'text', placeholder: 'Cidade/Estado', required: true },
    { id: 'referral', label: 'Onde conheceu o site?', type: 'text', placeholder: 'Indicação, redes sociais, etc.', required: false },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="login-brand">
            <Logo />
            <CardTitle className="text-primary text-2xl font-bold"> CodePlay</CardTitle>
          </div>
          <CardDescription>Crie sua conta e comece a praticar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(field => (
              <div className="space-y-2" key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type as any}
                  placeholder={field.placeholder}
                  value={(formData as any)[field.id]}
                  onChange={handleChange}
                  required={field.required}
                  min={field.min}
                  minLength={field.minLength}
                />
              </div>
            ))}

            {/* Gênero */}
            <div className="space-y-2">
              <Label htmlFor="gender">Sexo</Label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border rounded px-2 py-1"
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            {/* Avatares */}
            <div className="space-y-2">
              <Label className="font-semibold text-lg">Escolha seu avatar</Label>
              <div className="avatar-grid">
                {avatars.map(avatar => (
                  <button
                    key={avatar.id}
                    type="button"
                    className={`avatar-option ${formData.avatar === avatar.id ? 'selected' : ''}`}
                    onClick={() => handleAvatarSelect(avatar.id)}
                  >
                    <img src={avatar.src} alt={avatar.alt} className="avatar-img" />
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
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
