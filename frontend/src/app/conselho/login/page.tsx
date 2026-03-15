'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2, Loader2 } from 'lucide-react';

export default function ConselhoLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      // Verificar se o usuário é conselheiro
      if (data.usuario.role !== 'CONSELHEIRO_MUNICIPAL') {
        throw new Error('Acesso restrito a conselheiros municipais');
      }

      // Verificar se tem município vinculado
      if (!data.usuario.municipio_id) {
        throw new Error('Usuário não vinculado a nenhum município');
      }

      router.push('/conselho');
      router.refresh();
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-[#1A2F23] rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#1A2F23]">
            Portal do Conselho
          </CardTitle>
          <p className="text-sm text-gray-500">
            Acesso exclusivo para conselheiros municipais
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <Alert variant="destructive">
                <AlertDescription>{erro}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="conselheiro@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={carregando}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                disabled={carregando}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1A2F23] hover:bg-[#2a4a38]"
              disabled={carregando}
            >
              {carregando ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar no Portal'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            <a href="/login" className="text-[#1A2F23] hover:underline">
              Acesso para gestores estaduais
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
