import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import styles from '../styles/jogo.module.css';

// Avatars
import Vaca from '../assets/avatars/vaca.png';
import Porco from '../assets/avatars/porco.png';
import Ovelha from '../assets/avatars/ovelha.png';
import Pinto from '../assets/avatars/pinto.png';
import Bode from '../assets/avatars/bode.png';
import Auau from '../assets/avatars/auau.png';

const avatars = [
    { id: 'vaca', src: Vaca, name: 'Vaca' },
    { id: 'porco', src: Porco, name: 'Porco' },
    { id: 'ovelha', src: Ovelha, name: 'Ovelha' },
    { id: 'pinto', src: Pinto, name: 'Pinto' },
    { id: 'bode', src: Bode, name: 'Bode' },
    { id: 'auau', src: Auau, name: 'Cachorro' },
];

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('vaca');
    const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setName(user.name);
            setSelectedAvatar(user.avatar || 'vaca');
            setUserId(user.id);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleSave = async () => {
        if (!userId) return;
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/update-profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, name, avatar: selectedAvatar }),
            });

            if (response.ok) {
                // Update local storage
                const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
                const updatedUser = { ...storedUser, name, avatar: selectedAvatar };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                alert('Perfil atualizado com sucesso!');
                navigate('/dashboard');
            } else {
                alert('Erro ao atualizar perfil.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <CardTitle>Editar Perfil</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome de Usuário</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Escolha seu Avatar</Label>
                        <div className="grid grid-cols-3 gap-4">
                            {avatars.map((avatar) => (
                                <div
                                    key={avatar.id}
                                    className={`cursor-pointer rounded-full p-2 border-4 transition-all ${selectedAvatar === avatar.id ? 'border-blue-500 scale-110' : 'border-transparent hover:scale-105'
                                        }`}
                                    onClick={() => setSelectedAvatar(avatar.id)}
                                >
                                    <img
                                        src={avatar.src}
                                        alt={avatar.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button className="w-full" onClick={handleSave} disabled={loading}>
                        {loading ? 'Salvando...' : (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;
