'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setEnviando(true);

    try {
      // Simular chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Em produção, chamar: POST /api/auth/forgot-password
      // const res = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      setEnviado(true);
    } catch (error) {
      setErro('Erro ao enviar email. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-[#1A2F23] mb-2">
              Email Enviado!
            </h2>
            <p className="text-gray-600 mb-6">
              Se o email <strong>{email}</strong> estiver cadastrado, você receberá
              instruções para redefinir sua senha em alguns minutos.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Não recebeu o email? Verifique sua caixa de spam ou{' '}
              <button
                onClick={() => setEnviado(false)}
                className="text-[#1A2F23] underline"
              >
                tente novamente
              </button>
              .
            </p>
            <Button asChild className="w-full bg-[#1A2F23]">
              <Link href="/login">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Login
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#1A2F23] flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-[#1A2F23]">
            Esqueceu sua senha?
          </CardTitle>
          <CardDescription>
            Informe seu email para receber instruções de redefinição
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <Alert variant="destructive">
                <AlertDescription>{erro}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={enviando}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1A2F23]"
              disabled={enviando || !email}
            >
              {enviando ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Instruções'
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-gray-500 hover:text-[#1A2F23] flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
