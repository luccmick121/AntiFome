'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  Home,
  Users,
  Calendar,
  FileText,
  LogOut,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ConselhoData {
  id: string;
  nome: string;
  status: string;
  municipio: {
    nome: string;
    codigo_ibge: string;
    indice_antifome: number;
  };
}

interface UserData {
  id: string;
  email: string;
  role: string;
}

const menuItems = [
  { href: '/conselho', label: 'Início', icon: Home },
  { href: '/conselho/status', label: 'Status', icon: BarChart3 },
  { href: '/conselho/membros', label: 'Membros', icon: Users },
  { href: '/conselho/reunioes', label: 'Reuniões', icon: Calendar },
  { href: '/conselho/documentos', label: 'Documentos', icon: FileText },
];

export default function ConselhoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [conselho, setConselho] = useState<ConselhoData | null>(null);
  const [usuario, setUsuario] = useState<UserData | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const isLoginPage = pathname === '/conselho/login';

  useEffect(() => {
    if (isLoginPage) {
      setCarregando(false);
      return;
    }

    async function carregarDados() {
      try {
        const userRes = await fetch('/api/auth/me');
        if (!userRes.ok) {
          router.push('/conselho/login');
          return;
        }
        const userData = await userRes.json();
        setUsuario(userData);

        if (userData.role !== 'CONSELHEIRO_MUNICIPAL') {
          router.push('/conselho/login');
          return;
        }

        const conselhoRes = await fetch('/api/conselhos/mine');
        if (!conselhoRes.ok) {
          throw new Error('Erro ao carregar dados do conselho');
        }
        const conselhoData = await conselhoRes.json();
        setConselho(conselhoData);
      } catch (err) {
        setErro(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/conselho/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A2F23] mx-auto" />
          <p className="mt-4 text-gray-500">Carregando portal...</p>
        </div>
      </div>
    );
  }

  if (erro || !conselho) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{erro || 'Erro ao carregar conselho'}</AlertDescription>
          </Alert>
          <Button onClick={() => router.push('/conselho/login')} className="w-full mt-4">
            Voltar ao Login
          </Button>
        </div>
      </div>
    );
  }

  const conselhoSuspenso = conselho.status === 'SUSPENSO';

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="bg-[#1A2F23] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8" />
              <div>
                <h1 className="text-lg font-bold">{conselho.municipio.nome}</h1>
                <p className="text-sm text-gray-300">{conselho.nome}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm">{usuario?.email}</p>
                <p className="text-xs text-gray-300">
                  Índice Antifome: {conselho.municipio.indice_antifome.toFixed(1)}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/10">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <nav className="border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white border-b-2 border-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      {conselhoSuspenso && (
        <Alert className="mx-4 mt-4 border-[#B71C1C] bg-red-50">
          <AlertTriangle className="h-4 w-4 text-[#B71C1C]" />
          <AlertDescription className="text-[#B71C1C]">
            <strong>Conselho Suspenso:</strong> Algumas funcionalidades estão temporariamente indisponíveis.
          </AlertDescription>
        </Alert>
      )}

      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
