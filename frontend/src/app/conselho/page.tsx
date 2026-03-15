'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Award, TrendingUp } from 'lucide-react';

interface ConselhoStats {
  totalMembros: number;
  totalReunioes: number;
  proximaReuniao: string | null;
  seloAtual: string | null;
  progressoProximoSelo: number;
  reunioesFaltando: number;
}

export default function ConselhoHomePage() {
  const [stats, setStats] = useState<ConselhoStats | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarStats() {
      try {
        const res = await fetch('/api/conselhos/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (erro) {
        console.error('Erro ao carregar estatísticas:', erro);
      } finally {
        setCarregando(false);
      }
    }
    carregarStats();
  }, []);

  if (carregando) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getSeloCor = (selo: string | null) => {
    switch (selo) {
      case 'PLATINA':
        return 'bg-purple-100 text-purple-800';
      case 'OURO':
        return 'bg-yellow-100 text-yellow-800';
      case 'PRATA':
        return 'bg-gray-100 text-gray-800';
      case 'BRONZE':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1A2F23]">Painel do Conselho</h2>
        <p className="text-gray-500">Visão geral das atividades do seu conselho</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Membros
            </CardTitle>
            <Users className="h-4 w-4 text-[#1A2F23]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A2F23]">
              {stats?.totalMembros || 0}
            </div>
            <p className="text-xs text-gray-500">ativos no conselho</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Reuniões
            </CardTitle>
            <Calendar className="h-4 w-4 text-[#1A2F23]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A2F23]">
              {stats?.totalReunioes || 0}
            </div>
            <p className="text-xs text-gray-500">realizadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Selo Atual
            </CardTitle>
            <Award className="h-4 w-4 text-[#1A2F23]" />
          </CardHeader>
          <CardContent>
            <Badge className={getSeloCor(stats?.seloAtual || null)}>
              {stats?.seloAtual || 'Sem selo'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Próximo Selo
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-[#1A2F23]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A2F23]">
              {stats?.progressoProximoSelo || 0}%
            </div>
            <p className="text-xs text-gray-500">
              {stats?.reunioesFaltando || 0} reuniões restantes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Progresso do Selo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progresso para o Próximo Selo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>{stats?.progressoProximoSelo || 0}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2E7D32] transition-all duration-500"
                style={{ width: `${stats?.progressoProximoSelo || 0}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">
              {stats?.reunioesFaltando
                ? `Faltam ${stats.reunioesFaltando} reuniões para o próximo selo`
                : 'Continue realizando reuniões regulares para conquistar selos!'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/conselho/reunioes"
              className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-[#1A2F23]">Registrar Reunião</div>
              <div className="text-sm text-gray-500">
                Adicionar nova reunião realizada
              </div>
            </a>
            <a
              href="/conselho/membros"
              className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-[#1A2F23]">Gerenciar Membros</div>
              <div className="text-sm text-gray-500">
                Adicionar ou editar membros do conselho
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Próxima Reunião</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.proximaReuniao ? (
              <div className="text-center py-4">
                <Calendar className="h-12 w-12 text-[#1A2F23] mx-auto mb-2" />
                <p className="font-medium">{stats.proximaReuniao}</p>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma reunião agendada</p>
                <a
                  href="/conselho/reunioes"
                  className="text-[#1A2F23] hover:underline text-sm"
                >
                  Agendar reunião
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
